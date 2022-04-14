import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThreedmodelDatabaseComponent } from './threedmodel-database/threedmodel-database.component';


import { AgGridModule } from '@ag-grid-community/angular';
import { SharedModule } from '../shared/shared.module';
import { MaterialDesignModule } from '../material-design/material-design.module';
import { Routes, RouterModule  } from '@angular/router';




const routes: Routes = [
  {
        path: 'database',
        component: ThreedmodelDatabaseComponent,
        data: {key: '3dmodels-database'}
  }

];

@NgModule({
  declarations: [ThreedmodelDatabaseComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialDesignModule,
    SharedModule,
  	AgGridModule.withComponents([]),
  ]
})

export class ThreedmodelsModule { }
