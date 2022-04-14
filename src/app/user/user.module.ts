import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { MaterialDesignModule } from '../material-design/material-design.module';

import { HighchartsChartModule } from 'highcharts-angular';
import { AgGridModule } from '@ag-grid-community/angular';

import { UserRoutingModule } from './user-routing.module';
import { UserIndexComponent } from './user-index/user-index.component';
import { UserViewComponent } from './user-view/user-view.component';
import { UserViewPermissionsComponent } from './user-view-permissions/user-view-permissions.component';
import { UserViewKeycardComponent } from './user-view-keycard/user-view-keycard.component';
import { UserViewMachinesComponent } from './user-view-machines/user-view-machines.component';
import { UserDatabaseComponent } from './user-database/user-database.component';
import { UserHierarchyComponent } from './user-hierarchy/user-hierarchy.component';


@NgModule({
  imports: [
    CommonModule,
    UserRoutingModule,
    MaterialDesignModule,
    SharedModule,
    HighchartsChartModule,
	AgGridModule.withComponents([]),
  ],
  declarations: [UserIndexComponent, UserViewComponent, UserViewPermissionsComponent, UserViewKeycardComponent, UserViewMachinesComponent, UserDatabaseComponent, UserHierarchyComponent],
   // schemas:[NO_ERRORS_SCHEMA]
})
export class UserModule { }
