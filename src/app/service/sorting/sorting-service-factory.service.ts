import {Injectable} from '@angular/core';
import {Sorter} from "./sorter";
import {SortingAlgorithm} from "../../model/sortingAlgorithm";
import {BubbleSortService} from "./bubbleSort/bubble-sort.service";
import {SelectionSortService} from "./selectionSort/selection-sort.service";
import {InsertionSortService} from "./insertionSort/insertion-sort.service";
import {MergeSortService} from "./mergeSort/merge-sort.service";
import {QuickSortService} from "./quickSort/quick-sort.service";
import {ShakerSortService} from "./shakerSort/shaker-sort.service";

@Injectable({
  providedIn: 'root'
})
export class SortingServiceFactoryService {

  constructor(private bubbleSortService: BubbleSortService,
              private selectionSortService: SelectionSortService,
              private mergeSortService: MergeSortService,
              private insertionSortService: InsertionSortService,
              private quickSortService: QuickSortService,
              private shakerSortService : ShakerSortService) {
  }

  getSorter(algorithm: SortingAlgorithm): Sorter {
    switch (algorithm) {
      case SortingAlgorithm.BUBBLE_SORT : {
        return new BubbleSortService();
      }
      case SortingAlgorithm.SELECTION_SORT : {
        return this.selectionSortService
      }
      case SortingAlgorithm.MERGE_SORT : {
        return this.mergeSortService
      }
      case SortingAlgorithm.INSERTION_SORT : {
        return this.insertionSortService
      }
      case SortingAlgorithm.QUICK_SORT : {
        return this.quickSortService
      }
      case SortingAlgorithm.SHAKER_SORT : {
        return this.shakerSortService
      }
    }
  }
}
