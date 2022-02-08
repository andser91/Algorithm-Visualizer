import {Injectable} from '@angular/core';
import {PathFinder} from "../pathFinder";
import {Cell} from "../../../../model/cell";
import {Animation} from "../../../../model/animation/animation";
import {CssClassAnimation} from "../../../../model/animation/cssClassAnimation";

@Injectable({
  providedIn: 'root'
})
export class DfsService extends PathFinder {

  constructor() {
    super();
  }

  executeAlgorithm(graph: Cell[][], source: Cell, target: Cell, diagonal : boolean): Array<Animation> {
    let animations = this.dfs(graph, source, target, diagonal)
    this.findShortestPath(source, target, animations)
    return animations;
  }

  private dfs(graph: Cell[][], source: Cell, target: Cell, diagonal : boolean) : Array<Animation>{
    let animations = new Array<Animation>()
    let stack: Cell[] = []
    source.isVisited = true;
    animations.push(new CssClassAnimation(source, "visited"))
    source.distance = 0
    stack.push(source)

    while (stack.length > 0) {
      let node: Cell | undefined = stack.pop()!;
      node.isVisited = true;
      animations.push(new CssClassAnimation(node, "visited"))
      let neighbourNode = this.getNeighbours(graph, node, diagonal)
      for (let i = 0; i < neighbourNode.length; i++) {
        if (!neighbourNode[i].isVisited) {
          neighbourNode[i].distance = node.distance + 1;
          neighbourNode[i].previousNode = node;
          stack.push(neighbourNode[i])
          if (neighbourNode[i] === target){
            neighbourNode[i].isVisited = true;
            animations.push(new CssClassAnimation(neighbourNode[i], "visited"))
            return animations
          }
        }
      }
    }
    return animations
  }

}
