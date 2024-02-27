import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialService } from '../services/material/material.service';
import { MaterialLotContainerService } from '../services/material-lot-container/material-lot-container.service';
import { MaterialDatatableService } from './services/material-datatable.service';
import { MaterialLotContainerDatatableService } from './services/material-lot-container-datatable.service';
import { FormsModule } from '@angular/forms';
import { WebsocketService } from '../services/websocket/websocket.service';




// import { DataTablesModule } from 'angular-datatables';

import { SharedModule } from '../shared/shared.module';
import { MaterialDesignModule } from '../material-design/material-design.module';

import { MaterialRoutingModule } from './material-routing.module';
import { MaterialCreationDialogComponent } from './material-creation-dialog/material-creation-dialog.component';
import { MaterialIndexComponent } from './material-index/material-index.component';
import { MaterialDatabaseComponent } from './material-database/material-database.component';
import { MaterialViewComponent } from './material-view/material-view.component';
import { MaterialComponent } from './material.component';
import { MaterialContainerViewComponent } from './material-container-view/material-container-view.component';
import { MaterialContainerDatabaseComponent } from './material-container-database/material-container-database.component';
import { MaterialContainerViewAnalysisComponent } from './material-container-view-analysis/material-container-view-analysis.component';
import { MaterialSettingsComponent } from './material-settings/material-settings.component';
import { MaterialContainerLogComponent } from './material-container-log/material-container-log.component';
import { MaterialHazardSymbolSelectorComponent } from './material-hazard-symbol-selector/material-hazard-symbol-selector.component';
import { MaterialCheckCreationDialogComponent } from './material-check-creation-dialog/material-check-creation-dialog.component';
import { MaterialCreationDialog2021Component } from './material-creation-dialog2021/material-creation-dialog2021.component';
import { AgGridTestComponent } from './ag-grid-test/ag-grid-test.component';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        SharedModule,
        MaterialDesignModule,
        MaterialRoutingModule,
        AgGridTestComponent,
        // DataTablesModule,
    ],
    declarations: [MaterialCreationDialogComponent, MaterialIndexComponent, MaterialDatabaseComponent, MaterialViewComponent,
        MaterialComponent, MaterialContainerViewComponent, MaterialContainerDatabaseComponent, MaterialContainerViewAnalysisComponent, MaterialSettingsComponent, MaterialContainerLogComponent, MaterialHazardSymbolSelectorComponent, MaterialCheckCreationDialogComponent, MaterialCreationDialog2021Component],
    providers: [MaterialService, MaterialLotContainerService, MaterialDatatableService, MaterialLotContainerDatatableService],
    schemas: [NO_ERRORS_SCHEMA]
})
export class MaterialModule { }
