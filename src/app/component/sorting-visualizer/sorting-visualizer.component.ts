import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSliderChange} from "@angular/material/slider";
import {Subject, timer} from "rxjs";
import {Algorithm} from "../../model/algorithm";
import {AnimationStatus} from "../../model/animation/AnimationStatus";
import {PlaySortingEvent} from "../../event/playSortingEvent";
import {SortingServiceFactoryService} from "../../service/sorting-service-factory.service";
import {Sorter} from "../../service/sorter";

@Component({
  selector: 'app-sorting-visualizer',
  templateUrl: './sorting-visualizer.component.html',
  styleUrls: ['./sorting-visualizer.component.scss']
})
export class SortingVisualizerComponent implements OnInit {

  array : Array<number> = new Array<number>();
  size : number = 100;
  velocity: number = 5000;
  algorithms: Array<Algorithm> = Object.values(Algorithm)
  selectedAlgorithm: Algorithm = Algorithm.BUBBLE_SORT;
  startSubject: Subject<PlaySortingEvent> = new Subject<PlaySortingEvent>();
  resetSubject: Subject<void> = new Subject<void>()
  playButtonClass : string = "showed"
  pauseButtonClass: string = "hidden";
  private status : AnimationStatus = AnimationStatus.STOPPED;
  animationCompleted: boolean = true;

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

  sizeSliderChange(event: MatSliderChange) {
    this.size = event.value || 100;
    this.reset();
  }

  velocitySliderChange(event: MatSliderChange) {
    this.velocity = event.value || 5000;
  }

  onNewArrayClicked() {
    this.reset();
  }

  onPlayClicked() {
    this.startSubject.next(new PlaySortingEvent(this.selectedAlgorithm, this.status))
    this.status = AnimationStatus.PLAYING;
    this.playButtonClass = "hidden";
    this.pauseButtonClass = "showed"
    // this.animationCompleted = false
  }

  onPauseClicked() {
    this.startSubject.next(new PlaySortingEvent(this.selectedAlgorithm, this.status))
    this.status = AnimationStatus.PAUSED;
    this.pauseButtonClass = "hidden";
    this.playButtonClass = "showed";
  }

  private reset(){
    this.status = AnimationStatus.STOPPED;
    this.pauseButtonClass = "hidden";
    this.playButtonClass = "showed";
    this.generateArray(this.size)
    this.resetSubject.next()
  }
}
