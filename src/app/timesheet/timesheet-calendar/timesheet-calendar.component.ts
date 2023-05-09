import { Component, OnInit, ViewChild  } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import {  HttpClient } from '@angular/common/http';

import {  environment } from '../../../environments/environment';

import { EventInput } from '@fullcalendar/core';

import { UserService } from '../../services/user/user.service';

import { Calendar } from '@fullcalendar/core'; // include this line
import { FullCalendarComponent,  } from '@fullcalendar/angular';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';

import timeGrigPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction'; // for dateClick



@Component({
  selector: 'app-timesheet-calendar',
  templateUrl: './timesheet-calendar.component.html',
  styleUrls: ['./timesheet-calendar.component.css']
})
export class TimesheetCalendarComponent implements OnInit {

  
  @ViewChild('calendar') calendarComponent: FullCalendarComponent;  
 
  subordinatesOnly = false;
  selectedUser;
  minimumHours = 0;
  calendarPlugins = [dayGridPlugin,interactionPlugin,timeGrigPlugin]; // important! //
 
 
  calendarHeader = {
    left: 'prev,next today',
    center: 'title',
    right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
  };

  constructor(private router: Router, private http: HttpClient, private userService: UserService) {

      const name = Calendar.name; // add this line in your constructor 
   }

   calendarOptions:any = {
    plugins: [dayGridPlugin],
    dayMaxEventRows: true,
    eventLimit: 5,
    aspectRatio: 10,
    height: 700,
    
    header: {
      left: 'prev,next',
      center: 'title',
      right: 'month,agendaWeek,agendaDay,listMonth'
    },
    eventSources: [this.eventSourceQuantiam()],
    eventClick: (calEvent, jsEvent, view) => {
      this.router.navigate(['/timesheet/rto/' + calEvent.event._def.extendedProps.rto_id]);

    },
  };

  ngOnInit() {

    
  }

  eventClick (calEvent, jsEvent, view) {


    this.router.navigate(['/timesheet/rto/' + calEvent.rto_id]);

  }

  updateCalendar = function (this:any) { //possible problem
    this.calendarOptions.eventSources = [this.eventSourceQuantiam()];
	};

  eventSourceQuantiam() {

    return  {
      url: environment.apiUrl + '/rtocalendar',
      //headers: {'Authorization': 'Bearer ' + localStorage.getItem('token'), },
      extraParams: {
                  user:  this.userService.currentUser.employeeid || null,
                  userID: this.selectedUser || null,
                  subordinates: this.subordinatesOnly,
                 'minimumHours': this.minimumHours
              },
     color: '#38536f',
    };
  
  }

  updateSelectedUser(event) {
    if (!event) { this.selectedUser = null; } else { this.selectedUser = event.employeeid; }

    this.updateCalendar();
    // console.log(event);
  }


  printPage() {
    window.print()
  }





}


