import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArbinComponent } from './arbin.component';

import { Routes, RouterModule  } from '@angular/router';
import { ArbinIndexComponent } from './arbin-index/arbin-index.component';
import { ArbinTestDatabaseComponent } from './arbin-test-database/arbin-test-database.component';
import { ArbinTestComponent } from './arbin-test/arbin-test.component';


// Modules
import { HighchartsChartModule } from 'highcharts-angular';
import { SharedModule } from '../shared/shared.module';
import { MaterialDesignModule } from '../material-design/material-design.module';
import { NgxChartsModule } from '@swimlane/ngx-charts';

const routes: Routes = [
  {
    path: '',
    component: ArbinIndexComponent,
    children: [
      {
        path: 'test/database',
        component: ArbinTestDatabaseComponent,
        data: {key: 'ArbinTestDatabase'}
      },
      {
        path: 'test/:id',
        component: ArbinTestComponent,
        data: {key: 'ArbinTest'}
      }
    ],

  }

];

@NgModule({
  declarations: [ArbinComponent, ArbinIndexComponent, ArbinTestDatabaseComponent, ArbinTestComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    NgxChartsModule,
    HighchartsChartModule,
    SharedModule,
    MaterialDesignModule
  ]
})
export class ArbinModule { }
