import { Injectable } from '@angular/core';
import {Cell} from "../../../model/cell";
import {PathFinder} from "../pathFinder";
import {Animation} from "../../../model/animation/animation";
import {CssClassAnimation} from "../../../model/animation/cssClassAnimation";

@Injectable({
  providedIn: 'root'
})
export class DijkstraService extends PathFinder{

  constructor() {
    super();
  }

  find(graph: Cell[][], source: Cell, target: Cell): Array<Animation> {
    let animations = this.dijkstra(graph, source, target)
    this.findShortestPath(source, target, animations)
    return animations;
  }


  private dijkstra(graph: Cell[][], source: Cell, target: Cell) : Array<Animation> {
    let animations = new Array<Animation>()
    source.distance = 0;
    let vertex = []

    for (let row = 0; row < 20; row++) {
      for (let col = 0; col < 50; col++) {
        vertex.push(graph[row][col])
      }
    }
    let currVertex = this.vertexWithMinDistance(vertex);

    while (currVertex !== null){
      let distance = currVertex.distance
      let neighbourNode = this.getNeighbours(graph, currVertex)
      for (let i = 0; i < neighbourNode.length; i++){
        let newDistance = distance + neighbourNode[i].weight
        if (neighbourNode[i].distance > newDistance){
          neighbourNode[i].distance = newDistance
          neighbourNode[i].previousNode = currVertex
        }
      }
      currVertex.isVisited = true;
      animations.push(new CssClassAnimation(currVertex, "visited"))
      if (currVertex === target) return animations
      currVertex = this.vertexWithMinDistance(vertex)
    }
    return animations
  }

  private vertexWithMinDistance(vertexes: Cell[]) : Cell | null{
    let minDistance = Number.MAX_VALUE,
      minVertex = null;
    for (let i = 0; i < vertexes.length; i++){
      let distance = vertexes[i].distance
      if (distance < minDistance && !vertexes[i].isVisited){
        minDistance = distance;
        minVertex = vertexes[i];
      }
    }
    return minVertex
  }
}
