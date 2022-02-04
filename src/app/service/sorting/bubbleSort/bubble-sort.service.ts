import {Injectable} from '@angular/core';
import {SvgLine} from "../../../model/svgLine";
import {Sorter} from "../sorter";
import {ColorAnimation} from "../../../model/animation/colorAnimation";
import {Animation} from "../../../model/animation/animation";

@Injectable({
  providedIn: 'root'
})
export class BubbleSortService extends Sorter{

  constructor() {
    super();
  }

  sort(svgArray: Array<SvgLine>) : Array<Animation> {
    let animations : Array<Animation> = new Array<Animation>();
    for (let i = 0; i < svgArray.length; i++) {
      for (let j = 0; j < svgArray.length - 1; j++) {
        if (svgArray[j].temp > svgArray[j + 1].temp) {
          animations.push(new ColorAnimation("red", svgArray[j], svgArray[j + 1]))
          animations.push(new ColorAnimation("#673ab7", svgArray[j], svgArray[j + 1]))
          this.swap(svgArray[j], svgArray[j+1], animations)
        }
      }
      animations.push(new ColorAnimation("green", svgArray[svgArray.length -1 -i]))
    }
    return animations;
  }


}
