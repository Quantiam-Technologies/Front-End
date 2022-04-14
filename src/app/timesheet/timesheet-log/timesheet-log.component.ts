import { Component, OnInit } from '@angular/core';
import {  Location} from '@angular/common';
import { ActivatedRoute, Router,  } from '@angular/router';

import { UserService } from '../../services/user/user.service';

import { TimesheetService } from '../timesheet.service';

@Component({
  selector: 'app-timesheet-log',
  templateUrl: './timesheet-log.component.html',
  styleUrls: ['./timesheet-log.component.css']
})
export class TimesheetLogComponent implements OnInit {

  constructor(private route: ActivatedRoute,
    private location: Location,
    public userService: UserService,
    private timesheetService: TimesheetService,) { }

  selectedRouteParams;
  routeParams = { userId: null};
  loadLog = false;

  ngOnInit() {

    this.route.paramMap.subscribe(params => {
      this.routeParams.userId = params.get('user');


      if (!this.routeParams.userId) {
       
        this.routeParams.userId = this.userService.get('id');
        this.location.go(`/timesheet/${this.routeParams.userId}/log`);

    }

    this.timesheetService.changeTimesheet(this.routeParams);
    console.log(this.routeParams.userId);

      this.selectedRouteParams = [{timesheet: this.routeParams.userId}];
      this.loadLog = true;

      
    
  });
  }


  selectedUserChanged(event)
  {
    this.loadLog = false;
    console.log(event);
    this.routeParams.userId = event.id;
    this.selectedRouteParams = [{timesheet: this.routeParams.userId}];
    this.location.go(`/timesheet/${this.routeParams.userId}/log`);
    this.timesheetService.changeTimesheet(this.routeParams);
    setTimeout(() => {
      this.loadLog = true;
    }, 500);
  }

}
