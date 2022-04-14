import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TimesheetService {

  private defaultTimesheetParams = {userId: '', year: '', payperiod: '', requestId: '', bankHistoryUserId: ''};
  private messageSource = new BehaviorSubject(this.defaultTimesheetParams);
  currentTimesheet = this.messageSource.asObservable();

  constructor() { }

  changeTimesheet(message: any) {
    this.messageSource.next(message);
   // console.log(message);
  }
}
