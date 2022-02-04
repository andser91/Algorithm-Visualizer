import { Injectable } from '@angular/core';
import {Sorter} from "../sorter";
import {SvgLine} from "../../../model/svgLine";
import {Animation} from "../../../model/animation/animation";
import {ColorAnimation} from "../../../model/animation/colorAnimation";

@Injectable({
  providedIn: 'root'
})
export class QuickSortService extends Sorter{

  constructor() {
    super();
  }

  sort(svgArray: Array<SvgLine>): Array<Animation> {
    let animations = new Array<Animation>()
    this.quickSort(svgArray, 0, svgArray.length - 1, animations)
    return animations;
  }

  private quickSort(svgArray: Array<SvgLine>, start: number, end: number, animations: Animation[]) {
    if( start < end ) {
      let pivPos = this.partition (svgArray ,start , end, animations) ;
      this.quickSort(svgArray, start, pivPos - 1, animations);
      this.quickSort(svgArray, pivPos + 1, end, animations);
    }
  }

  private partition(svgArray: Array<SvgLine>, start: number, end: number, animations: Animation[]) : number{
    let i = start + 1;
    let piv = svgArray[start];
    for(let j=start + 1; j <= end ; j++ )  {
      if (svgArray[j].temp < piv.temp) {
        animations.push(new ColorAnimation("red", svgArray[i], svgArray[j]));
        animations.push(new ColorAnimation("#673ab7", svgArray[i], svgArray[j]));

        this.swap(svgArray[i],svgArray[j], animations);
        i += 1;
      }
    }
    animations.push(new ColorAnimation("red", svgArray[start], svgArray[i-1]));
    animations.push(new ColorAnimation("#673ab7", svgArray[start], svgArray[i-1]));
    this.swap(svgArray[start], svgArray[i - 1], animations);
    return i-1;
  }
}
