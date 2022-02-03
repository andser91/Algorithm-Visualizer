export class Timer {

  private readonly callback: Function;
  private start: number;
  private timerId: number;
  private _remaining: number;
  private _paused : boolean;

  constructor(callback: Function, delay: number) {
    this.callback = callback;
    this.start = delay;
    this.timerId = delay;
    this._remaining = delay;
    this._paused = false;
    this.resume();
  }

  public clear(){
    clearTimeout(this.timerId);
  }

  public pause() {
    clearTimeout(this.timerId);
    this._paused = true;
    this._remaining -= new Date().getTime() - this.start;
  }

  public resume() {
    this.start = new Date().getTime();
    this.timerId = setTimeout(this.callback, this._remaining);
  }

  get paused(): boolean {
    return this._paused;
  }

  set paused(value: boolean) {
    this._paused = value;
  }

  get remaining(): number {
    return this._remaining;
  }
}
