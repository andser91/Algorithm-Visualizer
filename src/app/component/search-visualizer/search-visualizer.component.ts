import { Component, OnInit } from '@angular/core';
import {Subject} from "rxjs";

@Component({
  selector: 'app-search-visualizer',
  templateUrl: './search-visualizer.component.html',
  styleUrls: ['./search-visualizer.component.scss']
})
export class SearchVisualizerComponent implements OnInit {

  resetSubject : Subject<void> = new Subject<void>()
  startSubject: Subject<void> = new Subject<void>();

  constructor() { }

  ngOnInit(): void {
  }

  reset() {
    this.resetSubject.next();
  }

  onPlayClicked() {
    this.startSubject.next();
  }
}
