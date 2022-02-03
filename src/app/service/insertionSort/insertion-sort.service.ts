import {Injectable} from '@angular/core';
import {SvgLine} from "../../model/svgLine";
import {Sorter} from "../sorter";
import {Animation} from "../../model/animation/animation";
import {SwapAnimation} from "../../model/animation/swapAnimation";
import {ColorAnimation} from "../../model/animation/colorAnimation";

@Injectable({
  providedIn: 'root'
})
export class InsertionSortService implements Sorter {

  constructor() {
  }

  sort(svgArray: Array<SvgLine>): Array<Animation> {
    let animations = new Array<Animation>()
    let n = svgArray.length
    let i, key, j;
    for (i = 1; i < n; i++) {
      key = svgArray[i].temp;
      j = i - 1;
      while (j >= 0 && svgArray[j].temp > key) {
        animations.push(new ColorAnimation("red", svgArray[j], svgArray[j+1]))
        animations.push(new ColorAnimation("#673ab7", svgArray[j], svgArray[j+1]))
        animations.push(new SwapAnimation(svgArray[j], svgArray[j +1].temp, svgArray[j + 1], svgArray[j].temp));
        let temp = svgArray[j].temp
        svgArray[j].temp = svgArray[j + 1].temp
        svgArray[j + 1].temp = temp
        j--;
      }
      animations.push(new SwapAnimation(svgArray[j + 1], key));
      svgArray[j + 1].temp = key;
    }
    console.log(svgArray)
    return animations;
  }

}
