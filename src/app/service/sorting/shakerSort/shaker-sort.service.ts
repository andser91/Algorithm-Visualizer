import {Injectable} from '@angular/core';
import {Sorter} from "../sorter";
import {SvgLine} from "../../../model/svgLine";
import {Animation} from "../../../model/animation/animation";
import {ColorAnimation} from "../../../model/animation/colorAnimation";

@Injectable({
  providedIn: 'root'
})
export class ShakerSortService extends Sorter {

  constructor() {
    super();
  }

  sort(svgArray: Array<SvgLine>): Array<Animation> {
    let swapped: boolean = true
    let animations = new Array<Animation>()
    let n = svgArray.length - 1
    let infLimit = 0, supLimit = 0, j = 0;
    while (j < n && swapped) {
      for (let i = j; i < n; i++) {
        if (svgArray[i].temp > svgArray[i + 1].temp) {
          animations.push(new ColorAnimation("red", svgArray[i], svgArray[i + 1]))
          animations.push(new ColorAnimation("#673ab7", svgArray[i], svgArray[i + 1]))
          this.swap(svgArray[i], svgArray[i + 1], animations)
          swapped = true;
          supLimit = i;
        }
      }
      animations.push(new ColorAnimation("green", svgArray[supLimit + 1]))
      if (swapped) {
        swapped = false;
        n = supLimit;
        for (let i = n; i > j; i--) {
          if (svgArray[i].temp < svgArray[i - 1].temp) {
            animations.push(new ColorAnimation("red", svgArray[i], svgArray[i - 1]))
            animations.push(new ColorAnimation("#673ab7", svgArray[i], svgArray[i - 1]))
            this.swap(svgArray[i], svgArray[i - 1], animations)
            swapped = true;
            infLimit = i;
          }
        }
        j = infLimit;
      }
      animations.push(new ColorAnimation("green", svgArray[infLimit - 1]))
    }

    console.log(svgArray)
    return animations;
  }
}
