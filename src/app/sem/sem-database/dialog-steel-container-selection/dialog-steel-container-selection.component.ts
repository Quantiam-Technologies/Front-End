import { Component, OnInit, Inject } from '@angular/core';
import {MatLegacyDialog as MatDialog, MatLegacyDialogRef as MatDialogRef, MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA} from '@angular/material/legacy-dialog';
import { NotificationsService } from 'angular2-notifications';
import { RefreshDBTablesService } from '../../../services/refresh-db-tables/refresh-dbtables.service';

import { HttpClient, HttpParams } from '@angular/common/http';
import {  environment} from '../../../../environments/environment';

@Component({
  selector: 'app-dialog-steel-container-selection',
  templateUrl: './dialog-steel-container-selection.component.html',
  styleUrls: ['./dialog-steel-container-selection.component.css']
})
export class DialogSteelContainerSelectionComponent  {

  params: any;

  public selectedValue: any;
  public previousValue: any;
  type = '';
  container = false;
  steel = false;
  sample = false;

  selectedContainer: any = {};
  selectedSteel: any = {};
  selectedSample: any = {};

  constructor(
    public dialogRef: MatDialogRef<DialogSteelContainerSelectionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private refreshDBTableService: RefreshDBTablesService,
    private http: HttpClient,
    private notification: NotificationsService, ) {

    console.log(this.data);

    }

  onNoClick(): void {
    this.dialogRef.close();
  }

  getValue() {
    // throw new Error("Method not implemented.");

    if (this.selectedContainer.id) {
    //  console.log(this.selectedContainer);
      this.type = 'container';
      return this.selectedContainer;
    }

    if (this.selectedSteel.id) {
      this.type = 'steel';
      return this.selectedSteel;
    }

    if (typeof this.selectedValue === 'undefined') { return this.previousValue; }

    return this.selectedValue;
  }


  selectContainer(obj) {

    this.selectedContainer = obj;
    // this.getValue();
  }


  clearSelectedContainer() {
    this.selectedContainer = null;
  }

  selectSample(obj) {
    this.selectedSample = obj;
  }

  clearSelectedSample() {
    this.selectedSample = null;

  }

  selectSteel(obj) {
    this.selectedSteel = obj;

  }

  clearSelectedSteel() {
    this.selectedSteel = null;

  }


  confirmChoice() {

    let key = '';
    let value = '';
    this.selectedValue = this.getValue();
    if (this.type === 'container') {
      key = 'container_id';
      value = this.selectedValue.id;
    }

    if (this.type === 'steel') {
      key = 'steel_id';
      value = this.selectedValue.id;
    }

    if (this.data.run.data.hasOwnProperty('xrd_analysis')) {
      this.updateXrdrun(key, value);
    }

    if (this.data.run.data.hasOwnProperty('sem')) {
      this.updateSemrun(key, value);
    }


  }

  updateSemrun(key, value) {
    const params = {};
    params[key] = value;
    this.http.put(environment.apiUrl + '/instrument/sem/run/' + this.data.run.data.semrun_id + '?filterSpinner', params)
    .subscribe(response => {

      this.notification.success('Success', 'This field was updated', {showProgressBar: false, timeOut: 2000, clickToClose: true});
      // refresh semrun table using service
      this.refreshDBTableService.refreshSemTable(true);
      this.dialogRef.close();
      // Sanitized logo returned from backend
    },
    error => {
                this.notification.error('Error', 'The data was not saved.', {showProgressBar: false, timeOut: 5000, clickToClose: true});

    });

  }


  updateXrdrun(key, value) {
    const params = {};
    params[key] = value;
    this.http.put(environment.apiUrl +  '/instrument/xrd/run/'  + this.data.run.data.id + '?filterSpinner', params)
    .subscribe(response => {

      this.notification.success('Success', 'This field was updated', {showProgressBar: false, timeOut: 2000, clickToClose: true});
      // refresh semrun table using service
      this.refreshDBTableService.refreshXrdTable(true);
      this.dialogRef.close();
      // Sanitized logo returned from backend
    },
    error => {
                this.notification.error('Error', 'The data was not saved.', {showProgressBar: false, timeOut: 5000, clickToClose: true});

    });


  }


}
