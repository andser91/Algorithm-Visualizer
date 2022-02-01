import { Injectable } from '@angular/core';
import {Sorter} from "./sorter";
import {Algorithm} from "../interface/algorithm";
import {BubbleSortService} from "./bubbleSort/bubble-sort.service";
import {MergeSortService} from "./mergeSort/merge-sort.service";
import {SelectionSortService} from "./selectionSort/selection-sort.service";

@Injectable({
  providedIn: 'root'
})
export class SortingServiceFactoryService {

  constructor() { }

  getSorter(algorithm: Algorithm) : Sorter {
    switch (algorithm) {
      case Algorithm.BUBBLE_SORT : {
        return new BubbleSortService();
      }
      case Algorithm.SELECTION_SORT : {
        return new SelectionSortService();
      }
      case Algorithm.MERGE_SORT : {
        return new MergeSortService()
      }
    }
  }
}
