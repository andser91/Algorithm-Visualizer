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

  private bfs(graph: Cell[][], source: Cell, target: Cell) {
    let animations = new Array<Animation>()
    let queue: Cell[] = []
    source.isVisited = true;
    source.distance = 0;
    animations.push(new CssClassAnimation(source, "visited"))
    queue.push(source)

    while (queue.length > 0) {
      let node: Cell | undefined = queue.shift();
      let neighbourNode = this.getNeighbours(graph, node!)
      for (let i = 0; i < neighbourNode.length; i++) {
        if (!neighbourNode[i].isVisited) {
          neighbourNode[i].isVisited = true;
          animations.push(new CssClassAnimation(neighbourNode[i], "visited"))
          neighbourNode[i].distance = node!.distance + 1;
          neighbourNode[i].previousNode = node!;
          queue.push(neighbourNode[i])
          if (neighbourNode[i] === target){
            return animations
          }
        }
      }
    }
    return animations
  }

  private getNeighbours(graph: Cell[][], cell: Cell): Cell[] {
    let neighbourNode: Cell[] = []
    let row = cell.row
    let col = cell.column
    if (row - 1 >= 0) {
      if (!graph[row - 1][col].isWall) {
        neighbourNode.push(graph[row - 1][col])
      }
    }
    if (row + 1 < graph.length) {
      if (!graph[row + 1][col].isWall)
        neighbourNode.push(graph[row + 1][col])
    }
    if (col - 1 >= 0) {
      if (!graph[row][col - 1].isWall) {
        neighbourNode.push(graph[row][col - 1])
      }
    }
    if (col + 1 < graph[row].length) {
      if (!graph[row][col + 1].isWall) {
        neighbourNode.push(graph[row][col + 1])
      }
    }
    return neighbourNode;
  }
}
