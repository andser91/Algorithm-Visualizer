import { Injectable } from '@angular/core';
import {ShortestPathAlgorithm} from "../../model/shortestPathAlgorithm";
import {BfsService} from "./bfs/bfs.service";
import {DijkstraService} from "./dijkstra/dijkstra.service";
import {DfsService} from "./dfs/dfs.service";
import {PathFinder} from "./pathFinder";

@Injectable({
  providedIn: 'root'
})
export class ShortestPathServiceFactoryService {

  constructor(private bfsService : BfsService,
              private dfsService : DfsService,
              private dijkstraService : DijkstraService) { }

  getPathFinder(shortestPathAlgorithm : ShortestPathAlgorithm) : PathFinder{
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
    }
  }
}
