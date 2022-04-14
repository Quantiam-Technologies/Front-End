import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HighchartsChartModule } from 'highcharts-angular';


import { SharedModule } from '../shared/shared.module';
import { MaterialDesignModule } from '../material-design/material-design.module';

import { TgaRoutingModule } from './tga-routing.module';
import { TgaDatabaseComponent } from './tga-database/tga-database.component';
import { TgaIndexComponent } from './tga-index/tga-index.component';
import { TgaViewComponent } from './tga-view/tga-view.component';
import { TgaPeakSelectionToolComponent } from './tga-peak-selection-tool/tga-peak-selection-tool.component';

@NgModule({
  declarations: [TgaDatabaseComponent, TgaIndexComponent, TgaViewComponent, TgaPeakSelectionToolComponent],
  imports: [
    CommonModule,
    TgaRoutingModule,
    SharedModule,
    MaterialDesignModule,
    HighchartsChartModule
    ]
})
export class TgaModule { }
