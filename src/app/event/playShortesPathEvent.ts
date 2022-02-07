import {AnimationStatus} from "../model/animation/AnimationStatus";

export class PlayShortesPathEvent{
  private readonly _status : AnimationStatus;

  constructor(status: AnimationStatus) {
    this._status = status;
  }

  get status(): AnimationStatus {
    return this._status;
  }
}
