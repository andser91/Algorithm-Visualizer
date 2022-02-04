import {Cell} from "../../model/cell";
import {Animation} from "../../model/animation/animation";
import {CssClassAnimation} from "../../model/animation/cssClassAnimation";

export abstract class PathFinder{

  abstract find(graph : Cell[][], source: Cell, targetCell: Cell) : Array<Animation>;

  protected findShortestPath(source : Cell, target: Cell, animations: Animation[]) {
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
}
