import {Animation} from "./animation";
import {SvgLine} from "../svgLine";

export class ColorAnimation extends Animation {
  private readonly first : SvgLine;
  private readonly second : SvgLine | null = null;
  private readonly color : string;

  constructor(color: string, ...svgLines : SvgLine[]) {
    super();
    this.first = svgLines[0];
    if (svgLines[1] != null){
      this.second = svgLines[1]
    }
    this.color = color;
  }

  animate(): void {
    this.first.color = this.color;
    if (this.second !== null) this.second.color = this.color;
  }

}
