import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { HotTableRegisterer } from '@handsontable/angular';
import { UserService } from '../../services/user/user.service';
import { NotificationsService } from 'angular2-notifications';



@Component({
    selector: 'app-timesheet-rto-allocation',
    templateUrl: './timesheet-rto-allocation.component.html',
    styleUrls: ['./timesheet-rto-allocation.component.css']
})
export class TimesheetRtoAllocationComponent implements OnInit {



    constructor(private http: HttpClient, public userService: UserService, private notify: NotificationsService ) {}

    selectedYear = '' + new Date().getFullYear() + '';
    yearList: string[] = [];

    private hotRegisterer = new HotTableRegisterer();


    // Hot table
    id = 'hotInstance';
    hotTableSettings: any = {
        colHeaders: true,
        afterChange: (changes, source) => {

          console.log(changes, source);
          if (changes) {
           const rowProp: any = this.hotRegisterer.getInstance('hotInstance').getSourceDataAtRow(changes[0][0]);


            const payload: any = {};
            payload[changes[0][1]] = changes[0][3];
            payload.employee_id = rowProp.employee_id;
            if (changes[0][2] !== changes [0][3]) { // only trigger if different
            this.updateList(rowProp.entry_id, payload);
            }
          }
        }
    };

    ngOnInit() {


        this.fetchList();
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

    fetchList() {
        const params: any = { 'year': this.selectedYear };
        this.http.get(environment.apiUrl + '/rto/allocation/list', { params: params }).subscribe((response: any) => {

            // console.log(response);
            const currentYear = new Date().getFullYear();
            const filteredArray = response.filter(element => {

                if (element.employee && element.employee.hasOwnProperty('leavedate')) {

                 //  const selectedYear2 = new Date(this.selectedYear).getFullYear();
                    const employeeLeaveYear = new Date(element.employee.leavedate).getFullYear();
                  //  console.log(employeeLeaveYear, this.selectedYear);
                    if (employeeLeaveYear >= parseInt(this.selectedYear, null)) { return element; }
                } 

                if(element.employee){

                    return element;
                }

            });

           // console.log(filteredArray);

            this.hotRegisterer.getInstance(this.id).loadData(filteredArray);
           // console.log(this.hotTableSettings);
        });
    }

    updateList(allocationId, params) {


      this.http.put(environment.apiUrl + `/rto/allocation/${allocationId}?filterSpinner`, params).subscribe((r) => {


          this.notify.success('Sucess', 'Updated entry', {timeOut: 4000});
      },(e)=>{
        this.notify.error('Error', 'Something went wrong, this did not save.', {timeOut: 4000});
      });

    }


}
