import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { HotTableRegisterer } from '@handsontable/angular';
import { NotificationsService } from 'angular2-notifications';
import * as moment from 'moment';


@Component({
  selector: 'app-user-rtobank-status',
  templateUrl: './user-rtobank-status.component.html',
  styleUrls: ['./user-rtobank-status.component.css']
})
export class UserRTOBankStatusComponent implements OnInit {

  yearList: string[] = [];

  selectedYear;
  date;
  active = true;

  fetchedReport;
  fetchedReportLoaded;

  currentYear = new Date().getFullYear();

  private hotRegisterer = new HotTableRegisterer();
  id = 'hotInstance2';
  hotTableSettings: any = {
      // colHeaders: true,
      colHeaders: true,
      width: 480,

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

  changeDates() {

        this.selectedYear = null;
        this.fetchData();
  }

  updateDate() {
    this.date = new Date(this.selectedYear + '/12/31');
    this.fetchData();
  }

  fetchData() {


      const params: any = {
        'date': moment(this.date).format('YYYY-MM-DD'),
        'active': this.active
      };

      /// timesheet/report/rtobank

      this.http.get(environment.apiUrl + '/timesheet/report/rtobank', { 'params': params }).subscribe((response: any) => {

        console.log(response);
        this.fetchedReport = response;
        this.fetchedReportLoaded = true;

        setTimeout((x) => {
            this.hotRegisterer.getInstance(this.id).loadData(response);
              }, 100);
          }, (error) => {

              this.notification.error('Error', 'Something went wrong here, let the developer know.', { timeOut: 4000, showProgressBar: false, clickToClose: true }); /// Daily OT notificaton


          });


  }

}
