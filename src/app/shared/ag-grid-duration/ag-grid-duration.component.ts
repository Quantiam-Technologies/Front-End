import {AfterViewInit, Component, ViewChild, ViewContainerRef, ElementRef} from '@angular/core';

import {ICellEditorAngularComp} from '@ag-grid-community/angular';


@Component({
  selector: 'app-ag-grid-duration',
  templateUrl: './ag-grid-duration.component.html',
  styleUrls: ['./ag-grid-duration.component.css']
})
export class AgGridDurationComponent implements ICellEditorAngularComp, AfterViewInit {

  private params: any;

  minutes = 0;
  hours = 0;

 

  value : any;

  public selectedValue: any;
  public previousValue: any;

  private input: any;
  private focused: boolean = false;

  @ViewChild('durationMinutes', { read: ViewContainerRef, static: true }) public minuteInput: any;  // reference the container 

  constructor() { 

      console.log(this.value);

  }

  ngAfterViewInit() {

      //duration_minutes

      console.log(this.minuteInput);

        setTimeout(() => {
            this.minuteInput.element.nativeElement.select();
            this.minuteInput.element.nativeElement.focus();
        }, 0);
     

  }

  
  isPopup(): boolean {
    return true;
  }

  agInit(params: any): void {
    console.log(params);
    this.params = params;
    this.previousValue = params.value;
    this.minutes = Math.floor(this.previousValue / 60);
  }

  getValue(): any {

    const seconds = (this.minutes * 60) + (this.hours * 60 * 60);
    console.log(seconds)
    return seconds;
  }

  selectValue(event)
  {
    console.log(event);
    this.selectedValue = event;
    this.params.api.stopEditing();
    this.params.api.tabToNextCell();
    this.params.api.tabToPreviousCell(); 
  }


  
  onKeyDown(event): void {
    const key = event.which || event.keyCode;
    console.log(event.keyCode);
    if (key === 37 ||  // left
        key === 39 || key === 27 ) {  // right
          this.params.api.stopEditing();       
          this.params.api.tabToNextCell();
          this.params.api.tabToPreviousCell(); 
       
       
    }

    if(key === 39){ this.params.api.tabToNextCell(); }
    if(key === 37){ this.params.api.tabToPreviousCell(); }
  }

}
