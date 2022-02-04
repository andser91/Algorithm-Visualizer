import {AnimationStatus} from "../model/animation/AnimationStatus";
import {SortingAlgorithm} from "../model/sortingAlgorithm";

export class PlaySortingEvent {
  private readonly _algorithm : SortingAlgorithm;
  private readonly _status : AnimationStatus;

  constructor(algorithm: SortingAlgorithm, status: AnimationStatus) {
    this._algorithm = algorithm;
    this._status = status;
  }

  get algorithm(): SortingAlgorithm {
    return this._algorithm;
  }

  get status(): AnimationStatus {
    return this._status;
  }
}
