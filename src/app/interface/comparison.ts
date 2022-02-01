
export class Comparison {
  firstIndex: number;
  firstValue: number;
  secondIndex: number;
  secondValue: number;
  swap : boolean;
  firstColor : string;
  secondColor: string
  terminated: boolean

  constructor(firstIndex: number, firstValue: number, secondIndex: number, secondValue: number, swap : boolean, firstColor: string, secondColor: string, terminated: boolean) {
    this.firstIndex = firstIndex;
    this.firstValue = firstValue;
    this.secondIndex = secondIndex;
    this.secondValue = secondValue;
    this.swap = swap;
    this.firstColor = firstColor;
    this.secondColor = secondColor;
    this.terminated = terminated;
  }
}
