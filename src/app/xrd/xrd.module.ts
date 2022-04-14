import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule  } from '@angular/router';

// Modules
import { HighchartsChartModule } from 'highcharts-angular';
import { SharedModule } from '../shared/shared.module';
import { MaterialDesignModule } from '../material-design/material-design.module';

import { XrdIndexComponent } from './xrd-index/xrd-index.component';
import { XrdDatabaseComponent } from './xrd-database/xrd-database.component';
import { XrdViewComponent } from './xrd-view/xrd-view.component';
import { PickXrdAnalysesDialogComponent } from './xrd-database/pick-xrd-analyses-dialog/pick-xrd-analyses-dialog.component';

const routes: Routes = [
  {
    path: '',
    component: XrdIndexComponent,
    children: [

      {
        path: 'database',
        component: XrdDatabaseComponent,
        data: {key: 'XrdDatabase'}
      },
      {
        path: 'analysis/:id',
        component: XrdViewComponent,
        data: {key: 'XrdView'}
      }
    ],

  }

];


@NgModule({
  declarations: [XrdIndexComponent, XrdDatabaseComponent, XrdViewComponent, PickXrdAnalysesDialogComponent],
  entryComponents: [PickXrdAnalysesDialogComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    HighchartsChartModule,
    SharedModule,
    MaterialDesignModule,
  ]
})
export class XrdModule { }
