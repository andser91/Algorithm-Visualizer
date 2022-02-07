
export class Cell{
  row : number;
  column : number;
  isStart : boolean;
  isTarget : boolean;
  isConstraint : boolean;
  isWall : boolean;
  isVisited : boolean;
  weight : number
  cssClass : string
  previousCssClass : string
  distance : number;
  previousNode : Cell | null

  constructor(row: number, column: number, isStart: boolean, isTarget: boolean, isConstraint: boolean, isWall: boolean,
              cssClass : string) {
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
    this.previousCssClass = cssClass
    this.weight = 1;
  }

  setCssClass(cssClass : string){
    this.previousCssClass = this.cssClass;
    this.cssClass = cssClass
  }

  public isIcon(){
    return this.isStart || this.isTarget || this.isConstraint
  }

  public toggleWall(){
    if (!this.isIcon() && this.cssClass !== "wall") {
      this.isWall = true
      this.setCssClass("wall")
    }
    else {
      this.isWall = false
      this.setCssClass(this.previousCssClass)
    }
  }
}
