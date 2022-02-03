import {SvgLine} from "../model/svgLine";
import {Animation} from "../model/animation/animation";

export interface Sorter {
  sort(svgArray: Array<SvgLine>): Array<Animation>
}

