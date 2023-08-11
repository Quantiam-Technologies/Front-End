import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SteelIndexComponent } from './steel-index/steel-index.component';
import { SteelDatabaseComponent } from './steel-database/steel-database.component';
import { SteelViewComponent } from './steel-view/steel-view.component';
import { SteelCreationDialogComponent } from './steel-creation-dialog/steel-creation-dialog.component';
import { SteelReworkDialogComponent } from './steel-rework-dialog/steel-rework-dialog.component';

import { Routes, RouterModule  } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { MaterialDesignModule } from '../material-design/material-design.module';
import { SteelTypeComponent } from './steel-type/steel-type.component';
import { SteelTypeDatabaseComponent } from './steel-type-database/steel-type-database.component';
import { AgGridSteelActionsDisplayComponent } from './steel-database/ag-grid-steel-actions-display/ag-grid-steel-actions-display.component';


const routes: Routes = [
  {
    path: '',
    component: SteelIndexComponent,
    children: [

      {
        path: 'database',
        component: SteelDatabaseComponent,
        data: {key: 'SeelDatabase'}
      },
      {
        path: ':id',
        component: SteelViewComponent,
        data: {key: 'SteelView'}
      },
      {
        path: 'type/:id',
        component: SteelTypeComponent,
        data: {key: 'SteelTypeView'}
      },
      {
        path: 'type/database',
        component: SteelTypeDatabaseComponent,
        data: {key: 'SteelTypeDatabaseView'}
      }
    ],

  }

];



@NgModule({
  imports: [
    CommonModule,    
    SharedModule,
    MaterialDesignModule,
    RouterModule.forChild(routes),
  ],
  declarations: [SteelIndexComponent, SteelDatabaseComponent, SteelViewComponent, SteelCreationDialogComponent, SteelReworkDialogComponent, SteelTypeComponent, SteelTypeDatabaseComponent, AgGridSteelActionsDisplayComponent]
})
export class SteelModule { }
