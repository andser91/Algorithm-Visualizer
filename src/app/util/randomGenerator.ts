
export class RandomGenerator{



  public static getNumber(n : number) : number {
    return  Math.floor(Math.random() * n);
  }

  public static getNumberInInterval(n : number, m: number) : number {
      return Math.floor(Math.random() * (m - n + 1)) + n;
    }
}
