import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SortingVisualizerComponent} from "./component/sorting-visualizer/sorting-visualizer.component";
import {SearchVisualizerComponent} from "./component/search-visualizer/search-visualizer.component";

const routes: Routes = [
  { path : 'sortingAlgorithm', component: SortingVisualizerComponent },
  { path : 'searchAlgorithm', component: SearchVisualizerComponent },
  { path : '', redirectTo: 'sortingAlgorithm', pathMatch : 'full' },
]


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
