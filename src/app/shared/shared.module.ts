import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';

import { NgSelect2Module } from 'ng-select2';


import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';

import { NgxFileDropModule  } from 'ngx-file-drop';



import { FlexLayoutModule } from '@angular/flex-layout';


import { MaterialDesignModule } from '../material-design/material-design.module';


import { SelectProjectComponent } from './select-project/select-project.component';
import { SelectUserComponent } from './select-user/select-user.component';
import { SelectExperimentComponent } from './select-experiment/select-experiment.component';
import { SelectMaterialContainerComponent } from './select-material-container/select-material-container.component';
import { SelectSampleComponent } from './select-sample/select-sample.component';
import { SelectExperimentTypeComponent } from './select-experiment-type/select-experiment-type.component';
import { SelectTgarunComponent } from './select-tgarun/select-tgarun.component';
import { SelectPermissionComponent } from './select-permission/select-permission.component';
import { SelectGroupComponent } from './select-group/select-group.component';
import { AgGridSelectProjectEditorComponent } from './ag-grid-select-project/ag-grid-select-project.component';
import { AgGridSelectUserComponent } from './ag-grid-select-user/ag-grid-select-user.component';
import { SelectSemrunTypeComponent } from './select-semrun-type/select-semrun-type.component';

 import { AgGridSemTypeComponent } from '../sem/sem-database/ag-grid-sem-type/ag-grid-sem-type.component';
import { AgGridSemContainerSteelCellDisplayComponent } from '../sem/sem-database/ag-grid-sem-container-steel-cell-display/ag-grid-sem-container-steel-cell-display.component';
import { AgGridSemContainerSteelEditComponent } from '../sem/sem-database/ag-grid-sem-container-steel-edit/ag-grid-sem-container-steel-edit.component';
import { AgGridParticlePdfComponent } from '../particle-size/particle-size-database/ag-grid-particle-pdf/ag-grid-particle-pdf.component';
import { XrdAnalysesFileRendererComponent } from '../xrd/xrd-database/xrd-analyses-file-renderer/xrd-analyses-file-renderer.component';
import { AgGridTimesheetValueEditorComponent } from '../timesheet/timesheet/ag-grid-timesheet-value-editor/ag-grid-timesheet-value-editor.component';
import { DisplayAnalysisCellComponent } from '../material/material-container-database/display-analysis-cell/display-analysis-cell.component'; 


import { SelectMaterialComponent } from './select-material/select-material.component';
import { SelectMaterialSupplierComponent } from './select-material-supplier/select-material-supplier.component';
import { AgGridDurationComponent } from './ag-grid-duration/ag-grid-duration.component';
import { AgGridSelectSteelOrContainerComponent } from './ag-grid-select-steel-or-container/ag-grid-select-steel-or-container.component';

import { AgGridModule } from 'ag-grid-angular';



import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { SelectSteelComponent } from './select-steel/select-steel.component';
import { PopUpSteelCardComponent } from './pop-up-steel-card/pop-up-steel-card.component';

import { AutoFocusDirective } from '../directives/auto-focus.directive';
import { SafePipe } from '../pipes/safe.pipe';

import { CommentsComponent } from './comments/comments.component';
import { LogsComponent } from './logs/logs.component';

import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { SelectArbinTestComponent } from './select-arbin-test/select-arbin-test.component';
import { MiniXrdComponent } from './mini-xrd/mini-xrd.component';

import { HighchartsChartModule } from 'highcharts-angular';
import { MiniSemComponent } from './mini-sem/mini-sem.component';

import { ReactiveFormsModule } from '@angular/forms';
import { SelectHazardComponent } from './select-hazard/select-hazard.component';
import { SelectLocationComponent } from './select-location/select-location.component';
import { SelectMaterialLotComponent } from './select-material-lot/select-material-lot.component';

import { FileAssociatorComponent } from './file-associator/file-associator.component';
import { SelectCampaignComponent } from './select-campaign/select-campaign.component';
import { SelectSteelTypeComponent } from './select-steel-type/select-steel-type.component';

import { jqxButtonModule } from 'jqwidgets-ng/jqxbuttons';
import { jqxWindowModule } from 'jqwidgets-ng/jqxwindow';
import { jqxCheckBoxModule } from 'jqwidgets-ng/jqxcheckbox';
import { jqxTabsModule } from 'jqwidgets-ng/jqxtabs';


@NgModule({
    imports: [
        AgGridModule,
        CommonModule,
        NgSelectModule,
        FormsModule,
        MaterialDesignModule,
        FlexLayoutModule,
        NgxFileDropModule ,
        NgbModule,
        CKEditorModule,
        ReactiveFormsModule,
        jqxButtonModule, jqxWindowModule, jqxCheckBoxModule, jqxTabsModule
    ],
    declarations: [
        AutoFocusDirective,
        SelectProjectComponent,       
        SelectUserComponent,
        SelectExperimentComponent,
        SelectMaterialContainerComponent,
        SelectSampleComponent,
        SelectExperimentTypeComponent,
        SelectTgarunComponent,
        SelectPermissionComponent,
        SelectGroupComponent,
        AgGridSelectProjectEditorComponent,
        AgGridSelectUserComponent,
        
       
        SelectSemrunTypeComponent,
        SelectMaterialComponent,
        SelectMaterialSupplierComponent,
        AgGridDurationComponent,
       AgGridSelectSteelOrContainerComponent,
        AgGridTimesheetValueEditorComponent,
        AgGridSemContainerSteelCellDisplayComponent,
        AgGridSemContainerSteelEditComponent, 
        DisplayAnalysisCellComponent,
        XrdAnalysesFileRendererComponent,
         AgGridParticlePdfComponent,
         AgGridSemTypeComponent,
        SelectSteelComponent,
        PopUpSteelCardComponent,
        CommentsComponent,
        LogsComponent,
        SelectArbinTestComponent,
        SafePipe,
        MiniXrdComponent,
        MiniSemComponent,
        SelectHazardComponent,
        SelectLocationComponent,
        SelectMaterialLotComponent,
        FileAssociatorComponent,
        SelectCampaignComponent,
        SelectSteelTypeComponent,
    ],
    exports: [
        AgGridModule,
        SelectArbinTestComponent,
        SelectMaterialSupplierComponent,
        SelectMaterialComponent,
        SelectSemrunTypeComponent,      
        SelectProjectComponent,
        SelectUserComponent,
        SelectExperimentComponent,
        SelectMaterialContainerComponent,
        SelectSampleComponent,
        SelectTgarunComponent,
        SelectPermissionComponent,
        SelectSteelComponent,        
        SelectSteelTypeComponent,
        SelectHazardComponent,
        SelectLocationComponent,
        SelectMaterialLotComponent,
        SelectCampaignComponent,
        MiniXrdComponent,
        MiniSemComponent,
        NgxFileDropModule,
        PopUpSteelCardComponent,
        NgbModule,
        CommentsComponent,
        LogsComponent,        
        SafePipe,
        ReactiveFormsModule,
        FormsModule,
        NgSelectModule,
        NgSelect2Module,
        FileAssociatorComponent,        
        jqxButtonModule, jqxWindowModule, jqxCheckBoxModule, jqxTabsModule

    ],
    schemas: [NO_ERRORS_SCHEMA]
})
export class SharedModule {}