import { Component, OnInit, OnDestroy } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import {  environment} from '../../../../environments/environment';

import {ICellRendererAngularComp} from 'ag-grid-angular';

import { NotificationsService } from 'angular2-notifications';

import { Router } from '@angular/router';


import { PopUpSteelCardServiceService } from '../../../shared/pop-up-steel-card/pop-up-steel-card-service.service';

@Component({
  selector: 'app-ag-grid-sem-container-steel-cell-display',
  templateUrl: './ag-grid-sem-container-steel-cell-display.component.html',
  styleUrls: ['./ag-grid-sem-container-steel-cell-display.component.css']
})
export class AgGridSemContainerSteelCellDisplayComponent implements ICellRendererAngularComp, OnDestroy  {

  params: any;
  showEditIcon = false;
  showTrash = false;

  constructor(private router: Router,
     public steelPopUp: PopUpSteelCardServiceService,
      private http: HttpClient,
      private notification: NotificationsService
      ) {}


  refresh() {
    return false;
  }

  agInit(params: any): void {
  //  console.log(params);

    this.params = params;

  }
  afterGuiAttached?(): void {
    throw new Error('Method not implemented.');
  }

  goToSteel(params) {

    this.router.navigate(['/steel/' + params.data.steel_id]);
    this.steelPopUp.hide();
  }

  goToContainer(params) {
    this.router.navigate(['/material/container/' + params.data.container_id]);

  }

  deleteThis(params) {
    confirm('Are you sure?');
    {
      if (params.data.steel_id) {
        // delete Steel
        this.updateSemRun(params.data, {steel_id: null});
        params.data.steel_id = null;
      }

      if (params.data.container_id) {
        // delete container_id
        this.updateSemRun(params.data, {container_id: null});
        params.data.container_id = null;
      }
    }

    this.showTrash = false;

  }

  updateSemRun(run, params: any = {}) {

       console.log(run);
      let instrument = 'sem';
      let id = run.semrun_id;
      if (run.hasOwnProperty('xrd_analysis')) { instrument = 'xrd'; id = run.id; }


     console.log(params);

      this.http.put(environment.apiUrl + '/instrument/' + instrument + '/run/' + id + '?filterSpinner', params)
     .subscribe(response => {

       this.notification.success('Success', 'This field was updated', {showProgressBar: false, timeOut: 2000, clickToClose: true});
       // Sanitized logo returned from backend
     },
     error => {
                 this.notification.error('Error', error.error.error, {showProgressBar: false, timeOut: 5000, clickToClose: true});

     });


   }

  ngOnDestroy() {

  }
}
