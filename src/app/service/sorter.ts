import {SvgLine} from "../interface/svgLine";

export interface Sorter{
  sort(svgArray: Array<SvgLine>) : void
}
