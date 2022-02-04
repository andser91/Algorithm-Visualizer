import {Constant} from "../util/constant";

export class Cell{
  row : number;
  column : number;
  isStart : boolean;
  isTarget : boolean;
  isConstraint : boolean;
  isWall : boolean;
  isVisited : boolean;

  cssClass : string
  distance : number;
  previousNode : Cell | null

  constructor(row: number, column: number, isStart: boolean,
              isTarget: boolean, isConstraint: boolean, isWall: boolean, cssClass : string) {
    this.row = row;
    this.column = column;
    this.isStart = isStart;
    this.isTarget = isTarget;
    this.isConstraint = isConstraint;
    this.isWall = isWall;
    this.cssClass = cssClass
    this.distance = Number.MAX_VALUE;
    this.isVisited = false
    this.distance = Number.MAX_VALUE;
    this.previousNode = null
  }

  public isIcon(){
    return this.isStart || this.isTarget || this.isConstraint
  }

  public toggleWall(){
    if (!this.isIcon() && this.cssClass !== "wall") {
      this.isWall = true;
      this.cssClass = "wall"
    }
    else {
      this.isWall = false;
      this.cssClass = "unvisited"
    }
  }
}
