import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {FlexLayoutModule} from '@angular/flex-layout';
import { SharedModule } from '../shared/shared.module';
import { MaterialDesignModule } from '../material-design/material-design.module';
import { AgGridModule } from '@ag-grid-community/angular';

import { SampleRoutingModule } from './sample-routing.module';
import { SampleIndexComponent } from './sample-index/sample-index.component';

import { SampleListComponent } from './sample-list/sample-list.component';
import { SampleFormComponent } from './sample-form/sample-form.component';
import { SampleDatabaseComponent } from './sample-database/sample-database.component';
import { SgxScaleAuthComponent } from './sgx-scale-auth/sgx-scale-auth.component';
import { SampleViewComponent } from './sample-view/sample-view.component';
import { SampleCreationDialogComponent } from './sample-creation-dialog/sample-creation-dialog.component';


@NgModule({
  imports: [
    CommonModule,
    SampleRoutingModule,
	FlexLayoutModule,
	SharedModule,
	MaterialDesignModule,
	AgGridModule.withComponents([]),

  ],
  entryComponents: [SampleCreationDialogComponent],
  declarations: [SampleIndexComponent, SampleListComponent,  SampleFormComponent, SampleDatabaseComponent, SgxScaleAuthComponent, SampleViewComponent, SampleCreationDialogComponent]
})
export class SampleModule { }
