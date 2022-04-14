import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule  } from '@angular/router';

// Modules
import { HighchartsChartModule } from 'highcharts-angular';
import { SharedModule } from '../shared/shared.module';
import { MaterialDesignModule } from '../material-design/material-design.module';


// Components
import { SemIndexComponent } from './sem-index/sem-index.component';
import { SemDatabaseComponent } from './sem-database/sem-database.component';
import { SemRunComponent } from './sem-run/sem-run.component';

const routes: Routes = [
  {
    path: '',
    component: SemIndexComponent,
    children: [

      {
        path: 'database',
        component: SemDatabaseComponent,
        data: {key: 'SemDatabase'}
      },
      {
        path: 'run/:id',
        component: SemRunComponent,
        data: {key: 'SemRun'}
      }
    ],

  }

];

@NgModule({
  declarations: [SemIndexComponent, SemDatabaseComponent, SemRunComponent, ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    HighchartsChartModule,
    SharedModule,
    MaterialDesignModule,
  ]
})
export class SemModule { }

