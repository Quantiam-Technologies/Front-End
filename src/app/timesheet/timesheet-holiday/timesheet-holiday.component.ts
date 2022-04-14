import { Component, OnInit } from '@angular/core';
import {  environment } from '../../../environments/environment';
import {  HttpClient } from '@angular/common/http';
import { HotTableRegisterer } from '@handsontable/angular';


import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-timesheet-holiday',
  templateUrl: './timesheet-holiday.component.html',
  styleUrls: ['./timesheet-holiday.component.css']
})
export class TimesheetHolidayComponent implements OnInit {

  constructor( private notify: NotificationsService, private http: HttpClient) { }

  private hotRegisterer = new HotTableRegisterer();
  year = new Date().getFullYear();
  currentDate = new Date();
  timesheetStartYear = 2014;
  timesheetEndYear;
  timesheetYears = [];
  lastFetchedData = [];

  // Hot table
  id = 'hotInstance';
  hotTableSettings: any = {
    colHeaders: true,
 //   minSpareRows: 1,
    afterChange: (changes, source) => {
      console.log(changes, source);
      if (changes) {
        const rowProp: any = this.hotRegisterer.getInstance(this.id).getSourceDataAtRow(changes[0][0]);
        console.log(changes);
        const payload: any = {};
        payload[changes[0][1]] = changes[0][3];
        payload.entryid = rowProp.entryid;
        console.log(rowProp, payload);
        if (changes[0][2] !== changes [0][3]) { // only trigger if different
        this.updateHoliday(payload.entryid, payload);
        }
      }
    },
    columns: [
      { data: 'entryid', title: 'ID', readOnly: true},
      { data: 'holidayname', title: 'Name'},
      { dateFormat: 'YYYY-MM-DD', data: 'date', title: 'Date', type: 'date'},
      {
        title: 'Actions',
        width: '60px',
        renderer: function(instance, td, row, col, prop, value, cellProperties) {

        //  console.log(td,row,col,prop,value);
          const data = cellProperties.instance.getInstance('hotInstance').getSourceDataAtRow(row);
            // console.log(data);
          const rowDate = new Date(data.date);
          const  currentDate = new Date();

          if (data.entryid && rowDate > currentDate) {
            console.log(rowDate, currentDate);
            td.innerHTML = `<button id="deleteButton" class="btn btn-xs btn-danger" style="margin:2px;">Delete</button>`;
          }
          return td;
        }
      },
    ],

    afterOnCellMouseDown: (event, coords, TD) => {
       console.log(event);

       if (event.realTarget.id === 'deleteButton' && coords.col === 3) {
         this.deleteHoliday(coords);
       }

      },


  };



   ngOnInit() {

    this.fetchHolidayList();
    // Populate acceptable years
    this.timesheetEndYear = this.year + 1;
    let i;
    for ( i = this.timesheetStartYear; i <= this.timesheetEndYear; i++) {
      this.timesheetYears.push(i);
    }

  }


  fetchHolidayList() {
		  const params: any = {'year': this.year};
      this.http.get(environment.apiUrl + '/holiday', {params: params}).subscribe((response: any) => {

         // console.log(response);
          this.lastFetchedData = response;
          this.hotRegisterer.getInstance(this.id).loadData([]);
          this.hotRegisterer.getInstance(this.id).loadData(response);
          console.log(this.hotTableSettings);
      });
  }

  createHoliday() {


  }

  addTableRow() {


     if (confirm('Are you sure you want to create a new holiday?')) {

      this.http.post(environment.apiUrl + `/holiday`, null).subscribe((r: any) => {
        this.hotRegisterer.getInstance(this.id).alter('insert_row', 0);
        this.hotRegisterer.getInstance(this.id).setDataAtCell(0, 0, r.entryid );


      });
    }
  }


  deleteHoliday(coords) {

    const holiday: any = this.hotRegisterer.getInstance(this.id).getSourceDataAtRow(coords.row);
    this.http.delete(environment.apiUrl + `/holiday/${holiday.entryid}`).subscribe((r) => {

      this.notify.success('Deleted', 'You deleted holiday ' + holiday.entryid, { timeOut: 4000, showProgressBar: false, clickToClose: true }); /// Daily OT notificaton

      this.fetchHolidayList();
    });


  }


  updateHoliday(id, params) {

    this.http.put(environment.apiUrl + `/holiday/${id}`, params).subscribe((r) => {



    });

  }


}
