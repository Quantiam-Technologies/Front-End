import { Component,  OnDestroy } from '@angular/core';

import { FileSaverService } from 'ngx-filesaver';
import { HttpClient } from '@angular/common/http';
import {  environment} from '../../../../environments/environment';
import {ICellRendererAngularComp} from 'ag-grid-angular';

import { SteelReworkDialogComponent } from '../../steel-rework-dialog/steel-rework-dialog.component';

import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';

import { faFileExcel,faArrowRotateLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-ag-grid-steel-actions-display',
  templateUrl: './ag-grid-steel-actions-display.component.html',
  styleUrls: ['./ag-grid-steel-actions-display.component.css']
})
export class AgGridSteelActionsDisplayComponent implements ICellRendererAngularComp, OnDestroy  {

  
  params: any;
  faFileExcel = faFileExcel;
  faArrowRotateLeft = faArrowRotateLeft;

  constructor(
    private http: HttpClient,    
    private _FileSaverService: FileSaverService,
    private dialog: MatDialog, 
    ){ }

  refresh() {
    return false;
  }

  agInit(params: any): void {
    this.params = params;
  }
  afterGuiAttached?(): void {
    throw new Error('Method not implemented.');
  }

  printTraveller(params){
      console.log(params);

      this.http.get(environment.apiUrl + '/steel/'+params.data.id+'/traveller',).subscribe((r:any) => {

        window.location.assign(r.url);
      
      });
      

  }

 

    ngOnDestroy() {

    }


    displayReworkDialog(params)
    {
  
      const dialogRef = this.dialog.open(SteelReworkDialogComponent, {
        width: '600px',
        position: {'top':'10px'},
        data: params.data,
      });
  
      dialogRef.afterClosed().subscribe(result => {
  
  
          //  this.refreshDatabase();  ?? 
          console.log(result);
      })
    }

}
