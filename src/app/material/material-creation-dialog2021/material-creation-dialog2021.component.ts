import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { ErrorStateMatcher } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MaterialLotContainerService } from '../../services/material-lot-container/material-lot-container.service';
import { MaterialLotService } from '../../services/material-lot/material-lot.service';
import { MaterialService } from '../../services/material/material.service';
import { MaterialLotContainerDatatableService } from '../services/material-lot-container-datatable.service';
import { MatStepper } from '@angular/material/stepper';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import { LocationService } from '../../services/location/location.service';
import { WebsocketService } from '../../services/websocket/websocket.service';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { NotificationsService } from 'angular2-notifications';
import { MatDialog } from '@angular/material/dialog'; 
import { MaterialHazardSymbolSelectorComponent } from '../material-hazard-symbol-selector/material-hazard-symbol-selector.component';
import { MaterialCheckCreationDialogComponent } from '../material-check-creation-dialog/material-check-creation-dialog.component';

import { MaterialLotContainer } from '../../shared/models/material-lot-container.model';
import { MaterialLot } from '../../shared/models/material-lot.model';
import { Material } from '../../shared/models/material.model';

import * as _moment from 'moment';


@Component({
  selector: 'app-material-creation-dialog2021',
  templateUrl: './material-creation-dialog2021.component.html',
  styleUrls: ['./material-creation-dialog2021.component.css']
})
export class MaterialCreationDialog2021Component implements OnInit {

  isLinear = true;
  materialFormGroup: UntypedFormGroup;
  lotFormGroup: UntypedFormGroup;
  containerFormGroup: UntypedFormGroup;
  sdsFormGroup: UntypedFormGroup;
  qcidFormGroup: UntypedFormGroup;

  creatingNewMaterial = false;
  searchedMaterial = false;

  filteredTextFilterName;

 
  displayedColumns: string[] = ['id','name', 'grade', 'particle', 'purity','container_count','actions'];

  supplierMaterials = []; // MAterial Objects

    constructor(
      private fb: UntypedFormBuilder,
      public dialogRef: MatDialogRef < MaterialCreationDialog2021Component > ,
      @Inject(MAT_DIALOG_DATA) data,
      private materialLotContainerService: MaterialLotContainerService,
      private materialService: MaterialService,
      private materialLotService: MaterialLotService,
      private websocket: WebsocketService,
      public router: Router,
      private materialLotContainerDatatable: MaterialLotContainerDatatableService,
      private locationService: LocationService,
      private _formBuilder: UntypedFormBuilder,
      private notification: NotificationsService,
  private http: HttpClient,
  public dialog: MatDialog,
  ) {}


  ngOnInit(): void {

    this.materialFormGroup = this._formBuilder.group({
      supplier_id: ['', Validators.required]
  });
  this.lotFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
  });
  this.containerFormGroup = this._formBuilder.group({
      thirdCtrl: ['', ],
      thirdCtrl2: ['', Validators.required],
      thirdCtrl3: ['', Validators.required],
      thirdCtrl4: ['', Validators.required],
      thirdCtrl5: ['', ],
      thirdCtrl6: ['', Validators.required],
      thirdCtrl7: ['', ],
      thirdCtrl8: ['', ],
  });

  this.sdsFormGroup = this._formBuilder.group({
    fourthCrtl: ['', Validators.required],

  });
  }

    selectSupplier(obj) {            
        if (typeof(obj) !== 'undefined') {
            this.materialFormGroup.setValue({'supplier_id': obj.supplier_id});
        }
        this.loadMaterialsFromSupplier();        
    }

    clearSupplier(){

        this.materialFormGroup.setValue({'supplier_id': null});

  }

  loadMaterialsFromSupplier()
  {
    let params = new HttpParams()
    .set("supplier_id",this.materialFormGroup.get('supplier_id').value);

    this.http.get(environment.apiUrl + '/material', { params: params} )
    .subscribe( (response:any) => {

      this.supplierMaterials = response.data;

    });
    
  }

  onFilterChanged()
  {

  }

}