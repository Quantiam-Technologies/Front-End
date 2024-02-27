import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule  } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { MaterialDesignModule } from '../material-design/material-design.module';
import { HighchartsChartModule } from 'highcharts-angular';
import { jqxDataTableModule } from 'jqwidgets-ng/jqxdatatable';
import { ParticleSizeIndexComponent } from './particle-size-index/particle-size-index.component';
import { ParticleSizeViewComponent } from './particle-size-view/particle-size-view.component';
import { ParticleSizeDatabaseComponent } from './particle-size-database/particle-size-database.component';

//import { AgGridAngular } from 'ag-grid-angular'

const routes: Routes = [
  {
    path: '',
    component: ParticleSizeIndexComponent,
    children: [
      {
        path: 'database',
        component: ParticleSizeDatabaseComponent,
        data: {key: 'ParticleSizeDatabase'}
      },
      {
        path: 'analysis/:id',
        component: ParticleSizeViewComponent,
        data: {key: 'ParticleSizeAnalysis'}
      }
    ]
  }
];


@NgModule({
  declarations: [ParticleSizeIndexComponent, ParticleSizeViewComponent, ParticleSizeDatabaseComponent],
  imports: [
    
    RouterModule.forChild(routes),
    CommonModule,
    SharedModule,
    MaterialDesignModule,
    jqxDataTableModule,
    HighchartsChartModule
  ]
})
export class ParticleSizeModule { }
