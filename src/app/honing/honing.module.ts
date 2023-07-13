import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HoningRoutingModule } from './honing-routing.module';
import { HoningComponent } from './honing.component';


import { SharedModule } from '../shared/shared.module';
import { MaterialDesignModule } from '../material-design/material-design.module';


@NgModule({
  declarations: [
    HoningComponent
  ],
  imports: [
    CommonModule,
    HoningRoutingModule,
    SharedModule,
    MaterialDesignModule
  ]
})
export class HoningModule { }
