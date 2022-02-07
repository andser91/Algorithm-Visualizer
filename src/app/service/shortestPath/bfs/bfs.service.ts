import {Injectable} from '@angular/core';
import {PathFinder} from "../pathFinder";
import {Cell} from "../../../model/cell";
import {Animation} from "../../../model/animation/animation";
import {CssClassAnimation} from "../../../model/animation/cssClassAnimation";

@Injectable({
  providedIn: 'root'
})
export class BfsService extends PathFinder {

  constructor() {
    super();
  }

  find(graph: Cell[][], source: Cell, target: Cell): Array<Animation> {
    let animations = this.bfs(graph, source, target)
    this.findShortestPath(source, target, animations)
    return animations;
  }

  private bfs(graph: Cell[][], source: Cell, target: Cell) : Array<Animation>{
    let animations = new Array<Animation>()
    let queue: Cell[] = []
    source.isVisited = true;
    animations.push(new CssClassAnimation(source, "visited"))
    queue.push(source)
    source.distance = 0

    while (queue.length > 0) {
      let node: Cell | undefined = queue.shift()!;
      let neighbourNode = this.getNeighbours(graph, node)
      for (let i = 0; i < neighbourNode.length; i++) {
        if (!neighbourNode[i].isVisited) {
          neighbourNode[i].isVisited = true;
          animations.push(new CssClassAnimation(neighbourNode[i], "visited"))
          neighbourNode[i].previousNode = node;
          neighbourNode[i].distance = node.distance + 1
          queue.push(neighbourNode[i])
          if (neighbourNode[i] === target){
            return animations
          }
        }
      }
    }
    return animations
  }
}
