import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Cell} from "../../model/cell";
import {MouseStatus} from "../../util/mouseStatus";
import {Observable, Subscription} from "rxjs";
import {ShortestPathServiceFactoryService} from "../../service/shortestPath/shortest-path-service-factory.service";
import {AnimationServiceService} from "../../service/animation-service.service";
import {AnimationStatus} from "../../model/animation/AnimationStatus";
import {PlayShortesPathEvent} from "../../event/playShortesPathEvent";
import {ShortestPathAlgorithm} from "../../model/shortestPathAlgorithm";

@Component({
  selector: 'app-grid-svg',
  templateUrl: './grid-search-component.html',
  styleUrls: ['./grid-search.component.scss']
})
export class GridSearchComponent implements OnInit, OnDestroy {

  grid: Cell[][] = []
  private mouseStatus: MouseStatus = MouseStatus.UP;
  private startSelected: boolean = false;
  private targetSelected: boolean = false;
  private constraintSelected: boolean = false;
  private startCell: any = null
  private targetCell: any = null
  private constraintCell: any = null
  private algorithm: ShortestPathAlgorithm | null = null

  @Input() resetEvent: Observable<void> | undefined;
  private resetEventSubscription: Subscription | undefined;
  @Input() startEvent: Observable<PlayShortesPathEvent> | undefined;
  private startEventSubscription: Subscription | undefined;
  animationFinishedEvent: Observable<void> | undefined;
  animationFinishedEventSubscription: Subscription | undefined;
  @Output()
  animationFinishedEventEmitter: EventEmitter<void> = new EventEmitter<void>();
  private status: AnimationStatus = AnimationStatus.STOPPED;


  constructor(private shortestPathServiceFactory: ShortestPathServiceFactoryService,
              private animationService: AnimationServiceService) {
  }

  ngOnInit(): void {
    this.resetEventSubscription = this.resetEvent?.subscribe(() => this.reset())
    this.startEventSubscription = this.startEvent?.subscribe((playShortesPathEvent: PlayShortesPathEvent) => this.start(playShortesPathEvent))
    this.animationFinishedEventSubscription = this.animationService.animationFinishedEvent.subscribe(() => this.sendFinishEvent())
    this.generateGrid();
  }

  private reExecuteAlgorithm() {
    let pathFinder = this.shortestPathServiceFactory.getPathFinder(this.algorithm!)
    let animations = pathFinder.find(this.grid, this.startCell, this.targetCell)
    this.animationService.executeInstantSearchAnimations(animations)
  }

  private start(playShortestPathEvent: PlayShortesPathEvent) {
    this.algorithm = playShortestPathEvent.algorithm
    switch (this.status) {
      case AnimationStatus.FINISHED: {
        this.reInitializeGrid()
        this.status = AnimationStatus.PLAYING;
        let pathFinder = this.shortestPathServiceFactory.getPathFinder(this.algorithm)
        let animations = pathFinder.find(this.grid, this.startCell, this.targetCell)
        this.animationService.executeSearchAnimations(animations)
        break;
      }
      case AnimationStatus.STOPPED: {
        let pathFinder = this.shortestPathServiceFactory.getPathFinder(this.algorithm)
        let animations = pathFinder.find(this.grid, this.startCell, this.targetCell)
        this.animationService.executeSearchAnimations(animations)
        this.status = AnimationStatus.PLAYING;
        break
      }
      case AnimationStatus.PAUSED: {
        this.status = AnimationStatus.PLAYING;
        this.animationService.resumeAnimations()
        break
      }
      case AnimationStatus.PLAYING: {
        this.status = AnimationStatus.PAUSED;
        this.animationService.pauseAnimations()
        break;
      }
    }
  }

  private reset() {
    this.status = AnimationStatus.STOPPED;
    this.grid = []
    this.mouseStatus = MouseStatus.UP
    this.startSelected = false;
    this.targetSelected = false;
    this.constraintSelected = false;
    this.generateGrid()
  }

  onGridMouseLeave() {
    this.mouseStatus = MouseStatus.UP
    this.startSelected = false;
    this.targetSelected = false;
    this.constraintSelected = false;
  }

  private generateGrid() {
    for (let row = 0; row < 30; row++) {
      let currentRow = []
      for (let col = 0; col < 50; col++) {
        currentRow.push(this.generateCell(row, col))
      }
      this.grid.push(currentRow);
    }
  }

  private reInitializeGrid() {
    for (let row = 0; row < 30; row++) {
      for (let col = 0; col < 50; col++) {
        if (this.grid[row][col].cssClass === "visited" || this.grid[row][col].cssClass === "shortestPath") {
          this.grid[row][col].isVisited = false
          this.grid[row][col].cssClass = "unvisited"
        }
      }
    }
  }

  private generateCell(row: number, col: number): Cell {
    if (row === 14 && col === 16) {
      let cell = new Cell(row, col, true, false, false, false, "unvisited");
      this.startCell = cell
      return cell
    }
    if (row === 14 && col === 33) {
      let cell = new Cell(row, col, false, true, false, false, "unvisited");
      this.targetCell = cell
      return cell
    }
    return new Cell(row, col, false, false, false, false, "unvisited");
  }

  onCellMouseDown(cell: Cell) {
    this.mouseStatus = MouseStatus.DOWN;
    if (this.status === AnimationStatus.FINISHED) {
      if (!cell.isStart && !cell.isTarget && !cell.isConstraint) {
        cell.toggleWall()
        this.reInitializeGrid()
        this.reExecuteAlgorithm()
        return
      }
    }
    if (!cell.isStart && !cell.isTarget && !cell.isConstraint) {
      cell.toggleWall()
    }
  }

  onCellMouseUp(cell: Cell) {
    this.mouseStatus = MouseStatus.UP
    this.startSelected = false;
    this.targetSelected = false;
    this.constraintSelected = false;
  }

  onCellMouseEnter(cell: Cell) {
    if (this.status === AnimationStatus.FINISHED){
      if (this.mouseStatus === MouseStatus.DOWN && !this.startSelected && !this.targetSelected && !this.constraintSelected) {
        cell.toggleWall()
        this.reInitializeGrid()
        this.reExecuteAlgorithm()
        return
      }
    }
    if (this.mouseStatus === MouseStatus.DOWN && !this.startSelected && !this.targetSelected && !this.constraintSelected) {
      cell.toggleWall()
    }
    if (this.startSelected) {
      cell.isStart = true
      this.startCell = cell;
      cell.toggleWall()

    }
    if (this.targetSelected) {
      cell.isTarget = true
      this.targetCell = cell
      cell.toggleWall()
    }
    if (this.constraintSelected) {
      cell.isConstraint = true
      this.constraintCell = cell
      cell.toggleWall()
    }
  }

  onCellMouseLeave(cell: Cell) {
    if (this.startSelected) {
      cell.isStart = false
    }
    if (this.targetSelected) {
      cell.isTarget = false
    }
    if (this.constraintSelected) {
      cell.isConstraint = false
    }
  }

  onIconMouseDown(cell: Cell) {
    if (cell.isStart) {
      this.startSelected = true;
      return;
    }
    if (cell.isTarget) {
      this.targetSelected = true;
    }
    if (cell.isConstraint) {
      this.constraintSelected = true;
    }
  }

  ngOnDestroy(): void {
    this.resetEventSubscription?.unsubscribe();
    this.startEventSubscription?.unsubscribe();
    this.animationFinishedEventSubscription?.unsubscribe();
  }

  private sendFinishEvent() {
    this.status = AnimationStatus.FINISHED;
    this.animationFinishedEventEmitter.emit();
  }
}
