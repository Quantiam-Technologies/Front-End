import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { HotTableRegisterer } from '@handsontable/angular';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-user-absence-summary',
  templateUrl: './user-absence-summary.component.html',
  styleUrls: ['./user-absence-summary.component.css']
})
export class UserAbsenceSummaryComponent implements OnInit {

  yearList: string[] = [];

  selectedYear;
  selectedUser;
  date;
  active = true;

  fetchedReport;
  fetchedReportLoaded;

  totalHours;

  currentYear = new Date().getFullYear();

  private hotRegisterer = new HotTableRegisterer();
  id = 'hotInstance2';
  hotTableSettings: any = {
      // colHeaders: true,
      colHeaders: true,
      width: 300,

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

  updateSelectedUserList(event) {
    this.selectedUser = event;
    if (this.selectedUser && this.selectedYear) { this.fetchReport(); }

}

updateYear() {
  if (this.selectedUser && this.selectedYear) { this.fetchReport(); }

}

  fetchReport() {

  this.http.get(environment.apiUrl + '/timesheet/report/employee-absence-hours/' + this.selectedUser.id + '/year/' + this.selectedYear).subscribe((response: any) => {

    console.log(response);
    this.fetchedReport = response;
    this.fetchedReportLoaded = true;
    this.totalHours = 0.00;
    response.forEach(element => {
      console.log(element, parseFloat(element.pto), this.totalHours);
      if (element.cto) { this.totalHours =  this.totalHours + parseFloat(element.cto); }
        if (element.vacation) { this.totalHours =  this.totalHours + parseFloat(element.vacation); }
          if (element.pto) { this.totalHours =  this.totalHours + parseFloat(element.pto); }
            if (element.unpaid) { this.totalHours =  this.totalHours + parseFloat(element.unpaid); }
    });

    setTimeout((x) => {
        this.hotRegisterer.getInstance(this.id).loadData(response);
    }, 100);
}, (error) => {

    this.notification.error('Error', 'Something went wrong here, let the developer know.', { timeOut: 4000, showProgressBar: false, clickToClose: true }); /// Daily OT notificaton


});
  }

}
