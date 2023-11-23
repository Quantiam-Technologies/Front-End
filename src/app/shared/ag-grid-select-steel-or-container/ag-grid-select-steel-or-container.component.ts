import {AfterViewInit, Component, ViewChild, ViewContainerRef} from '@angular/core';


import {ICellEditorAngularComp} from "ag-grid-angular";

@Component({
  selector: 'app-ag-grid-select-steel-or-container',
  templateUrl: './ag-grid-select-steel-or-container.component.html',
  styleUrls: ['./ag-grid-select-steel-or-container.component.css']
})
export class AgGridSelectSteelOrContainerComponent implements ICellEditorAngularComp, AfterViewInit {


  @ViewChild('materialOrContainerEditor', { read: ViewContainerRef }) public container;  // reference the container

  params;
  previousValue;
  selectedValue;

  constructor() { }

  ngAfterViewInit() {


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
