import {Cell} from "../cell";
import {Animation} from "./animation";

export class CssClassAnimation extends Animation {
  private readonly cell : Cell
  private readonly cssClass : string


  constructor(cell: Cell, cssClass: string) {
    super();
    this.cell = cell;
    this.cssClass = cssClass;
  }

  animate(): void {
    this.cell.setCssClass(this.cssClass);
  }
}
