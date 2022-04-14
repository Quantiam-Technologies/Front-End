import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgGridModule } from '@ag-grid-community/angular';
import { MaterialDesignModule } from '../material-design/material-design.module';
//import { ChartModule } from 'angular-highcharts';

import { XpsRoutingModule } from './xps-routing.module';
import { XpsIndexComponent } from './xps-index/xps-index.component';
import { XpsViewComponent } from './xps-view/xps-view.component';
import { XpsDatabaseComponent } from './xps-database/xps-database.component';

@NgModule({
  imports: [
  CommonModule,
  //  ChartModule,
   XpsRoutingModule,
   MaterialDesignModule,
   AgGridModule.withComponents([]),
  ],
  declarations: [XpsIndexComponent,  XpsViewComponent, XpsDatabaseComponent]
})
export class XpsModule { }
