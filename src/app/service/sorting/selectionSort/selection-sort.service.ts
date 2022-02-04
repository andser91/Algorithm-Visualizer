import {Injectable} from '@angular/core';
import {SvgLine} from "../../../model/svgLine";
import {Sorter} from "../sorter";
import {ColorAnimation} from "../../../model/animation/colorAnimation";
import {Animation} from "../../../model/animation/animation";

@Injectable({
  providedIn: 'root'
})
export class SelectionSortService extends Sorter {

  constructor() {
    super();
  }

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
      this.swap(svgArray[i], svgArray[min_idx], animations)
      animations.push(new ColorAnimation("green", svgArray[i]))
    }
    animations.push(new ColorAnimation("green", svgArray[svgArray.length - 1]))
    return animations
  }
}
