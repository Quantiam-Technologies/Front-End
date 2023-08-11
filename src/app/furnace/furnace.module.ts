import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FurnaceRoutingModule } from './furnace-routing.module';
import { FurnaceRunComponent } from './furnace-run/furnace-run.component';
import { FurnaceDatabaseComponent } from './furnace-database/furnace-database.component';
import { FurnaceIndexComponent } from './furnace-index/furnace-index.component';
import { NgSelect2Module } from 'ng-select2';


import { SharedModule } from '../shared/shared.module';
import { MaterialDesignModule } from '../material-design/material-design.module';
import { FurnaceRunDatabaseComponent } from './furnace-run-database/furnace-run-database.component';

@NgModule({
  declarations: [
    FurnaceRunComponent,
    FurnaceDatabaseComponent,
    FurnaceIndexComponent,
    FurnaceRunDatabaseComponent
  ],
  imports: [
    CommonModule,
    FurnaceRoutingModule,
    NgSelect2Module,
    SharedModule,
    MaterialDesignModule,
  ]
})
export class FurnaceModule { }
