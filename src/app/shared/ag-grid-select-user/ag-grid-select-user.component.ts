import {AfterViewInit, Component, ViewChild, ViewContainerRef} from '@angular/core';

import {ICellEditorAngularComp} from '@ag-grid-community/angular';


@Component({
  selector: 'app-ag-grid-select-user',
  templateUrl: './ag-grid-select-user.component.html',
  styleUrls: ['./ag-grid-select-user.component.css']
})
export class AgGridSelectUserComponent implements ICellEditorAngularComp, AfterViewInit {

  private params: any;

  public selectedValue: any;
  public previousValue: any;

  placeholder = 'Select User'

  private input: any;

  @ViewChild('userEditor', { read: ViewContainerRef, static: true }) public container;  // reference the container

  constructor() { }

  ngAfterViewInit() {
    window.setTimeout(() => {
   //   console.log(this.container.element.nativeElement.firstChild.firstChild.firstChild.children[1].firstChild);
       this.input = this.container.element.nativeElement.firstChild.firstChild.firstChild.children[1].firstChild;

       // console.log(this.input);
       this.input.value = this.params.charPress;

       this.input.focus();
    //   this.params.api.clearFocusedCell();

    }, 100);
  }

  isPopup(): boolean {
    return true;
  }

  agInit(params: any): void {
    console.log(params);
    this.params = params;
    this.previousValue = params.value;
  }

  getValue(): any {

    if (typeof this.selectedValue === 'undefined') { return this.previousValue; }

    return this.selectedValue;
  }

  selectValue(event) {
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
        key === 39 ) {  // right
       // this.toggleMood();
       this.params.api.stopEditing();
       this.params.api.tabToNextCell();
       this.params.api.tabToPreviousCell();

    }

    if (key === 39) { this.params.api.tabToNextCell(); }
    if (key === 37) { this.params.api.tabToPreviousCell(); }
  }

}
