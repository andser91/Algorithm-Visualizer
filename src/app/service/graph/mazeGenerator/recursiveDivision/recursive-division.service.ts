import {Injectable} from '@angular/core';
import {MazeGenerator} from "../mazeGenerator";
import {Cell} from "../../../../model/cell";
import {Animation} from "../../../../model/animation/animation";
import {Orientation} from "../../../../model/orientation";
import {RandomGenerator} from "../../../../util/randomGenerator";
import {CssClassAnimation} from "../../../../model/animation/cssClassAnimation";
import {Constant} from "../../../../util/constant";

@Injectable({
  providedIn: 'root'
})
export class RecursiveDivisionService extends MazeGenerator {

  constructor() {
    super();
  }

  executeAlgorithm(graph: Cell[][], source: Cell, target: Cell): Array<Animation> {
    let animations = new Array<Animation>()
    this.makeExternalWall(graph, animations);
    this.recursiveDivision(graph, 2, graph.length - 3, 2, graph[0].length - 3, animations);
    return animations;
  }

  private recursiveDivision(graph: Cell[][], rowStart: number, rowEnd: number,
                            colStart: number, colEnd: number, animations: Animation[]) {

    if (rowEnd < rowStart || colEnd < colStart) {
      return;
    }
    let orientation = this.getOrientation(colEnd - colStart, rowEnd - rowStart);
    if (orientation === Orientation.HORIZONTAL) {
      let possibleRows = [];
      for (let number = rowStart; number <= rowEnd; number += 2) {
        possibleRows.push(number);
      }
      let possibleCols = [];
      for (let number = colStart - 1; number <= colEnd + 1; number += 2) {
        possibleCols.push(number);
      }
      let randomRowIndex = Math.floor(Math.random() * possibleRows.length);
      let randomColIndex = Math.floor(Math.random() * possibleCols.length);
      let currentRow = possibleRows[randomRowIndex];
      let colRandom = possibleCols[randomColIndex];
      for (let col = 0; col < Constant.COLUMNS; col++) {
        if (col !== colRandom && col >= colStart - 1 && col <= colEnd + 1) {
          if (!graph[currentRow][col].isStart && !graph[currentRow][col].isTarget && !graph[currentRow][col].isConstraint) {
            graph[currentRow][col].isWall = true;
            animations.push(new CssClassAnimation(graph[currentRow][col], "wall"))
          }
        }
      }
      if (currentRow - 2 - rowStart > colEnd - colStart) {
        this.recursiveDivision(graph, rowStart, currentRow - 2, colStart, colEnd, animations);
      } else {
        this.recursiveDivision(graph, rowStart, currentRow - 2, colStart, colEnd, animations);
      }
      if (rowEnd - (currentRow + 2) > colEnd - colStart) {
        this.recursiveDivision(graph, currentRow + 2, rowEnd, colStart, colEnd, animations);
      } else {
        this.recursiveDivision(graph, currentRow + 2, rowEnd, colStart, colEnd, animations);
      }
    }
    else {
      let possibleCols = [];
      for (let number = colStart; number <= colEnd; number += 2) {
        possibleCols.push(number);
      }
      let possibleRows = [];
      for (let number = rowStart - 1; number <= rowEnd + 1; number += 2) {
        possibleRows.push(number);
      }
      let randomColIndex = Math.floor(Math.random() * possibleCols.length);
      let randomRowIndex = Math.floor(Math.random() * possibleRows.length);
      let currentCol = possibleCols[randomColIndex];
      let rowRandom = possibleRows[randomRowIndex];
      for (let row = 0; row < Constant.ROWS; row++) {
        if (row !== rowRandom && row >= rowStart - 1 && row <= rowEnd + 1) {
          if (!graph[row][currentCol].isStart && !graph[row][currentCol].isTarget && !graph[row][currentCol].isConstraint) {
            graph[row][currentCol].isWall = true;
            animations.push(new CssClassAnimation(graph[row][currentCol], "wall"))
          }
        }
      }
      if (rowEnd - rowStart > currentCol - 2 - colStart) {
        this.recursiveDivision(graph, rowStart, rowEnd, colStart, currentCol - 2, animations);
      } else {
        this.recursiveDivision(graph, rowStart, rowEnd, colStart, currentCol - 2, animations);
      }
      if (rowEnd - rowStart > colEnd - (currentCol + 2)) {
        this.recursiveDivision(graph,  rowStart, rowEnd, currentCol + 2, colEnd, animations);
      } else {
        this.recursiveDivision(graph, rowStart, rowEnd, currentCol + 2, colEnd, animations);
      }
    }
  }

  private getOrientation(width: number, height: number): Orientation {
    if (width < height) {
      return Orientation.HORIZONTAL;
    } else if (width > height) {
      return Orientation.VERTICAL
    } else {
      return RandomGenerator.getNumberInInterval(0, 1) === 0 ? Orientation.HORIZONTAL : Orientation.VERTICAL;
    }
  }

  private makeExternalWall(graph: Cell[][], animations: Animation[]) {
    for(let row = 0; row <Constant.ROWS; row++){
      for (let col=0; col <Constant.COLUMNS; col++){
        if (row === 0 || col === 0 || row === graph.length - 1 || col === graph[0].length - 1) {
          graph[row][col].isWall = true
          animations.push(new CssClassAnimation(graph[row][col], "wall"))
        }
      }
    }

  }
}
