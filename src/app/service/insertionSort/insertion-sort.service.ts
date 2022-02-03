import {Injectable} from '@angular/core';
import {SvgLine} from "../../model/svgLine";
import {Sorter} from "../common/sorter";
import {Animation} from "../../model/animation/animation";
import {ColorAnimation} from "../../model/animation/colorAnimation";

@Injectable({
  providedIn: 'root'
})
export class InsertionSortService extends Sorter {

  constructor() {
    super();
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
        this.swap(svgArray[j], svgArray[j+1], animations)
        j--;
      }
      this.insert(svgArray[j+1], key, animations)
    }
    console.log(svgArray)
    return animations;
  }

}
