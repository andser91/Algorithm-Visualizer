import {Component, OnInit} from '@angular/core';
import {MatSliderChange} from "@angular/material/slider";
import {Subject} from "rxjs";
import {SortingAlgorithm} from "../../model/sortingAlgorithm";
import {AnimationStatus} from "../../model/animation/AnimationStatus";
import {PlaySortingEvent} from "../../event/playSortingEvent";

@Component({
  selector: 'app-sorting-visualizer',
  templateUrl: './sorting-visualizer.component.html',
  styleUrls: ['./sorting-visualizer.component.scss']
})
export class SortingVisualizerComponent implements OnInit {

  array: Array<number> = new Array<number>();
  size: number = 100;
  velocity: number = 10;
  algorithms: Array<SortingAlgorithm> = Object.values(SortingAlgorithm)
  selectedAlgorithm: SortingAlgorithm = SortingAlgorithm.BUBBLE_SORT;
  startSubject: Subject<PlaySortingEvent> = new Subject<PlaySortingEvent>();
  resetSubject: Subject<void> = new Subject<void>()
  playButtonClass: string = "showed"
  pauseButtonClass: string = "hidden";
  private status: AnimationStatus = AnimationStatus.STOPPED;
  animationCompleted: boolean = true;

  constructor() {
  }

  ngOnInit(): void {
    this.generateArray(this.size);
  }

  generateArray(size: number) {
    this.array = [];
    for (let i = 1; i <= size; i++) {
      this.array.push(this.generateIntInInterval(5, 1000));
    }
  }

  generateIntInInterval(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  sizeSliderChange(event: MatSliderChange) {
    this.size = event.value || 100;
    this.reset();
  }

  velocitySliderChange(event: MatSliderChange) {
    this.velocity = event.value || 10;
  }

  onNewArrayClicked() {
    this.reset();
  }

  onPlayClicked() {
    if (this.status !== AnimationStatus.FINISHED) {
      this.startSubject.next(new PlaySortingEvent(this.selectedAlgorithm, this.status))
      this.status = AnimationStatus.PLAYING;
      this.playButtonClass = "hidden";
      this.pauseButtonClass = "showed"
      this.animationCompleted = false
    }
  }

  onPauseClicked() {
    if (this.status !== AnimationStatus.FINISHED) {
      this.startSubject.next(new PlaySortingEvent(this.selectedAlgorithm, this.status))
      this.status = AnimationStatus.PAUSED;
      this.pauseButtonClass = "hidden";
      this.playButtonClass = "showed";
    }
  }

  private reset() {
    this.status = AnimationStatus.STOPPED;
    this.pauseButtonClass = "hidden";
    this.playButtonClass = "showed";
    this.resetSubject.next()
    this.animationCompleted = true
    this.generateArray(this.size)
  }

  onAnimationFinished() {
    this.status = AnimationStatus.FINISHED;
    this.pauseButtonClass = "hidden";
    this.playButtonClass = "showed";
    this.animationCompleted = true
  }
}
