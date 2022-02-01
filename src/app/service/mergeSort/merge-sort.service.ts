import {Injectable} from '@angular/core';
import {SvgLine} from "../../interface/svgLine";
import {Comparison} from "../../interface/comparison";
import {Sorter} from "../sorter";

@Injectable({
  providedIn: 'root'
})
export class MergeSortService implements Sorter {

  private animationTime: number = 0;
  private comparisons: Array<Comparison> = new Array<Comparison>()
  private timeouts: Array<any> = new Array<any>()

  constructor() {
  }

  sort(svgArray: Array<SvgLine>) {
    if (svgArray.length <= 1) return;
    const workArray = svgArray.slice();
    const originalArray = svgArray.slice();
    this.recursiveMergeSort(originalArray, 0, svgArray.length - 1, workArray);
    this.comparisons.push(new Comparison(0, 0, 0, 0, false, "", "", true));
    this.animationTime = 5000 / this.comparisons.length;
    this.executeComparisons(svgArray)
  }


  private recursiveMergeSort(svgArray: Array<SvgLine>, startIdx: number, endIdx: number, workArray: Array<SvgLine>) {
    if (startIdx === endIdx) return;
    const middleIdx = Math.floor((startIdx + endIdx) / 2);
    this.recursiveMergeSort(workArray, startIdx, middleIdx, svgArray);
    this.recursiveMergeSort(workArray, middleIdx + 1, endIdx, svgArray);
    this.merge(svgArray, startIdx, middleIdx, endIdx, workArray);
  }

  merge(svgArray: Array<SvgLine>, startIdx: number, middleIdx: number, endIdx: number, workArray: Array<SvgLine>) {
    let k = startIdx;
    let i = startIdx;
    let j = middleIdx + 1;
    while (i <= middleIdx && j <= endIdx) {
      this.comparisons.push(new Comparison(i, 0, j, 0, false, "red", "red", false));
      this.comparisons.push(new Comparison(i, 0, j, 0, false, "#673ab7", "#673ab7", false));
      if (workArray[i].temp <= workArray[j].temp) {
        this.comparisons.push(new Comparison(k, workArray[i].temp, i, 0, true, "", "", false));
        svgArray[k++] = workArray[i++];
      } else {
        this.comparisons.push(new Comparison(k, workArray[j].temp, i, 0, true, "", "", false));
        svgArray[k++] = workArray[j++];
      }
    }
    while (i <= middleIdx) {
      this.comparisons.push(new Comparison(i, 0, i, 0, false, "red", "red", false));
      this.comparisons.push(new Comparison(i, 0, i, 0, false, "#673ab7", "#673ab7", false));
      this.comparisons.push(new Comparison(k, workArray[i].temp, i, 0, true, "", "", false));
      svgArray[k++] = workArray[i++];
    }
    while (j <= endIdx) {
      this.comparisons.push(new Comparison(j, 0, j, 0, false, "#673ab7", "#673ab7", false));
      this.comparisons.push(new Comparison(j, 0, j, 0, false, "#673ab7", "#673ab7", false));
      this.comparisons.push(new Comparison(k, workArray[j].temp, i, 0, true, "", "", false));
      svgArray[k++] = workArray[j++];
    }
  }


  executeComparisons(svgArray: Array<SvgLine>) {
    for (let i = 0; i < this.comparisons.length; i++) {
      let timeout = setTimeout(() => {
        this.executeComparison(this.comparisons[i], svgArray)
      }, i * this.animationTime)
      this.timeouts.push(timeout);
    }
  }

  executeComparison(comparison: Comparison, svgArray: Array<SvgLine>) {
    if (comparison.swap) {
      svgArray[comparison.firstIndex].y2 = comparison.firstValue
    } else {
      svgArray[comparison.firstIndex].color = comparison.firstColor
      if (comparison.secondColor !== "") {
        svgArray[comparison.secondIndex].color = comparison.secondColor
      }
    }
    if (comparison.terminated) {
      for (let i = 0; i < this.timeouts.length; i++) {
        clearTimeout(this.timeouts[i]);
        this.comparisons = []
      }
    }
  }


}
