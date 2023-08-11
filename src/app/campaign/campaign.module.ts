import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { MaterialDesignModule } from '../material-design/material-design.module';
import { HighchartsChartModule } from 'highcharts-angular';

import { CampaignRoutingModule } from './campaign-routing.module';
import { Silt2023Component } from './silt2023/silt2023.component';
import { ThroughputComponent } from './shared/throughput/throughput.component';
import { StatusComponent } from './shared/status/status.component';
import { HoldsComponent } from './shared/holds/holds.component';
import { TotalProgressComponent } from './shared/total-progress/total-progress.component';
import { ReworksComponent } from './shared/reworks/reworks.component';


@NgModule({
  declarations: [
     
    Silt2023Component,
          ThroughputComponent,
          StatusComponent,
          HoldsComponent,
          TotalProgressComponent,
          ReworksComponent
  ],
  imports: [
    CommonModule,
    CampaignRoutingModule,    
    SharedModule,
    MaterialDesignModule,
    HighchartsChartModule
    
  ],
  exports:[
    Silt2023Component]
})
export class CampaignModule { }
