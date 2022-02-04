import {Injectable} from '@angular/core';
import {SvgLine} from "../../../model/svgLine";
import {Sorter} from "../sorter";
import {ColorAnimation} from "../../../model/animation/colorAnimation";
import {SwapAnimation} from "../../../model/animation/swapAnimation";
import {Animation} from "../../../model/animation/animation";

@Injectable({
  providedIn: 'root'
})
export class MergeSortService extends Sorter {

  private svgArray : Array<SvgLine> = []

  constructor() {
    super();}

  sort(svgArray: Array<SvgLine>) : Array<Animation> {
    let animations : Array<Animation> = new Array<Animation>();
    this.svgArray = svgArray;
    if (svgArray.length <= 1) return animations;
    const workArray = svgArray.slice();
    const originalArray = svgArray.slice();
    this.mergeSort(originalArray, 0, originalArray.length - 1, workArray, animations);
    return animations;
  }


  private mergeSort(svgArray: Array<SvgLine>, startIdx: number, endIdx: number, workArray: Array<SvgLine>, animations: Array<Animation>) {
    if (startIdx === endIdx) return;
    const middleIdx = Math.floor((startIdx + endIdx) / 2);
    this.mergeSort(workArray, startIdx, middleIdx, svgArray, animations);
    this.mergeSort(workArray, middleIdx + 1, endIdx, svgArray, animations);
    this.merge(svgArray, startIdx, middleIdx, endIdx, workArray, animations);
  }

  private merge(svgArray: Array<SvgLine>, startIdx: number, middleIdx: number, endIdx: number, workArray: Array<SvgLine>, animations: Array<Animation>) {
    let k = startIdx;
    let i = startIdx;
    let j = middleIdx + 1;
    while (i <= middleIdx && j <= endIdx) {
      animations.push(new ColorAnimation("red", svgArray[i], svgArray[j]));
      animations.push(new ColorAnimation("#673ab7", svgArray[i], svgArray[j]));
      if (workArray[i].temp <= workArray[j].temp) {
        animations.push(new SwapAnimation(this.svgArray[k], workArray[i].temp))
        svgArray[k++] = workArray[i++];
      } else {
        animations.push(new SwapAnimation(this.svgArray[k], workArray[j].temp))
        svgArray[k++] = workArray[j++];
      }
    }
    while (i <= middleIdx) {
      animations.push(new ColorAnimation("red", svgArray[i], svgArray[i]));
      animations.push(new ColorAnimation("#673ab7", svgArray[i], svgArray[i]));
      animations.push(new SwapAnimation(this.svgArray[k], workArray[i].temp))
      svgArray[k++] = workArray[i++];
    }
    while (j <= endIdx) {
      animations.push(new ColorAnimation("red", svgArray[j], svgArray[j]));
      animations.push(new ColorAnimation("#673ab7", svgArray[j], svgArray[j]));
      animations.push(new SwapAnimation(this.svgArray[k], workArray[j].temp))
      svgArray[k++] = workArray[j++];
    }
  }
}
