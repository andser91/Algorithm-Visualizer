import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {SvgLine} from "../../model/svgLine";
import {Observable, Subscription} from "rxjs";
import {SortingServiceFactoryService} from "../../service/sorting/sorting-service-factory.service";
import {Sorter} from "../../service/sorting/sorter";
import {PlaySortingEvent} from "../../event/playSortingEvent";
import {AnimationStatus} from "../../model/animation/AnimationStatus";
import {AnimationServiceService} from "../../service/animation-service.service";


@Component({
  selector: 'app-array-bar-chart',
  templateUrl: './array-bar-chart.component.svg',
  styleUrls: ['./array-bar-chart.component.scss'],
})

export class ArrayBarChartComponent implements OnInit, OnDestroy {

  @Input()
  svgArray: Array<SvgLine> = new Array<SvgLine>();
  @Input()
  velocity: number = 10;
  @Input() startEvent: Observable<PlaySortingEvent> | undefined;
  private startEventSubscription: Subscription | undefined;
  @Input() resetEvent: Observable<void> | undefined;
  private resetEventSubscription: Subscription | undefined;
  animationFinishedEvent: Observable<void> | undefined;
  animationFinishedEventSubscription: Subscription | undefined;
  private sorter : Sorter | undefined
  @Output()
  animationFinishedEventEmitter : EventEmitter<void> = new EventEmitter<void>();

  constructor(private sortingServiceFactory : SortingServiceFactoryService,
              private animationService : AnimationServiceService) {
  }

  ngOnInit(): void {
    this.startEventSubscription = this.startEvent?.subscribe((algorithm) => this.startSorting(algorithm));
    this.resetEventSubscription = this.resetEvent?.subscribe(() => this.resetAll());
    this.animationFinishedEventSubscription = this.animationService.animationFinishedEvent.subscribe(() => this.sendFinishEvent())
  }

  private startSorting(playSortingEvent : PlaySortingEvent) {
    if (playSortingEvent.status === AnimationStatus.FINISHED){
    }
    if (playSortingEvent.status === AnimationStatus.STOPPED) {
      this.sorter = this.sortingServiceFactory.getSorter(playSortingEvent.algorithm)
      let animations = this.sorter?.sort(this.svgArray);
      this.animationService.executeSortingAnimations(this.svgArray, animations, this.velocity)
    }
    if (playSortingEvent.status === AnimationStatus.PAUSED) {
      this.animationService.resumeAnimations();
    }
    if (playSortingEvent.status === AnimationStatus.PLAYING){
      this.animationService.pauseAnimations();
    }
  }

  private resetAll(){
    this.animationService.clearResources();
  }

  private sendFinishEvent() {
   this.animationFinishedEventEmitter.emit();
  }

  ngOnDestroy() : void{
    this.startEventSubscription?.unsubscribe();
    this.resetEventSubscription?.unsubscribe();
    this.animationFinishedEventSubscription?.unsubscribe();
  }
}
