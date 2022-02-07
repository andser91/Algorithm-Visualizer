import { Injectable } from '@angular/core';
import {BfsService} from "./shortestPath/bfs/bfs.service";
import {DijkstraService} from "./shortestPath/dijkstra/dijkstra.service";
import {RecursiveDivisionService} from "./mazeGenerator/recursiveDivision/recursive-division.service";
import {GraphAlgorithmService} from "./graphAlgorithmService";
import {ShortestPathAlgorithm} from "../../model/shortestPathAlgorithm";
import {DfsService} from "./shortestPath/dfs/dfs.service";

@Injectable({
  providedIn: 'root'
})
export class GraphAlgorithmFactoryService {

  constructor(private bfsService : BfsService,
              private dfsService : DfsService,
              private dijkstraService : DijkstraService,
              private recursionDivisionService : RecursiveDivisionService) { }

  getService(shortestPathAlgorithm : ShortestPathAlgorithm) : GraphAlgorithmService{
    switch (shortestPathAlgorithm){
      case ShortestPathAlgorithm.BFS:{
        return this.bfsService;
      }
      case ShortestPathAlgorithm.DFS:{
        return this.dfsService
      }
      case ShortestPathAlgorithm.DIJKSTRA:{
        return this.dijkstraService
      }
      case ShortestPathAlgorithm.RECURSIVE_DIVISION:{
        return this.recursionDivisionService
      }
    }
  }
}
