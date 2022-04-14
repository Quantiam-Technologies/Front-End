import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TapecastDatabaseComponent } from './tapecast-database/tapecast-database.component';
import { TapecastComponent } from './tapecast/tapecast.component';

// Modules
import { HighchartsChartModule } from 'highcharts-angular';
import { SharedModule } from '../shared/shared.module';
import { MaterialDesignModule } from '../material-design/material-design.module';
import { Routes, RouterModule } from '@angular/router';
import { TapecastIndexComponent } from './tapecast-index/tapecast-index.component';


const routes: Routes = [ 

  {
    path: '',
      component: TapecastIndexComponent,
      children: [

        {
          path: 'database',
          component: TapecastDatabaseComponent,
          data: {key: 'TapecastDatabaseComponent'}
        },
        {
          path: ':id',
          component: TapecastComponent,
          data: {key: 'TapecastComponent'}
        }
      ],
    }

];

@NgModule({
  declarations: [TapecastDatabaseComponent, TapecastComponent, TapecastIndexComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    HighchartsChartModule,
    SharedModule,
    MaterialDesignModule,
  ]
})
export class TapecastModule { }


