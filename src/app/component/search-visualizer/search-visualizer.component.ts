import {Component, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {Subject} from "rxjs";
import {PlayShortesPathEvent} from "../../event/playShortesPathEvent";
import {ShortestPathAlgorithm} from "../../model/shortestPathAlgorithm";
import {AnimationStatus} from "../../model/animation/AnimationStatus";
import {MatSliderChange} from "@angular/material/slider";
import {MatSelectChange} from "@angular/material/select";

@Component({
  selector: 'app-search-visualizer',
  templateUrl: './search-visualizer.component.html',
  styleUrls: ['./search-visualizer.component.scss']
})
export class SearchVisualizerComponent implements OnInit {

  resetSubject : Subject<void> = new Subject<void>()
  startSubject: Subject<PlayShortesPathEvent> = new Subject<PlayShortesPathEvent>();
  private status: AnimationStatus = AnimationStatus.STOPPED;
  algorithms: Array<ShortestPathAlgorithm> = Object.values(ShortestPathAlgorithm)
  selectedAlgorithm: ShortestPathAlgorithm = ShortestPathAlgorithm.BFS;
  playButtonClass : string = "showed"
  pauseButtonClass: string = "hidden";
  animationCompleted: boolean = true;
  velocity: number = 10;
  distance : number = 0
  algorithmToDescription = new Map<ShortestPathAlgorithm, string>()
  algorithmDescription: string = "Breath-first Search is unweighted and guarantees the shortest path";

  constructor() { }



  ngOnInit(): void {
    this.algorithmToDescription.set(ShortestPathAlgorithm.BFS, "Breath-first Search is unweighted and guarantees the shortest path");
    this.algorithmToDescription.set(ShortestPathAlgorithm.DFS, "Depth-first Search is unweighted and does not guarantee the shortest path!");
    this.algorithmToDescription.set(ShortestPathAlgorithm.DIJKSTRA, "Dijkstra's Algorithm is weighted and guarantees the shortest path!");
  }

  reset() {
    this.playButtonClass = "showed"
    this.pauseButtonClass = "hidden"
    this.animationCompleted = true
    this.distance = 0;
    this.resetSubject.next();
  }

  onPlayClicked() {
      this.startSubject.next(new PlayShortesPathEvent(this.status));
      this.playButtonClass = "hidden"
      this.pauseButtonClass = "showed"
      this.animationCompleted = false

  }

  onPauseClicked() {
      this.startSubject.next(new PlayShortesPathEvent(this.status));
      this.playButtonClass = "showed"
      this.pauseButtonClass = "hidden"
  }

  onAnimationFinished(event: number) {
    this.pauseButtonClass = "hidden";
    this.playButtonClass = "showed";
    this.animationCompleted = true
    this.distance = event
  }

  velocitySliderChange(event: MatSliderChange) {
    this.velocity = event.value || 10;
  }

  onAlgorithmChange(event: MatSelectChange) {
    this.algorithmDescription = this.algorithmToDescription.get(event.value)!;
  }
}
