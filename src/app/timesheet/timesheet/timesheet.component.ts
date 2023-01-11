import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {  environment} from '../../../environments/environment';

import {  HttpClient} from '@angular/common/http';
import { UserService } from '../../services/user/user.service';
import { TimesheetService } from '../timesheet.service';

import { AllModules  } from '@ag-grid-enterprise/all-modules';



import { NotificationsService } from 'angular2-notifications';
import { faDownload } from '@fortawesome/free-solid-svg-icons';


import { AgGridTimesheetValueEditorComponent } from './ag-grid-timesheet-value-editor/ag-grid-timesheet-value-editor.component';

import * as moment from 'moment';


@Component({
  selector: 'app-timesheet',
  templateUrl: './timesheet.component.html',
  styleUrls: ['./timesheet.component.css']
})
export class TimesheetComponent implements OnInit {

  faDownload = faDownload;

  private gridApi;
  private gridColumnApi;

  modules = AllModules;
  public rowData = [];

  timesheetStartYear = 2014;
  timesheetEndYear;
  currentYear = (new Date()).getFullYear();
  timesheetYears = [] as any;
  timesheetPayperoids = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26,27];
  timeSheetObj;
  timeSheetFramework = [] as any;
  lastCellEdited;
  timesheetLoaded = false;
  timesheetEditable = false;
  displayTimesheet = false;
  showSelectBox = false;
  showSelectBox2 = false;
  canChangeTimesheetUser = false;
  firstLoad = true;
  showOnlyProjectsUsed = false;


  rowStyle = {

    border: '0px',
  };

  routeParams:any = {
    userId: null,
    year: null,
    payperiod: null,
  };

  defaultColDef = {
    resizable: false,
    editable: true,
  };



  autoGroupColumnDef = {
    headerName: 'Category',
    lockPosition: true,
    width: 340,
   // widt: 400,
    suppressMenu: true,
    lockPinned: true,
    pinned: 'left',
    resizable: true,
    sortable: true,
    editable: false,
    field: 'project.description',
    cellStyle: function (params) {
      const cellStyle = {};

      if (params.node.footer) {
        cellStyle['border-right'] = '0px !important';
      } else {

        cellStyle['cursor'] = 'pointer';
      }

      return cellStyle;

    },

    cellRendererParams: {
      suppressCount: true,
     // checkbox: true,
      padding: 20,
      innerRenderer: function(params) {


        if (params.node.group) {

            return '' + params.value + '';
        }
        let str = '';
        if ( params.value.length > 60) {
          str =  params.value.substring(0, 60) + '...';
        } else {
          str =  params.value;
        }

        return '<b style="display: inline-block; font-size: 12px;">' + params.data.project.projectID + '</b>\
         - <p style="display: inline-block; font-size:10px;">' + str + '</p>';
      },

    }
  };

  columnDefs = [

    {
     // headerName: "Category",
      field: 'category.categoryName',
      width: 600,
      rowGroup: true,
      rowPinned: true,

      // cellRenderer: "agGroupCellRenderer",
     // columnGroupShow: false,
     // marryChildren: true,
     // headerGroupTooltip: 'test tool tip',
      resizable: true,
      hide: true,
    },
    {

       headerName: 'Project',
       field: 'project.projectID',
       width: 200,
       suppressMenu: true,
       lockPosition: true,
       resizable: true,
     //  columnGroupShow: false,
      // rowGroup: true,
       hide: true,
     }
  ];


  rowClassRules:any = {

    'normal-row': function(params) {

      if (!params.node.footer && !params.node.group)  { return true; }
      return null;
    },
    'footer-row': function(params) {
       if (params.node.footer) {
        return true;
      }
      return false;

    },
    'group-row': function (params) {
      if (params.node.group && !params.node.footer) {return true; }
      return null;
    }

  };

  frameworkComponents = {
    numericEditor: AgGridTimesheetValueEditorComponent
  };

  getRowHeight = function(params) {
    if (params.node.level === 0 || params.node.footer) {
      return 48;
    } else {
      return 25;
    }
  };


  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router,
    public userService: UserService,
    private notification: NotificationsService,
    private timesheetService: TimesheetService,
    ) {  }





  ngOnInit() {

    // update these params if they change

    this.route.paramMap.subscribe(params => {
      this.routeParams.userId = params.get('user');
      this.routeParams.year = params.get('year');
      this.routeParams.payperiod = params.get('payperiod');

      setTimeout((x) => { this.fetchTimesheet(); }, 500);

    });


    this.timesheetEndYear = this.currentYear + 1;
    let i;
    for ( i = this.timesheetStartYear; i <= this.timesheetEndYear; i++) {
      this.timesheetYears.push(i);
    }

  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    setTimeout( (x)=>{params.api.sizeColumnsToFit()},2000);

  }

  onCellDoubleClicked($event) {}

   cellValueChanged($event) {
       this.updateHours($event);
       return;
   }
   onCellEditingStarted($event) {



         // check for holiday
        if ($event.value && $event.value.length === 0 ) { $event.value = null; }

         const holidayCheck = this.timeSheetObj.holidays.find((holiday) => {
          return holiday.date === $event.column.colId;
        });

        console.log(holidayCheck);
      /*   if ($event.data.category.categoryName === 'Absence' &&
        ($event.data.project.projectID !== 5 && holidayCheck.length > 1)
        ) {
         //this.gridApi.stopEditing();
         return;
        } */


   }


  fetchTimesheet() {

    let url = '';
    if (this.routeParams.year.length > 0) { url = '/timesheet/' + this.routeParams.userId + '/year/' + this.routeParams.year + '/payperiod/' + this.routeParams.payperiod + ''; } else {
      this.routeParams.userId = this.userService.currentUser.id;
      url = '/timesheet/' +  this.routeParams.userId;
     }

    this.timesheetLoaded = false;

    this.http.get<any>(environment.apiUrl + url)
    // .pipe(delay(500))
    .subscribe(response => {
     // console.log(response);
            this.timeSheetObj = response;
            this.routeParams.year = response.payPeriod.year;
            this.routeParams.payperiod = response.payPeriod.payPeriod;
            window.history.replaceState({}, '', `/timesheet/${this.routeParams.userId}/year/${ this.routeParams.year}/payperiod/${ this.routeParams.payperiod }`);
            this.timesheetService.changeTimesheet(this.routeParams);
            this.displayTimesheet = true;
            setTimeout((x) => {

              this.constructTimesheet();

              if (this.firstLoad) {
                 // this.gridApi.redrawRows();
                  this.firstLoad = !this.firstLoad;

              }
              this.checkIfTimesheetEditable();
            }, 400);
            setTimeout((x) => { this.timesheetLoaded = true; }, 1000);
         });


  }



  constructTimesheet() {

    // this.rowData = this.timeSheetObj.framework;
    this.timeSheetFramework = [];
    this.columnDefs.splice(2, 20);

    this.timeSheetObj.framework.forEach(category => {


      category.projects.forEach(project => {

          const row = {
            category: category,
            project: project,
          };




         this.timeSheetObj.payPeriod.dateArray.forEach(date => {

            try {
              row[date] = parseFloat(this.timeSheetObj.time.hours[category.category_id][project.projectID][date]);
            } catch (e) {
              row[date] = null;
            }

            if (isNaN(row[date])) { row[date] = null; }

         });

         this.timeSheetFramework.push(row);


      });


    });

    this.timeSheetObj.payPeriod.dateArray.forEach((date, i) => {

      const headerDate = moment(date).format('dd - DD');
      const long_headerDate = moment(date).format('dddd DD, YYYY');

      const  obj: any = {
        headerName: headerDate,
        field: date,
        suppressMenu: true,
        width: 70,
        // editable: false,
        lockPosition: true,
        type: 'numericColumn',
        cellEditor: 'numericEditor',
        cellRenderer:  (params) => {


          if (params.node.group && !params.node.footer) { return '<i>' + $.trim(params.value) + '</i>'; }

          if (params.node.footer) {

            if (params.value > 8 && !this.timeSheetObj.machine) {
            //  console.log(params);
              if (this.timesheetLoaded) {
              this.notification.info('Overtime', params.column.colId + ' has more then 8 hours.', {timeOut: 4000, showProgressBar: false, clickToClose: true}); /// Daily OT notificaton
              }
              return '<b style="color:red;">' + $.trim(params.value) + '</b>';

            }

            if ((params.value < 8 && params.value > 0)  && !this.timeSheetObj.machine) {
                return '<b style="color:red;">' + $.trim(params.value) + '</b>';
            }

            return '<b>' + $.trim(params.value) + '</b>';

           }

          if (params.value > 0) {

          // console.log(params);
         }

          let disabled = '';

          const holidayCheck = this.timeSheetObj.holidays.find((holiday) => {
            return holiday.date === params.column.colId;
          });


          if (params.data.category.categoryName === 'Absence' &&   !(params.data.project.projectID === 5 && holidayCheck)
           ||  (!this.timesheetEditable)) { disabled = 'disabled'; }

           return '<input class="form-control timesheet timesheet-input"  value="' + $.trim(params.value) + '" \
           \
           min="0"\
           step="0.25"\
           ' + disabled + ' ></input>';

        },
        timesheet_type: 'hours_field',
        // tooltipValueGetter: function (params) {

        //   if (params.node.group) { return null; }

        //   return long_headerDate + ' - Project ' + params.data.project.projectID;

        // },
        aggFunc: this.sumHoursColumn,
        cellStyle: (params) => {


          const cellStyle = {

            'text-align': 'center',
          //  'background-color': 'rgba(232, 242, 255,0.0)'
          };

          const absenceCheck = false;

        // if (Array.isArray(this.timeSheetObj.rto) && this.timeSheetObj.rto.length > 0) {
        //     this.timeSheetObj.rto.forEach((rto) => {

        //       if (absenceCheck) { return; }
        //       if (rto.status === 'approved') {

        //         rto.requested_time.forEach((time) => {

        //           if (time.date === params.column.colId) {

        //             absenceCheck = true;
        //             return;
        //             }
        //         });
        //       }


        //     });


        // }

        //   if (absenceCheck && !params.node.footer) {
        //     cellStyle['background-color'] = '#e8faff6b';
        //   }


          const holidayCheck = this.timeSheetObj.holidays.find((holiday) => {
            return holiday.date === params.column.colId;
          });

          const dateString = params.column.colId.split('_');
          const day = moment(dateString[0]).format('ddd');
          if ((holidayCheck || day === 'Sun' || day === 'Sat') && !params.node.footer) {

        //    if(holidayCheck){ params.column.holiday = true;}
            cellStyle['background-color'] = 'rgba(232, 242, 255,0.50)';

          }


          if (params.node.footer) {
           // cellStyle['font-weight'] = 'bold';
            cellStyle['border'] = '0px';
            if (params.value > 8 && !this.timeSheetObj.machine) {
              cellStyle['color'] = 'red';
            }
              cellStyle['color'] = 'black';
          }

          if (params.node.group && !params.node.footer) {
            cellStyle['font-size'] = '12px';

            cellStyle['font-style'] = 'italic';
          }

          return cellStyle;
        },


      };

      this.columnDefs.push(obj);
      // if day 7 push empty obj
      if (i === 6) {
        const emptyCol: any = {
          width: 40,
          headerName: ' ',
          field: null,
          lockPosition: true,
          suppressMenu: true,
          resizable: false,
          editable: false,
        };
        this.columnDefs.push(emptyCol);
      }



    });

    this.displayTimesheet = true;
    if (!this.gridApi) {   this.rowData = this.timeSheetFramework;  }

    if (this.gridApi) {

      this.gridApi.setColumnDefs(this.columnDefs);
      this.gridApi.setRowData(this.timeSheetFramework);
     // setTimeout( (x)=>{ this.gridApi.sizeColumnsToFit(); },1000);
      
    }

    setTimeout((x) => {
       const test = document.getElementsByClassName('ag-group-value');
       const last = test[test.length - 1];
       last.innerHTML   = '<b>Total</b> ( ' + this.timeSheetObj.denomination + ' )';

    }, 200);
  }

  onRowGroupOpened(event) {
   // console.log(event);

  }

  onRowClicked(event) {

    if (event.node.group) {
      event.node.setExpanded(!event.node.expanded);

    }


  }



  rowDataChanged(event) {


    if (this.gridApi) {
      this.gridApi.getRowStyle = function(params) {

        const rowStyle = {
          'border': '0px',
        };

        return rowStyle;

      };
   }
  }

  sumHoursColumn(data) {

    let sum = 0;
    data.forEach( function(value) {
      if (value) {
          sum = sum + parseFloat(value);
        }
    } );
    if (!sum) { return null; }

    return sum.toFixed(2);
  }

  previousPayPeroid() {


    if(this.timeSheetObj.payPeriod.previousPayPeriodYear)
    {
      this.router.navigate([`/timesheet/${this.routeParams.userId}/year/${this.timeSheetObj.payPeriod.previousPayPeriodYear}/payperiod/${this.timeSheetObj.payPeriod.previousPayPeriod}`]);
  
    }
    else
    {

   
      var checkNextPayPeriod  = parseInt(this.routeParams.payperiod) - 1;
    if (checkNextPayPeriod  === 0) {

      this.routeParams.payperiod = 26;
      this.routeParams.year = parseInt(this.routeParams.year) - 1;

    }
    else
      {
        this.routeParams.payperiod  = parseInt(this.routeParams.payperiod) - 1;
      }

    this.router.navigate([`/timesheet/${this.routeParams.userId}/year/${this.routeParams.year}/payperiod/${this.routeParams.payperiod}`]);
  }
  }

  nextPayPeroid() {

    if(this.timeSheetObj.payPeriod.nextPayPeriod)
    {

     
    }
    else
    {

      var checkNextPayPeriod  = parseInt(this.routeParams.payperiod) + 1;
    
      if (checkNextPayPeriod  > 27) {
  
        this.routeParams.payperiod = 1;
        this.routeParams.year = parseInt(this.routeParams.year) + 1;
  
      }
      else
      {
        this.routeParams.payperiod  = parseInt(this.routeParams.payperiod) + 1;
      }
  
      this.router.navigate([`/timesheet/${this.routeParams.userId}/year/${this.routeParams.year}/payperiod/${this.routeParams.payperiod}`]);
  

    }
   
  }

  changePayperoid() {
    this.router.navigate([`/timesheet/${this.routeParams.userId}/year/${this.routeParams.year}/payperiod/${this.routeParams.payperiod}`]);

  }

  checkIfTimesheetEditable() {


    if (this.timeSheetObj) {
      if (this.userService.hasPermission(10) || !this.timeSheetObj.payPeriod.locked) {


        this.timesheetEditable = true;

        this.columnDefs.forEach((element: any) => {
            element.editable = true;
        });
        this.gridApi.setColumnDefs(this.columnDefs);
      //  this.defaultColDef['editable'] = true;

        return;
      }
     // console.log('test');
      this.timesheetEditable = false;
        this.columnDefs.forEach((element: any) => {
          element.editable = false;
      });
      this.gridApi.setColumnDefs(this.columnDefs);
      // this.defaultColDef['editable'] = false;
    }


    return;

  }


  getRowClass(params) {
   // console.log('test', params);

  }

  updateHours(params) {

    this.lastCellEdited = params;
    const payload = {

      date: params.column.colId,
      payperoid: this.timeSheetObj.payPeriod.payPeriod,
      projectid: params.data.project.projectID,
      year: this.timeSheetObj.payPeriod.year,
      employeeid: this.timeSheetObj.userID,
      hours: params.value,

    };

    if (params.value === '') { params.value = 0; }
  //  payload[this.timeSheetObj.denomination.toLowerCase()] = '' + params.value + '';

    const url = '/timesheet/' + this.routeParams.userId + '/process';
    this.http.put<any>(environment.apiUrl + url + '?filterSpinner', payload)
    .subscribe(response => {

 

                this.timeSheetObj.bank = response.bank;
                this.timeSheetObj.overhours[response.week - 1].daily_sum = response.totaldaily_overhours;
                this.timeSheetObj.overhours[response.week - 1].weekly_sum = response.totalweekly_overhours;

                if(this.timeSheetObj.overhours[response.week - 1].weekly_sum > this.timeSheetObj.overhours[response.week - 1].daily_sum)
                {
                  this.timeSheetObj.overhours[response.week - 1].bank = this.timeSheetObj.overhours[response.week - 1].weekly_sum ;
                }
                else
                {
                  this.timeSheetObj.overhours[response.week - 1].bank =  this.timeSheetObj.overhours[response.week - 1].daily_sum;
                }
             

            this.notification.success('Saved ', response.projectid + ', ' + response[this.timeSheetObj.denomination.toLowerCase()] + ' ' + this.timeSheetObj.denomination + ' on ' + response.date, {timeOut: 2000, showProgressBar: false, clickToClose: true}); /// Daily OT notificaton

         },
         error => {

            const rowNode = this.gridApi.getRowNode(params.rowIndex);
            params.data[params.column.colId] = null;
            rowNode.setData(params.data);
            this.gridApi.redrawRows();
            this.notification.error('error ',  'The data was not saved.', {timeOut: 4000, showProgressBar: false, clickToClose: true}); /// Daily OT notificaton

         });
  }

  generateTimesheetDownload() {

    /* if(this.timeSheetObj.compensation !== 'Machine')
    {
     this.notification.error('Wait',  'The printable timesheet for Salary & Hourly is being updated. Please try again later.', {timeOut: 4000, showProgressBar: false, clickToClose: true}); /// Daily OT notificaton
     return;
    } */
    if (this.checkIfWeekendHasMoreThen2Hours()) {

    const url = '/timesheet/' + this.routeParams.userId + '/year/' + this.routeParams.year + '/payperiod/' + this.routeParams.payperiod + '/generate';




    this.notification.info('Processing... ',  'Generating this timesheet.', {timeOut: 4000, showProgressBar: false, clickToClose: true}); /// Daily OT notificaton

    this.http.get<any>(environment.apiUrl + url + '')
    .subscribe(r => {
      window.location.assign(r.url);
      this.notification.success('Success',  'Timesheet made!', {timeOut: 4000, showProgressBar: false, clickToClose: true}); /// Daily OT notificaton

    });

  }

  }

  selectedUserChanged(event) {

    this.routeParams.userId = event.id;



    this.router.navigate([`/timesheet/${this.routeParams.userId}/year/${this.routeParams.year}/payperiod/${this.routeParams.payperiod}`]);
    this.showSelectBox = false;

  }

 hideSelectBox() {
  this.showSelectBox2 = false;
  setTimeout((x) => {
    if (!this.showSelectBox2) {
        this.showSelectBox = false;
      }

     } , 1000 );
  }

  checkUserForSubordinatesAndMachines() {
    this.showSelectBox2 = true;
    if ((this.userService.hasMachines() && this.userService.hasSubordinates) || this.userService.hasPermission(1)) {
      this.canChangeTimesheetUser = true;
      this.showSelectBox = true;
    }

    return true;
  }

  checkIfWeekendHasMoreThen2Hours() {
    if (!this.timeSheetObj.machine && this.timeSheetObj.compensation !== 'Temporary') {
    let test = true;
    const weekendDateArray = [] as any;
    const weekDayDateArray = [] as any;
    this.timeSheetObj.payPeriod.dateArray.forEach((date) => {

      const  day = moment(date).day();
      if (day === 0 || day === 6) {
        weekendDateArray.push(date);
      } else {
        weekDayDateArray.push(date);
      }

    });


    const weekendHours = {} as any;
    this.timeSheetFramework.forEach((project) => {

    //  console.log(project);
      weekendDateArray.forEach((date) => {

        if (!weekendHours[date]) {
          weekendHours[date] = 0;
        }

        if (project[date]) {
          weekendHours[date] = parseFloat(weekendHours[date]) + parseFloat(project[date]);
        }

      });

    });


    console.log(weekendHours);
    Object.keys(weekendHours).forEach((key) => {

      if (weekendHours[key] > 0 && weekendHours[key] < 2) {
        test = false;
      }
     });
    if (!test) {
      this.notification.error('Not Enough Hours',  'You must have a minimum of 2 hours on a weekend.', {timeOut: 4000, showProgressBar: false, clickToClose: true}); /// Daily OT notificaton
      return test;
    }

    const weekDayHours = {} as any;

    this.timeSheetFramework.forEach((project) => {

    //  console.log(project);
    weekDayDateArray.forEach((date) => {

        if (!weekDayHours[date]) {
          weekDayHours[date] = 0;
        }

        if (project[date]) {
          weekDayHours[date] = parseFloat(weekDayHours[date]) + parseFloat(project[date]);
        }

      });

    });


    Object.keys(weekDayHours).forEach((key) => {

      if (weekDayHours[key] < 8 && weekDayHours[key] !== 0) {
        console.log(test, weekendHours[key]);
        test = false;
      }
     });
    if (!test) {
      this.notification.error('Not Enough Hours',  'Salaried employees must have a minimum of 8 hours entered for weekdays you have worked.', {timeOut: 4000, showProgressBar: false, clickToClose: true}); /// Daily OT notificaton
      return test;
    }


      return test;

   }

   return true;
  }



}
