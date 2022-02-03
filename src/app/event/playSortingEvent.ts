import {AnimationStatus} from "../model/animation/AnimationStatus";
import {Algorithm} from "../model/algorithm";

export class PlaySortingEvent {
  private readonly _algorithm : Algorithm;
  private readonly _status : AnimationStatus;

  constructor(algorithm: Algorithm, status: AnimationStatus) {
    this._algorithm = algorithm;
    this._status = status;
  }

  get algorithm(): Algorithm {
    return this._algorithm;
  }

  get status(): AnimationStatus {
    return this._status;
  }
}
