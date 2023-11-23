import { Component, OnInit, AfterViewInit, ViewChild, HostListener, ViewContainerRef, ElementRef } from '@angular/core';
import { ICellEditorAngularComp } from '@ag-grid-community/angular';
import {MatDialog } from '@angular/material/dialog';
import { DialogSteelContainerSelectionComponent } from '../dialog-steel-container-selection/dialog-steel-container-selection.component';


import { PopUpSteelCardServiceService } from '../../../shared/pop-up-steel-card/pop-up-steel-card-service.service';

@Component({
  selector: 'app-ag-grid-sem-container-steel-edit',
  templateUrl: './ag-grid-sem-container-steel-edit.component.html',
  styleUrls: ['./ag-grid-sem-container-steel-edit.component.css']
})
export class AgGridSemContainerSteelEditComponent implements ICellEditorAngularComp {

  params: any;

  private input: any;



   constructor(private popUpSteel: PopUpSteelCardServiceService, public dialog: MatDialog) { }


  agInit(params: import('@ag-grid-community/all-modules').ICellEditorParams): void {


      const dialogRef = this.dialog.open(DialogSteelContainerSelectionComponent, {
        width: '600px',
        position: {
          top: '100px',
        },
       // disableClose:true,
        data: {run: params}
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed', result);

      });


    this.params = params;

    this.popUpSteel.hide(); // Hide any steel pop ups that might be around

      this.params.stopEditing();

  }

  getValue() {
    // throw new Error("Method not implemented.");


   // console.log('getVale', this.selectedValue);
    return;
  }

  isPopup?(): boolean {
    return true;
  }
  focusIn?(): void {
    // throw new Error("Method not implemented.");
   // console.log('test');
  }
  focusOut?(): void {
    // throw new Error("Method not implemented.");
  }

}
