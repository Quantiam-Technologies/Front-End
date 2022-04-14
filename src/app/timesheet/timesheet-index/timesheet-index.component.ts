import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TimesheetService } from '../timesheet.service';

import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-timesheet-index',
  templateUrl: './timesheet-index.component.html',
  styleUrls: ['./timesheet-index.component.css']
})
export class TimesheetIndexComponent implements OnInit {

  routeParams: any;
  currentTimesheet = {userId: '', year: '', payperiod: '', requestId: '', bankHistoryUserId: ''};

  constructor(private router: Router, private route: ActivatedRoute, private timesheetService: TimesheetService, public userService: UserService) { }

  ngOnInit() {

    this.timesheetService.currentTimesheet.subscribe(obj => {
          this.currentTimesheet.userId = obj.userId;
          this.currentTimesheet.year = obj.year;
          this.currentTimesheet.payperiod = obj.payperiod;
          this.currentTimesheet.requestId = obj.requestId;
          this.currentTimesheet.bankHistoryUserId = obj.bankHistoryUserId;
    });

    // figure out current payperoid year

  }



  calculatePayperiod() {
      // $month =  Date("n", strtotime($startdate) );
      // $year =  Date("Y", strtotime($startdate));


      // $ReferenceDate = strtotime("2012-01-01"); // Define Reference Date
      // $startdate = strtotime($startdate); // Define Reference Date

      // $test1 = ($startdate-$ReferenceDate); // # seconds since reference date
      // $test2 = Floor($test1/1209600+1);  //payperiods since reference date
      // $test3 = floor(floor($test2/26));  // # of years since reference year
      // $test4 = $test2-($test3*26); // # of payperiods into the year of interest // Also returns current payperoid


      // $payPeriod = intval($test4 + 1);

    	// dd($payPeriod,$month);
      // if(($payPeriod == 1 || $payPeriod == 2) && $month == 12)
      // {
      //   $year = $year +1;
      // }



      // $returnArray['year'] = $year;
      // $returnArray['payperiod'] = $payPeriod;
      //   	dd($returnArray);
      // return $returnArray;

  }

}
