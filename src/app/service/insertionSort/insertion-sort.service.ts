import {Injectable} from '@angular/core';
import {SvgLine} from "../../model/svgLine";
import {Sorter} from "../sorter";
import {Animation} from "../../model/animation/animation";

@Injectable({
  providedIn: 'root'
})
export class InsertionSortService implements Sorter {

  constructor() {
  }

  sort(svgArray: Array<SvgLine>): Array<Animation> {
    let animations = new Array<Animation>()
    this.insertionSort(svgArray, svgArray.length)
    return animations;
  }

  private insertionSort(svgArray: Array<SvgLine>, length: number) {
    let i, key, j;
    for (i = 1; i < length; i++) {
      key = svgArray[i].temp;
      j = i - 1;
      while (j >= 0 && svgArray[j].temp > key) {
        let temp = svgArray[j].temp
        svgArray[j].temp = svgArray[j + 1].temp
        svgArray[j + 1].temp = temp
        j--;
      }
      svgArray[j + 1].temp = key;
    }
  }
}
