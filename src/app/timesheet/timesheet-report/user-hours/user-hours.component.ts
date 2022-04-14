import { Component, OnInit } from '@angular/core';
import {  environment} from '../../../../environments/environment';
import {  HttpClient} from '@angular/common/http';

import { HotTableRegisterer } from '@handsontable/angular';

import { NotificationsService } from 'angular2-notifications';

import * as _moment from 'moment';

@Component({
  selector: 'app-user-hours',
  templateUrl: './user-hours.component.html',
  styleUrls: ['./user-hours.component.css']
})
export class UserHoursComponent implements OnInit {

  hourly = true;
  salary = true;
  active = false;
  yearList: string[] = [];
  timesheetPayperoids = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26,27];

  selectedYear;
  fetchedPayperiod: any;
  requestPayperiod: any;
  endDate;
  startDate;
  selectedPayperiod;

  fetchedReport: any; // stores rothe requested report
  fetchedReportLoaded = false;

  /// HOT table
  private hotRegisterer = new HotTableRegisterer();
  id = 'hotInstance';
  hotTableSettings: any = {
    colHeaders: true,
  };

  constructor(private http: HttpClient, private notification: NotificationsService) { }

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



calculatePayperoid () {

	if (this.selectedPayperiod && this.selectedYear) {


    const params: any = {'year': this.selectedYear};
    this.http.get(environment.apiUrl + '/timesheet/payperiod/' + this.selectedPayperiod + '/year/' + this.selectedYear, {params: params}).subscribe((response: any) => {

        this.endDate = _moment(response.endDate).toDate();
        this.startDate = _moment(response.startDate).toDate();
        console.log(response);
    });

	}
}

changeDates  () {


		if (this.startDate && this.endDate) {
			this.selectedPayperiod = null;
      this.selectedYear = null;

		}

}


fetchData() {


    const params: any = {
      'startdate': _moment(this.startDate).format('YYYY-MM-DD'),
      'enddate': _moment(this.endDate).format('YYYY-MM-DD'),
      'hourly': this.hourly,
      'salary': this.salary,
      'active': this.active,
    };
    this.http.get(environment.apiUrl + '/timesheet/report/SummaryUsage', {params: params}).subscribe((response: any) => {

        console.log(response);
        this.fetchedReport = response;
        this.fetchedReportLoaded = true;
       setTimeout((x) => {
        this.hotRegisterer.getInstance(this.id).loadData(response.results);
       }, 200);
      // console.log(this.hotTableSettings);
    }, (error) => {

      this.notification.error('Error',  'Something went wrong here, let the developer know.', {timeOut: 4000, showProgressBar: false, clickToClose: true}); /// Daily OT notificaton


    });

  }

}
