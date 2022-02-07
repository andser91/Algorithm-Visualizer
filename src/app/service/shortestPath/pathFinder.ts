import {Cell} from "../../model/cell";
import {Animation} from "../../model/animation/animation";
import {CssClassAnimation} from "../../model/animation/cssClassAnimation";

export abstract class PathFinder{

  abstract find(graph : Cell[][], source: Cell, targetCell: Cell) : Array<Animation>;

  protected findShortestPath(source : Cell, target: Cell, animations: Animation[]) {
    source.previousNode = null;
    let path = new Array<Cell>()
    let temp = target
    path.push(target);
    while (temp.previousNode != null){
      path.push(temp!)
      temp = temp.previousNode!
    }
    path.push(source)

    for(let i= path.length -1; i>=0; i--){
      animations.push(new CssClassAnimation(path[i], "shortestPath"))
    }
  }

  protected getNeighbours(graph: Cell[][], cell: Cell): Cell[] {
    let neighbourNode: Cell[] = []
    let row = cell.row
    let col = cell.column

    if (col - 1 >= 0) {
      if (!graph[row][col - 1].isWall) {
        neighbourNode.push(graph[row][col - 1])
      }
    }
    if (row + 1 < graph.length) {
      if (!graph[row + 1][col].isWall)
        neighbourNode.push(graph[row + 1][col])
    }
    if (row - 1 >= 0) {
      if (!graph[row - 1][col].isWall) {
        neighbourNode.push(graph[row - 1][col])
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
