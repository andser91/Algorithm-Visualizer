import {SvgLine} from "../../model/svgLine";
import {Animation} from "../../model/animation/animation";
import {SwapAnimation} from "../../model/animation/swapAnimation";

export abstract class Sorter {
  abstract sort(svgArray: Array<SvgLine>): Array<Animation>

  swap(first: SvgLine, second: SvgLine, animations: Animation[]) {
    animations.push(new SwapAnimation(first, second.temp, second, first.temp));
    let temp = first.temp
    first.temp = second.temp
    second.temp = temp
  }

  insert(elem : SvgLine, value : number, animations: Animation[]){
    animations.push(new SwapAnimation(elem, value));
    elem.temp = value
  }
}

