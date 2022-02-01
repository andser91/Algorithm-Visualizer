import {Component, Input, OnInit} from '@angular/core';
import {SvgLine} from "../../interface/svgLine";
import {Observable, Subscription} from "rxjs";
import {Algorithm} from "../../interface/algorithm";
import {SortingServiceFactoryService} from "../../service/sorting-service-factory.service";
import {Sorter} from "../../service/sorter";


@Component({
  selector: 'app-array-bar-chart',
  templateUrl: './array-bar-chart.component.svg',
  styleUrls: ['./array-bar-chart.component.scss'],
})

export class ArrayBarChartComponent implements OnInit {

  @Input()
  public svgArray: Array<SvgLine> = new Array<SvgLine>();
  @Input() event: Observable<Algorithm> | undefined;
  private eventsSubscription: Subscription | undefined;

  constructor(private sortingServiceFactory : SortingServiceFactoryService) {}

  ngOnInit(): void {
    this.eventsSubscription = this.event?.subscribe((algorithm) => this.startSorting(algorithm));
  }

  startSorting(event: Algorithm) {
    let sorter : Sorter = this.sortingServiceFactory.getSorter(event)
    sorter.sort(this.svgArray);
  }
}
