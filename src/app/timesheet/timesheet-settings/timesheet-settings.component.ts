import { Component, OnInit } from '@angular/core';

import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-timesheet-settings',
  templateUrl: './timesheet-settings.component.html',
  styleUrls: ['./timesheet-settings.component.css']
})
export class TimesheetSettingsComponent implements OnInit {

  constructor(public userService: UserService) { }

  ngOnInit() {
  }

}
