import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {MatSliderChange} from "@angular/material/slider";
import {Subject} from "rxjs";
import {Algorithm} from "../../interface/algorithm";


@Component({
  selector: 'app-sorting-visualizer',
  templateUrl: './sorting-visualizer.component.html',
  styleUrls: ['./sorting-visualizer.component.scss']
})
export class SortingVisualizerComponent implements OnInit {

  @Output() startSortingEvent : EventEmitter<Algorithm> = new EventEmitter<Algorithm>();

  public array : Array<number> = new Array<number>();
  public size : number = 100;
  public algorithms: Array<Algorithm> = [Algorithm.BUBBLE_SORT, Algorithm.SELECTION_SORT,
    Algorithm.MERGE_SORT];
  public selectedAlgorithm: Algorithm = Algorithm.BUBBLE_SORT;
  public eventSubject: Subject<Algorithm> = new Subject<Algorithm>();

  constructor() {}

  ngOnInit(): void {
    this.generateArray(this.size);
  }

  generateArray(size: number){
    this.array = [];
    for (let i = 1; i<= size; i++){
      this.array.push(this.generateIntInInterval(5,1000));
    }
  }

  generateIntInInterval(min: number, max :number){
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  onInputChange(event: MatSliderChange) {
    this.size = event.value || 100;
    this.generateArray(this.size);
  }

  onSelectionChange($event : any) {
    console.log(this.selectedAlgorithm);
  }

  onClickNewArray() {
    this.generateArray(this.size);
  }

}
