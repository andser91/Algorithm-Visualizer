export class SvgLine {
  index : number;
  x1 : number;
  x2 : number;
  y1 : number;
  y2 : number;
  color : string;
  temp : number;


  constructor(index: number, x1: number, x2: number, y1: number, y2: number, color: string) {
    this.index = index;
    this.x1 = x1;
    this.x2 = x2;
    this.y1 = y1;
    this.y2 = y2;
    this.temp = y2;
    this.color = color;
  }
}
