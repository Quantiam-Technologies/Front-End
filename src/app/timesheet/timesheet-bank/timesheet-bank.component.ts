import { Component, OnInit,  } from '@angular/core';

import {  environment} from '../../../environments/environment';
import {  HttpClient, } from '@angular/common/http';
import {  Location} from '@angular/common';
import { HotTableRegisterer } from '@handsontable/angular';
import { MatDialog } from '@angular/material/dialog';

import Handsontable from 'handsontable';

import { ActivatedRoute, Router,  } from '@angular/router';


import { UserService } from '../../services/user/user.service';

import { CreatePayoutComponent } from '../create-payout/create-payout.component';

import { NotificationsService } from 'angular2-notifications';


@Component({
  selector: 'app-timesheet-bank',
  templateUrl: './timesheet-bank.component.html',
  styleUrls: ['./timesheet-bank.component.css']
})
export class TimesheetBankComponent implements OnInit {

  loadedUserId = false;
  private hotRegisterer = new HotTableRegisterer();
  hotTableId = 'hotInstance';
  showSubordinatesOnly;
  hotTableSettings: Handsontable.GridSettings = {
   // height: "600px",
    width: '730px',
    colHeaders: true,
    filters: true,
    
    dropdownMenu: true,
    afterChange: (changes, source) => {

      if (this.dataLoaded && changes[0]) {


      const data: any = this.hotRegisterer.getInstance('hotInstance').getSourceDataAtRow(changes[0][0]);


      console.log(data);


      data.comment = changes[0][3];

      this.updateComment(data);
      }


    },
    columns: [
    {
      data: 'type',
      title: 'Type',
      readOnly: true,
      width: '110px',
    },
    {
      data: 'date',
      title: 'Date',
      dateFormat: 'YYYY-MM-DD',
      readOnly: true,
    },
    {
      data: 'processed_hours',
      title: 'Transaction',
      readOnly: true,
    },
    {
      data: 'balance',
      title: 'Balance',
      readOnly: true,
    },
    {
      title: 'Timesheet',
      readOnly: true,
      allowHtml: true,
      filter: false,
      renderer:  (instance, td, row, col, prop, value, cellProperties) => {

        const data: any = instance.getSourceDataAtRow(row);
        Handsontable.dom.empty(td);
        const btn = document.createElement('button');
        btn.append('Timesheet');
        btn.classList.add('mat-raised-button');
        btn.classList.add('mat-primary');
        btn.classList.add('mat-small');
        btn.setAttribute('style', 'margin: 3px; border:0px;'); 
        btn.addEventListener('click', (r) => {
          this.router.navigate(['/timesheet/' + this.routeParams.userId + '/year/' + data.year + '/payperiod/' + data.payperiod]);

        });
        td.append(btn);
        return td;

      }
    },
    {
      title: 'RTO',
      readOnly: true,
      allowHtml: true,
      width: '80px',
      filter: false,
      renderer:  (instance, td, row, col, prop, value, cellProperties) => {
        Handsontable.dom.empty(td);
        const data: any = instance.getSourceDataAtRow(row);
        if (data.requestID) {

        const btn = document.createElement('button');
        btn.append('RTO');
        btn.classList.add('mat-raised-button');
        btn.classList.add('mat-accent');
        btn.classList.add('mat-small');
        btn.setAttribute('style', 'margin: 3px; border:0px;');  
        btn.addEventListener('click', (r) => {
          this.router.navigate(['/timesheet/rto/' + data.requestID]);

        });
        td.append(btn);
      }



      return td;

      }
    },
    {
      data: 'comment',
      title: 'Comment',
      width: '200px',
      filter: false,
    },

    ]
  };


  selectedType = 'vacation';
  routeParams: any = {userId: null};
  userId;
  dataLoaded = false;
  bankHistory;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    public userService: UserService,
    private location: Location,
    private dialog: MatDialog,
    private notification: NotificationsService,
    private router: Router,

     ) { }

  ngOnInit() {


      this.decideUserAndType();


  }

  decideUserAndType() {


    this.route.paramMap.subscribe(params => {

        this.routeParams.userId = parseInt(params.get('user'));
        this.routeParams.type = params.get('type');
        this.selectedType = this.routeParams.type;


        if (!this.routeParams.userId) {

            this.routeParams.userId = parseInt(this.userService.get('id'));

        }
        this.loadedUserId = true;
        this.fetchBankHistory();
    });

  }


  fetchBankHistory() {
    this.dataLoaded = false;

    this.http.get(environment.apiUrl + `/timesheet/${this.routeParams.userId}/bank/${this.routeParams.type}`).subscribe((r: any) => {

      this.location.go(`/timesheet/${this.routeParams.userId}/bank-history/${this.routeParams.type}`);
      this.hotRegisterer.getInstance(this.hotTableId).loadData(r);
      setTimeout((r) => {this.dataLoaded = true; }, 200);

    });

  }


  changeType() {
      this.routeParams.type = this.selectedType;
      this.fetchBankHistory();
  }

  changeUser(user) {
    this.routeParams.userId = parseInt(user.id);
    this.fetchBankHistory();
  }

  createPayout() {

    console.log(this.routeParams.userId);

    const dialogRef = this.dialog.open(CreatePayoutComponent, {

      // disableClose: true,
        width: 'auto',
        autoFocus: true,
        position: {'top': '50px'},
        data: { userId: this.routeParams.userId, }
      });

      dialogRef.afterClosed().subscribe(result => {


            if (result) {
              this.fetchBankHistory();
            }


      });

  }


  updateComment(hour) {
    if (hour.entryid) {
      this.http.put(environment.apiUrl + `/timesheet/hour/${hour.entryid}`, hour).subscribe((r) => {

        this.notification.success('Success', 'Comment was saved', {timeOut: 4000});

      });
    } else {
      this.notification.error('Oops', 'We can\'t save a comment to this entry.', {timeOut: 4000});
    }


  }

}
