
import {AfterViewInit, Component, ViewChild, ViewContainerRef, ElementRef} from '@angular/core';

import {ICellEditorAngularComp} from '@ag-grid-community/angular';

import { NotificationsService } from 'angular2-notifications';


import * as moment from 'moment';

@Component({
  selector: 'app-ag-grid-timesheet-value-editor',
  templateUrl: './ag-grid-timesheet-value-editor.component.html',
  styleUrls: ['./ag-grid-timesheet-value-editor.component.css']
})
export class AgGridTimesheetValueEditorComponent implements ICellEditorAngularComp, AfterViewInit {


  params: any;

  longDate;
  dayOfWeek;

  value: any;
  oldValue: any;
  node: any;

  public selectedValue: any;
  public previousValue: any;
  public infoString: string;

  private input: any;
  private focused = false;

  @ViewChild('valueField', { read: ViewContainerRef, static: true }) public minuteInput: any;  // reference the container


  constructor(
    private notification: NotificationsService,) { }



  ngAfterViewInit() {
    setTimeout(() => {   this.minuteInput.element.nativeElement.select(); }, 0);

  }

  isCancelBeforeStart(): boolean {
      if (this.params.node.data.category.absence
        && this.params.node.data.project.projectID !== 5 ) { return true; }  // if not a holiday needs to added
      return false;
  }

  isCancelAfterEnd(): boolean {
    //console.log(this.value);
    const int = parseInt(this.value);
    //console.log(this.value, int);

    if(this.value)
    {
      if((int !== 8) && this.params.node.data.project.projectID === 5) { 
        
        this.notification.error('Stat Error', ' Stat holidays must be 8 hours.', {timeOut: 4000, showProgressBar: false, clickToClose: true}); /// Daily OT notificaton
              
        ;return true;
      }
    }
    if (this.value === this.oldValue) { return true; }
    return false;
  }


  isPopup(): boolean {
    return true;
  }

  agInit(params: any): void {
 //   console.log(params);
    this.params = params;
    this.value = params.value;
    this.oldValue = params.value;

    if (this.params.keyPress === 8) {

      this.value = '';
      setTimeout(() => {this.params.api.stopEditing(); });
      return;

    }
    if (this.params.charPress && !isNaN(this.params.charPress)) { this.value = this.params.charPress; }
    this.longDate = moment(params.column.colDef.field).format('ddd - MMM Do, YYYY');
    this.infoString = params.node.data.project.projectID + ' - ' + this.longDate;
  }

  getValue(): any {
   // console.log('test');
    if (this.value) { return '' + this.toNearest(this.value, 0.25) + ''; }
    return '';
  }


  onKeyDown(event) {
 // console.log(event);
    const key = event.which || event.keyCode;
  }

  toNearest(num, frac) {
    return Math.ceil(num / frac) * frac;
  }

}
