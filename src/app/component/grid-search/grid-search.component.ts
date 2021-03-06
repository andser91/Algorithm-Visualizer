import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Cell} from "../../model/cell";
import {MouseStatus} from "../../util/mouseStatus";
import {Observable, Subscription} from "rxjs";
import {AnimationServiceService} from "../../service/animation-service.service";
import {AnimationStatus} from "../../model/animation/AnimationStatus";
import {PlayShortesPathEvent} from "../../event/playShortesPathEvent";
import {ShortestPathAlgorithm} from "../../model/shortestPathAlgorithm";
import {GraphAlgorithmFactoryService} from "../../service/graph/graph-algorithm-factory.service";
import {Constant} from "../../util/constant";

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
  @Input()
  algorithm: ShortestPathAlgorithm = ShortestPathAlgorithm.BFS
  @Input()
  diagonal : boolean = false;
  @Input()
  velocity: number = 10;
  @Input() resetEvent: Observable<void> | undefined;
  private resetEventSubscription: Subscription | undefined;
  @Input() startEvent: Observable<PlayShortesPathEvent> | undefined;
  private startEventSubscription: Subscription | undefined;
  animationFinishedEvent: Observable<void> | undefined;
  animationFinishedEventSubscription: Subscription | undefined;
  @Output()
  animationFinishedEventEmitter: EventEmitter<number> = new EventEmitter<number>();
  private status: AnimationStatus = AnimationStatus.STOPPED;


  constructor(private graphAlgorithmFactory: GraphAlgorithmFactoryService,
              private animationService: AnimationServiceService) {
  }

  ngOnInit(): void {
    this.resetEventSubscription = this.resetEvent?.subscribe(() => this.reset())
    this.startEventSubscription = this.startEvent?.subscribe((playShortesPathEvent: PlayShortesPathEvent) => this.start(playShortesPathEvent))
    this.animationFinishedEventSubscription = this.animationService.animationFinishedEvent.subscribe(() => this.sendFinishEvent())
    this.generateGrid();
  }

  private reExecuteAlgorithm() {
    let algorithmService = this.graphAlgorithmFactory.getService(this.algorithm!)
    let animations = algorithmService.executeAlgorithm(this.grid, this.startCell, this.targetCell, this.diagonal)
    this.animationService.executeInstantSearchAnimations(animations)
  }

  private start(playShortestPathEvent: PlayShortesPathEvent) {
    switch (this.status) {
      case AnimationStatus.FINISHED: {
        this.reInitializeGrid()
        this.status = AnimationStatus.PLAYING;
        let algorithmService = this.graphAlgorithmFactory.getService(this.algorithm!)
        let animations = algorithmService.executeAlgorithm(this.grid, this.startCell, this.targetCell, this.diagonal)
        this.animationService.executeSearchAnimations(animations, this.velocity)
        break;
      }
      case AnimationStatus.STOPPED: {
        let algorithmService = this.graphAlgorithmFactory.getService(this.algorithm!)
        let animations = algorithmService.executeAlgorithm(this.grid, this.startCell, this.targetCell, this.diagonal)
        this.animationService.executeSearchAnimations(animations, this.velocity)
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
    for (let row = 0; row < Constant.ROWS; row++) {
      let currentRow = []
      for (let col = 0; col < Constant.COLUMNS; col++) {
        currentRow.push(this.generateCell(row, col))
      }
      this.grid.push(currentRow);
    }
  }

  private reInitializeGrid() {
    for (let row = 0; row < Constant.ROWS; row++) {
      for (let col = 0; col < Constant.COLUMNS; col++) {
        this.grid[row][col].previousNode = null;
        this.grid[row][col].distance = Number.MAX_VALUE;
        if (this.grid[row][col].cssClass === "visited" || this.grid[row][col].cssClass === "shortestPath") {
          this.grid[row][col].isVisited = false
          this.grid[row][col].cssClass = "unvisited"
        }
        if (this.algorithm === ShortestPathAlgorithm.RECURSIVE_DIVISION) {
          this.grid[row][col].isWall = false
          this.grid[row][col].cssClass = "unvisited"
        }
      }
    }
  }

  private generateCell(row: number, col: number): Cell {
    if (row === 12 && col === 19) {
      let cell = new Cell(row, col, true, false, false, false, "unvisited");
      this.startCell = cell
      return cell
    }
    if (row === 12 && col === 39) {
      let cell = new Cell(row, col, false, true, false, false, "unvisited");
      this.targetCell = cell
      return cell
    }
    return new Cell(row, col, false, false, false, false, "unvisited");
  }

  onCellMouseDown(event: MouseEvent, cell: Cell) {
    if (event.button === 0) {
      this.mouseStatus = MouseStatus.DOWN;
      if (!cell.isStart && !cell.isTarget && !cell.isConstraint) {
        if (this.status === AnimationStatus.STOPPED || this.status === AnimationStatus.FINISHED) {
          if (cell.weight !== 1) {
            cell.weight = 1
          } else {
            cell.toggleWall()
          }
        }
      }
    }
  }

  onCellMouseUp(event: MouseEvent) {
    if (this.status === AnimationStatus.FINISHED && event.button === 0) {
      this.reInitializeGrid()
      this.reExecuteAlgorithm()
    }
    this.mouseStatus = MouseStatus.UP
    this.startSelected = false;
    this.targetSelected = false;
    this.constraintSelected = false;
  }

  onCellMouseEnter(cell: Cell) {
    if (this.mouseStatus === MouseStatus.DOWN && !this.startSelected && !this.targetSelected && !this.constraintSelected) {
      if (this.status === AnimationStatus.FINISHED) {
        if (cell.weight !== 1) {
          cell.weight = 1
        } else {
          cell.toggleWall()
        }
        this.reInitializeGrid()
        this.reExecuteAlgorithm()
        return
      }
      if (this.status === AnimationStatus.STOPPED) {
        if (cell.weight !== 1) {
          cell.weight = 1
        } else {
          cell.toggleWall()
        }
      }
    }
    if (this.startSelected) {
      if (this.status === AnimationStatus.STOPPED || this.status === AnimationStatus.FINISHED) {
        if (!this.iconInCell(cell)) {
          this.startCell.isStart = false;
          cell.isStart = true
          this.startCell = cell;
        }
      }
    }
    if (this.targetSelected) {
      if (this.status === AnimationStatus.STOPPED || this.status === AnimationStatus.FINISHED) {
        if (!this.iconInCell(cell)) {
          this.targetCell.isTarget = false;
          cell.isTarget = true
          this.targetCell = cell
        }
      }
    }
    if (this.constraintSelected) {
      if (this.status === AnimationStatus.STOPPED || this.status === AnimationStatus.FINISHED) {
        if (!this.iconInCell(cell)) {
          this.constraintCell.isConstraint = false
          cell.isConstraint = true
          this.constraintCell = cell
        }
      }
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
    this.animationFinishedEventEmitter.emit(this.targetCell.distance);
  }

  onRightClick($event: MouseEvent, cell: Cell) {
    if (this.isAlgorithmWeightedSelected()) {
      if (this.status === AnimationStatus.FINISHED && !cell.isWall) {
        cell.weight++
        this.reInitializeGrid()
        this.reExecuteAlgorithm()
      }
      if (this.status === AnimationStatus.STOPPED && !cell.isWall) {
        cell.weight++
      }
    }
    return false
  }

  isAlgorithmWeightedSelected(): boolean {
    return this.algorithm === ShortestPathAlgorithm.DIJKSTRA;
  }

  private iconInCell(cell: Cell) {
    return cell.isStart || cell.isTarget || cell.isConstraint;
  }
}
