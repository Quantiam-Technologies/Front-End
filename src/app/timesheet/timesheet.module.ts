import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//import { FullCalendarModule } from 'ng-fullcalendar';


import { HotTableModule } from '@handsontable/angular';

import { HighchartsChartModule } from 'highcharts-angular';

import { SharedModule } from '../shared/shared.module';
import { MaterialDesignModule } from '../material-design/material-design.module';
import { TimesheetRoutingModule } from './timesheet-routing.module';

import { jqxDataTableModule } from 'jqwidgets-ng/jqxdatatable';
import { FullCalendarModule } from '@fullcalendar/angular'; // for FullCalendar!
import { TimesheetIndexComponent } from './timesheet-index/timesheet-index.component';
import { TimesheetComponent } from './timesheet/timesheet.component';
import { TimesheetBankComponent } from './timesheet-bank/timesheet-bank.component';
import { TimesheetSimpleComponent } from './timesheet-simple/timesheet-simple.component';
import { TimesheetCalendarComponent } from './timesheet-calendar/timesheet-calendar.component';
import { TimesheetRtoComponent } from './timesheet-rto/timesheet-rto.component';
import { TimesheetRtoViewComponent } from './timesheet-rto-view/timesheet-rto-view.component';

import { NumericEditor } from './timesheet/numeric-editor.component';
import { TimesheetProjectComponent } from './timesheet-project/timesheet-project.component';
import { TimesheetHolidayComponent } from './timesheet-holiday/timesheet-holiday.component';
import { TimesheetRtoAllocationComponent } from './timesheet-rto-allocation/timesheet-rto-allocation.component';
import { TimesheetReportComponent } from './timesheet-report/timesheet-report.component';
import { UserHoursComponent } from './timesheet-report/user-hours/user-hours.component';
import { ProjectUserHoursComponent } from './timesheet-report/project-user-hours/project-user-hours.component';
import { UserRTOBankStatusComponent } from './timesheet-report/user-rtobank-status/user-rtobank-status.component';
import { UserAbsenceSummaryComponent } from './timesheet-report/user-absence-summary/user-absence-summary.component';
import { TimesheetSettingsComponent } from './timesheet-settings/timesheet-settings.component';
import { CreateRtoDialogComponent } from './create-rto-dialog/create-rto-dialog.component';
import { TimesheetStatisticsComponent } from './timesheet-statistics/timesheet-statistics.component';
import { TimesheetStatisticsUserComponent } from './timesheet-statistics/timesheet-statistics-user/timesheet-statistics-user.component';
import { TimesheetStatisticsCompanyComponent } from './timesheet-statistics/timesheet-statistics-company/timesheet-statistics-company.component';
import { CreatePayoutComponent } from './create-payout/create-payout.component';
import { TimesheetEquipmentComponent } from './timesheet-equipment/timesheet-equipment.component';
import { TimesheetMachinesComponent } from './timesheet-machines/timesheet-machines.component';
import { MachineUserDialogComponent } from './machine-user-dialog/machine-user-dialog.component';
import { TimesheetLogComponent } from './timesheet-log/timesheet-log.component';
import { CompanyInsightHoursComponent } from './timesheet-statistics/timesheet-statistics-company/company-insight-hours/company-insight-hours.component';
import { CompanyInsightUnpaidComponent } from './timesheet-statistics/timesheet-statistics-company/company-insight-unpaid/company-insight-unpaid.component';
import { CompanyInsightHeadcountComponent } from './timesheet-statistics/timesheet-statistics-company/company-insight-headcount/company-insight-headcount.component';

@NgModule({
  imports: [
    CommonModule,
    TimesheetRoutingModule,
    HighchartsChartModule,
    HotTableModule.forRoot(),
    MaterialDesignModule,
    SharedModule,
    jqxDataTableModule,
    FullCalendarModule ,
  ],
  entryComponents:[ CreateRtoDialogComponent,CreatePayoutComponent, MachineUserDialogComponent ],
  declarations: [ 
    NumericEditor, TimesheetIndexComponent, TimesheetComponent, 
    TimesheetBankComponent, TimesheetSimpleComponent, TimesheetCalendarComponent, TimesheetRtoComponent, TimesheetRtoViewComponent,
     TimesheetProjectComponent, TimesheetHolidayComponent, TimesheetRtoAllocationComponent, TimesheetReportComponent, UserHoursComponent,
      ProjectUserHoursComponent, UserRTOBankStatusComponent, UserAbsenceSummaryComponent, TimesheetSettingsComponent, CreateRtoDialogComponent, TimesheetStatisticsComponent, TimesheetStatisticsUserComponent, TimesheetStatisticsCompanyComponent, CreatePayoutComponent, TimesheetEquipmentComponent, TimesheetMachinesComponent, MachineUserDialogComponent,  TimesheetLogComponent, CompanyInsightHoursComponent, CompanyInsightUnpaidComponent, CompanyInsightHeadcountComponent,
      
      ]
})
export class TimesheetModule { }
