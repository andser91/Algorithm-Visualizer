import { Injectable } from '@angular/core';
import {Cell} from "../../../model/cell";
import {PathFinder} from "../pathFinder";
import {Animation} from "../../../model/animation/animation";

@Injectable({
  providedIn: 'root'
})
export class DijkstraService extends PathFinder{

  constructor() {
    super();
  }

  find(graph: Cell[][], source: Cell, targetCell: Cell): Array<Animation> {
    let animations = new Array<Animation>()
    return animations;
  }


}
