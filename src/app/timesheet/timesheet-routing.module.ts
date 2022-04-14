import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TimesheetIndexComponent } from './timesheet-index/timesheet-index.component';
import { TimesheetComponent } from './timesheet/timesheet.component';
import { TimesheetBankComponent } from './timesheet-bank/timesheet-bank.component';
import { TimesheetSimpleComponent } from './timesheet-simple/timesheet-simple.component';
import { TimesheetCalendarComponent } from './timesheet-calendar/timesheet-calendar.component';
import { TimesheetRtoComponent } from './timesheet-rto/timesheet-rto.component';
import { TimesheetRtoViewComponent } from './timesheet-rto-view/timesheet-rto-view.component';
import { TimesheetProjectComponent } from './timesheet-project/timesheet-project.component';
import { TimesheetHolidayComponent } from './timesheet-holiday/timesheet-holiday.component';
import { TimesheetReportComponent } from './timesheet-report/timesheet-report.component';
import { TimesheetRtoAllocationComponent } from './timesheet-rto-allocation/timesheet-rto-allocation.component';
import { TimesheetMachinesComponent } from './timesheet-machines/timesheet-machines.component';

import { ProjectUserHoursComponent } from './timesheet-report/project-user-hours/project-user-hours.component';
import { UserRTOBankStatusComponent } from './timesheet-report/user-rtobank-status/user-rtobank-status.component';
import { UserAbsenceSummaryComponent } from './timesheet-report/user-absence-summary/user-absence-summary.component';


import { TimesheetStatisticsComponent } from './timesheet-statistics/timesheet-statistics.component';
import { TimesheetStatisticsUserComponent } from './timesheet-statistics/timesheet-statistics-user/timesheet-statistics-user.component';
import { TimesheetStatisticsCompanyComponent } from './timesheet-statistics/timesheet-statistics-company/timesheet-statistics-company.component';

import { TimesheetSettingsComponent } from './timesheet-settings/timesheet-settings.component';
import { TimesheetLogComponent } from './timesheet-log/timesheet-log.component';

import { UserHoursComponent } from './timesheet-report/user-hours/user-hours.component';
import { CompanyInsightHoursComponent } from './timesheet-statistics/timesheet-statistics-company/company-insight-hours/company-insight-hours.component';
import { CompanyInsightUnpaidComponent } from './timesheet-statistics/timesheet-statistics-company/company-insight-unpaid/company-insight-unpaid.component';
import { CompanyInsightHeadcountComponent } from './timesheet-statistics/timesheet-statistics-company/company-insight-headcount/company-insight-headcount.component';


const routes: Routes = [{
    path: '',
    component: TimesheetIndexComponent,
    children: [

    {
      path: ':user/year/:year/payperiod/:payperiod',
      data: { key: 'timesheet'},
      component: TimesheetComponent,
    },
    {
      path: ':user/bank-history/:type',
      data: { key: 'timesheet-bank'},
      component: TimesheetBankComponent,
    },
    {
      path: ':user/log',
      data: { key: 'timesheet-log'},
      component: TimesheetLogComponent,
    },
    {
      path: 'calendar',
      data: { key: 'timesheet-calendar'},
      component: TimesheetCalendarComponent,
    },
    {
      path: 'rto/database',
      data: { key: 'timesheet-rto-database'},
      component: TimesheetRtoComponent,
    },

    {
      path: 'rto/:id',
      data: { key: 'timesheet-rto-view'},
      component: TimesheetRtoViewComponent,
    },

    {
      path: 'settings',
      data: { key: 'timesheet-settings'},
      component: TimesheetSettingsComponent,
      children: [
        {
          path: '',
          pathMatch: 'full',
          redirectTo: 'project'
        },
        {
          path: 'project',
          data: { key: 'timesheet-project'},
          component: TimesheetProjectComponent,
        },
        {
          path: 'machines',
          data: { key: 'timesheet-machines'},
          component: TimesheetMachinesComponent,
        },
        {
          path: 'holiday',
          data: { key: 'timesheet-holiday'},
          component: TimesheetHolidayComponent,
        },
        {
          path: 'rto-allocation',
          data: { key: 'timesheet-rto-allocation'},
          pathMatch: 'full',
          component: TimesheetRtoAllocationComponent,
        },

      ]
    },
    {
      path: 'insights',
     // data: { key: 'timesheet-statistics'},
      component: TimesheetStatisticsComponent,
      children: [
        {
          path: '',
          pathMatch: 'full',
          redirectTo: 'company'
        },
        {
          path: 'company',
      //     data: { key: 'timesheet-statistics-company'},
          component: TimesheetStatisticsCompanyComponent,
          children: [
            {
              path: '',
              redirectTo: 'hours',
              pathMatch: 'full'
            },
            {
              path: 'hours',
              data: { key: 'company-insight-hours'},
              component: CompanyInsightHoursComponent
              }, {
              path: 'overtime-unpaid',
              data: { key: 'company-insight-unpaid'},
              component: CompanyInsightUnpaidComponent
              }, {
              path: 'headcount',
              data: { key: 'company-insight-headcount'},
              component: CompanyInsightHeadcountComponent
              },
          ]
        },
        {
          path: 'user',
          redirectTo: 'user/',
        },
        {
          path: 'user/:id',
         // data: { key: 'timesheet-statistics-user'},
          component: TimesheetStatisticsUserComponent,
        },

      ]
    },

    {
      path: 'report',
      // data: { key: 'timesheet-report'},
      component: TimesheetReportComponent,
      children: [
        {
          path: '',
          pathMatch: 'full',
          redirectTo: 'user-hours'
        },
        {
          path: 'user-hours',
          data: { key: 'timesheet-report-user-hours'},
          component: UserHoursComponent

        },
        {
          path: 'project-user-hours',
          data: { key: 'timesheet-report-project-user-hours'},
          component: ProjectUserHoursComponent

        },
        {
          path: 'user-rto-bank-status',
          data: { key: 'timesheet-report-user-rto-bank-status'},
          component: UserRTOBankStatusComponent

        },
        {
          path: 'user-absences-summary',
          data: { key: 'timesheet-report-user-absences-summary'},
          component: UserAbsenceSummaryComponent

        },
      ]
    },

  ],

}];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TimesheetRoutingModule { }
