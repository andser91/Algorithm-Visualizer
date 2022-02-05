import {Component, OnInit} from '@angular/core';
import {Subject} from "rxjs";
import {PlayShortesPathEvent} from "../../event/playShortesPathEvent";
import {ShortestPathAlgorithm} from "../../model/shortestPathAlgorithm";
import {AnimationStatus} from "../../model/animation/AnimationStatus";

@Component({
  selector: 'app-search-visualizer',
  templateUrl: './search-visualizer.component.html',
  styleUrls: ['./search-visualizer.component.scss']
})
export class SearchVisualizerComponent implements OnInit {

  resetSubject : Subject<void> = new Subject<void>()
  startSubject: Subject<PlayShortesPathEvent> = new Subject<PlayShortesPathEvent>();
  private status: AnimationStatus = AnimationStatus.STOPPED;
  playButtonClass : string = "showed"
  pauseButtonClass: string = "hidden";

  constructor() { }

  ngOnInit(): void {
  }

  reset() {
    this.playButtonClass = "showed"
    this.pauseButtonClass = "hidden"
    this.resetSubject.next();
  }

  onPlayClicked() {
      this.startSubject.next(new PlayShortesPathEvent(ShortestPathAlgorithm.BFS, this.status));
      this.playButtonClass = "hidden"
      this.pauseButtonClass = "showed"
  }

  onPauseClicked() {
      this.startSubject.next(new PlayShortesPathEvent(ShortestPathAlgorithm.BFS, this.status));
      this.playButtonClass = "showed"
      this.pauseButtonClass = "hidden"
  }

  onAnimationFinished() {
    this.pauseButtonClass = "hidden";
    this.playButtonClass = "showed";
    //serve per disabilitare gli input dell'algoritmo
    // this.animationCompleted = true
  }
}
