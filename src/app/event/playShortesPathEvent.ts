import {SortingAlgorithm} from "../model/sortingAlgorithm";
import {AnimationStatus} from "../model/animation/AnimationStatus";
import {ShortestPathAlgorithm} from "../model/shortestPathAlgorithm";

export class PlayShortesPathEvent{
  private readonly _algorithm : ShortestPathAlgorithm;
  private readonly _status : AnimationStatus;

  constructor(algorithm: ShortestPathAlgorithm, status: AnimationStatus) {
    this._algorithm = algorithm;
    this._status = status;
  }

  get algorithm(): ShortestPathAlgorithm {
    return this._algorithm;
  }

  get status(): AnimationStatus {
    return this._status;
  }
}
