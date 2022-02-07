import {Cell} from "../../model/cell";
import {Animation} from "../../model/animation/animation";

export abstract class GraphAlgorithmService{

  abstract executeAlgorithm(graph : Cell[][], source: Cell, targetCell: Cell) : Array<Animation>;

}
