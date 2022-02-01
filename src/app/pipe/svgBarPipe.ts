import {Pipe, PipeTransform} from "@angular/core";
import {SvgLine} from "../interface/svgLine";

@Pipe({ name: 'svgBarPipe' })
export class SvgBarPipe implements PipeTransform {

  transform(array : Array<number>): Array<SvgLine> {
    let arrayBar = [];
    for (let i = 0; i < array.length; i++){
      arrayBar.push(this.createSvgLine(array.length, array[i], i));
    }
    return arrayBar
  }

  createSvgLine(length : number, element: number, index : number) : SvgLine {
    return new SvgLine(index,  1600*index/length, 1600*index/length, 0, element, "#673ab7");
  }

}
