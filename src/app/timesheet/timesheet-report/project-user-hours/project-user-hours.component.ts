import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { HotTableRegisterer } from '@handsontable/angular';
import { NotificationsService } from 'angular2-notifications';


import * as _moment from 'moment';

@Component({
    selector: 'app-project-user-hours',
    templateUrl: './project-user-hours.component.html',
    styleUrls: ['./project-user-hours.component.css']
})
export class ProjectUserHoursComponent implements OnInit {

    yearList: string[] = [];
    timesheetPayperoids = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26,27];

    selectedYear;
    selectedPayperiod;
    fetchedPayperiod: any;
    requestPayperiod: any;

    endDate;
    startDate;
    absences = false;
    machines = false;
    employees = true;

    selectedUserList;
    selectedProjectList;

    fetchedReport;
    fetchedReportLoaded;

    defaultColumns = [{ readOnly: true, type: 'text', title: 'ID', data: 'user_id' },
        { readOnly: true, type: 'text', title: 'Name', data: 'user_name' },
        { readOnly: true, type: 'text', title: 'Denomination', data: 'denomination' },
    ];


    private hotRegisterer = new HotTableRegisterer();
    id = 'hotInstance2';
    hotTableSettings: any = {
        // colHeaders: true,
        colHeaders: false,
    };


    constructor(private http: HttpClient, private notification: NotificationsService) {}

    ngOnInit() {
        this.createYearSelection();
    }

    createYearSelection() {
        let i;
        const startingYear = 2015;
        const currentYear = new Date().getFullYear();
        for (i = startingYear; i <= currentYear + 1; i++) {
            this.yearList.push('' + i + '');
        }
        console.log(this.yearList);
    }

    calculatePayperoid() {

        if (this.selectedPayperiod && this.selectedYear) {

            const params: any = { 'year': this.selectedYear };
            this.http.get(environment.apiUrl + '/timesheet/payperiod/' + this.selectedPayperiod + '/year/' + this.selectedYear + '?filterSpinner', { params: params }).subscribe((response: any) => {
          
                this.endDate = _moment(response.endDate).toDate();
                this.startDate = _moment(response.startDate).toDate();
               
            });

        }
    }

    changeDates() {

        if (this.startDate && this.endDate) {
            this.selectedPayperiod = null;
            this.selectedYear = null;
            // this.calculatePayperoid();
            // this.fetchData();

        }

    }

    updateSelectedUserList(event) {
        this.selectedUserList = event;
    }
    updateSelectedProjectList(event) {
        this.selectedProjectList = event;
    }

    fetchData() {

        /// /timesheet/report/UserProjectUsage?absences=0&employees=1&endDate=2019-05-14&machines=0&startDate=2019-05-07
        const params: any = {
            'absences': this.absences,
            'machines': this.machines,
            'employees': this.employees,
            'startDate': _moment(this.startDate).format('YYYY-MM-DD'),
            'endDate': _moment(this.endDate).format('YYYY-MM-DD'),


        };
        if (this.selectedUserList && this.selectedUserList.length > 0) {

            params.users = [];
            this.selectedUserList.forEach(element => {
              params.users.push(element.id);

            });
            params.users = JSON.stringify(params.users);
        }

        if (this.selectedProjectList && this.selectedProjectList.length > 0) {

          params.projects = [];
          this.selectedProjectList.forEach(element => {
            params.projects.push(element.id);

          });
          params.projects = JSON.stringify(params.projects);
      }

        console.log(params);
        this.http.get(environment.apiUrl + '/timesheet/report/UserProjectUsage', { params: params }).subscribe((response: any) => {

            console.log(response);
            this.fetchedReport = response;
            this.fetchedReportLoaded = true;

            setTimeout((x) => {
                this.hotRegisterer.getInstance(this.id).loadData(response.data);
            }, 100);
        }, (error) => {

            this.notification.error('Error', 'Something went wrong here, let the developer know.', { timeOut: 4000, showProgressBar: false, clickToClose: true }); /// Daily OT notificaton


        });

        //    console.log(this.selectedUserList);

    }


}
