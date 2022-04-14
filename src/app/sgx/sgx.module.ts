import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {FlexLayoutModule} from '@angular/flex-layout';
import { SharedModule } from '../shared/shared.module';
import { MaterialDesignModule } from '../material-design/material-design.module';
import { AgGridModule } from '@ag-grid-community/angular';

import { SgxRoutingModule } from './sgx-routing.module';
import { SgxIndexComponent } from './sgx-index/sgx-index.component';
import { SgxDatabaseComponent } from './sgx-database/sgx-database.component';
import { SgxCreationDialogComponent } from './sgx-creation-dialog/sgx-creation-dialog.component';

@NgModule({
  declarations: [SgxIndexComponent, SgxDatabaseComponent, SgxCreationDialogComponent],
  imports: [
    CommonModule,
    SgxRoutingModule,
    FlexLayoutModule,
    SharedModule,
    MaterialDesignModule,
    AgGridModule.withComponents([])
  ],
  entryComponents: [SgxCreationDialogComponent]
})
export class SgxModule { }
