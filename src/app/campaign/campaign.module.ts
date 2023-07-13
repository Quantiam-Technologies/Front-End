import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { MaterialDesignModule } from '../material-design/material-design.module';


import { CampaignRoutingModule } from './campaign-routing.module';
import { Silt2023Component } from './silt2023/silt2023.component';


@NgModule({
  declarations: [
     
    Silt2023Component
  ],
  imports: [
    CommonModule,
    CampaignRoutingModule,    
    SharedModule,
    MaterialDesignModule,
  ]
})
export class CampaignModule { }
