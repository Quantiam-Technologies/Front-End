import {AfterViewInit, Component, ViewChild, ViewContainerRef} from '@angular/core';

import {ICellEditorAngularComp}  from "ag-grid-angular";


@Component({
  selector: 'app-ag-grid-select-project',
  templateUrl: './ag-grid-select-project.component.html',
  styleUrls: ['./ag-grid-select-project.component.css']
})
export class AgGridSelectProjectEditorComponent implements ICellEditorAngularComp, AfterViewInit {



  private params: any;

  public selectedValue: any;
  public previousValue: any;

  private input: any;

  @ViewChild('projectEditor', { read: ViewContainerRef, static: true }) public container;  // reference the container

  constructor() {

  }



  ngAfterViewInit() {
    window.setTimeout(() => {

       this.input = this.container.element.nativeElement.firstChild.firstChild.firstChild.children[1].firstChild;

      // this.input.value = this.params.charPress;
       this.input.focus();

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

    return this.selectedValue.id;
  }

  selectValue(event) {
    //console.log(event);
    this.selectedValue = event;
    this.params.api.stopEditing();
    this.params.api.tabToNextCell();
    this.params.api.tabToPreviousCell();
  }



  onKeyDown(event): void {
    const key = event.which || event.keyCode;
  //  console.log(event.keyCode);
    if (key === 37 ||  // left
        key === 39 || key === 27 ) {  // right

      const element: any = document.activeElement;
      element.blur();
       this.params.api.stopEditing();

    }

    if (key === 39) { this.params.api.tabToNextCell(); }
    if (key === 37) { this.params.api.tabToPreviousCell(); }
  }
}
