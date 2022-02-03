import {Injectable} from '@angular/core';
import {SvgLine} from "../../model/svgLine";
import {Sorter} from "../sorter";
import {ColorAnimation} from "../../model/animation/colorAnimation";
import {SwapAnimation} from "../../model/animation/swapAnimation";
import {Animation} from "../../model/animation/animation";

@Injectable({
  providedIn: 'root'
})
export class SelectionSortService implements Sorter {

  constructor() {}

  sort(svgArray: Array<SvgLine>) : Array<Animation> {
    let animations : Array<Animation> = new Array<Animation>();
    let n = svgArray.length
    let min_idx;
    for (let i = 0; i < n - 1; i++) {
      min_idx = i;
      for (let j = i + 1; j < n; j++) {
        if (svgArray[j].temp < svgArray[min_idx].temp) {
          animations.push(new ColorAnimation("red", svgArray[j], svgArray[min_idx]))
          animations.push(new ColorAnimation("#673ab7", svgArray[j], svgArray[min_idx]))
          min_idx = j;
        } else {
          animations.push(new ColorAnimation("red", svgArray[j], svgArray[min_idx]))
          animations.push(new ColorAnimation("#673ab7", svgArray[j], svgArray[min_idx]))
        }
      }
      let temp = svgArray[min_idx].temp
      let temp2 = svgArray[i].temp
      svgArray[i].temp = temp
      svgArray[min_idx].temp = temp2
      animations.push(new SwapAnimation(svgArray[min_idx], temp2, svgArray[i], temp));
      animations.push(new ColorAnimation("green", svgArray[i]))
    }
    animations.push(new ColorAnimation("green", svgArray[svgArray.length - 1]))
    return animations
  }
}
