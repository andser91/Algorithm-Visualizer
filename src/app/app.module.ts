import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SortingVisualizerComponent } from './component/sorting-visualizer/sorting-visualizer.component';
import { ArrayBarChartComponent } from './component/array-bar-chart/array-bar-chart.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSliderModule} from "@angular/material/slider";
import {FormsModule} from "@angular/forms";
import {MatSelectModule} from "@angular/material/select";
import { MatButtonModule} from "@angular/material/button";
import {SvgBarPipe} from "./pipe/svgBarPipe";
import {MatIconModule} from "@angular/material/icon";
import { SearchVisualizerComponent } from './component/search-visualizer/search-visualizer.component';
import { GridSearchComponent } from './component/grid-search/grid-search.component';
import {MatCheckboxModule} from "@angular/material/checkbox";
import {DebounceClickDirective} from "./directive/debounce-click.directive";

@NgModule({
  declarations: [
    AppComponent,
    SortingVisualizerComponent,
    ArrayBarChartComponent,
    SvgBarPipe,
    SearchVisualizerComponent,
    GridSearchComponent,
    DebounceClickDirective
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatSliderModule,
        FormsModule,
        MatSelectModule,
        MatButtonModule,
        MatIconModule,
        MatCheckboxModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
