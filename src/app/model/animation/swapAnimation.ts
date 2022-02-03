import {Animation} from "./animation";
import {SvgLine} from "../svgLine";

export class SwapAnimation extends Animation{

  private readonly first : SvgLine;
  private readonly firstValue: number;
  private readonly second : SvgLine | null = null
  private readonly secondValue: number | null = null;

  constructor(first : SvgLine, firstValue : number);
  constructor(first : SvgLine, firstValue : number, second: SvgLine, secondValue: number);
  constructor(...args : any[]) {
    super();
    this.first = args[0]
    this.firstValue = args[1]
    if (args.length == 4){
      this.second = args[2]
      this.secondValue = args[3]
    }
  }

  animate(): void {
    this.first.y2 = this.firstValue
    if (this.second !== null && this.secondValue !== null){
      this.second.y2 = this.secondValue
    }
  }

}
