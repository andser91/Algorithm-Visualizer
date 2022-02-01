import { Injectable } from '@angular/core';
import {Comparison} from "../../interface/comparison";
import {SvgLine} from "../../interface/svgLine";
import {Sorter} from "../sorter";

@Injectable({
  providedIn: 'root'
})
export class SelectionSortService implements Sorter{

  private animationTime: number = 0;
  private comparisons: Array<Comparison> = new Array<Comparison>()
  private timeouts: Array<any> = new Array<any>()

  constructor() { }

  sort(svgArray: Array<SvgLine>) {
    let n = svgArray.length
    let min_idx;
    for (let i = 0; i < n - 1; i++) {
      min_idx = i;
      for (let j = i + 1; j < n; j++) {
        if (svgArray[j].temp < svgArray[min_idx].temp) {
          this.comparisons.push(new Comparison(j, 0, min_idx, 0, false, "red", "red", false))
          this.comparisons.push(new Comparison(j, 0, min_idx, 0, false, "#673ab7", "#673ab7", false))
          min_idx = j;
        } else {
          this.comparisons.push(new Comparison(j, 0, min_idx, 0, false, "red", "red", false))
          this.comparisons.push(new Comparison(j, 0, min_idx, 0, false, "#673ab7", "#673ab7", false))
        }
      }
      let temp = svgArray[min_idx].temp
      let temp2 = svgArray[i].temp
      svgArray[i].temp = temp
      svgArray[min_idx].temp = temp2
      this.comparisons.push(new Comparison(min_idx, temp2, i, temp, true, "", "", false));
      this.comparisons.push(new Comparison(i, 0, 0, 0, false, "green", "", false));
    }
    this.comparisons.push(new Comparison(svgArray.length - 1, 0, 0, 0, false, "green", "", false));
    this.comparisons.push(new Comparison(0, 0, 0, 0, false, "", "", true));

    this.animationTime = 8000 / this.comparisons.length;
    this.executeSteps(svgArray);
  }

  executeSteps(svgArray: Array<SvgLine>) {
    for (let i = 0; i < this.comparisons.length; i++) {
      let timeout = setTimeout(() => {
        this.executeStep(this.comparisons[i], svgArray)
      }, i * this.animationTime)
      this.timeouts.push(timeout);
    }
  }

  executeStep(comparison: Comparison, svgArray: Array<SvgLine>) {
    if (comparison.swap) {
      svgArray[comparison.firstIndex].y2 = comparison.firstValue
      svgArray[comparison.secondIndex].y2 = comparison.secondValue
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
