import { Injectable } from '@angular/core';
import {PathFinder} from "../pathFinder";
import {Cell} from "../../../model/cell";
import {Animation} from "../../../model/animation/animation";

@Injectable({
  providedIn: 'root'
})
export class DfsService extends PathFinder{

  constructor() {
    super();
  }

  find(graph: Cell[][], source: Cell, targetCell: Cell): Array<Animation> {
    let animations = new Array<Animation>()
    return animations;
  }

}
