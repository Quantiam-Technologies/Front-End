import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MatLegacyDialog as MatDialog, MatLegacyDialogRef as MatDialogRef, MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';

import { MaterialLotContainerService } from '../../services/material-lot-container/material-lot-container.service';
import { MaterialService } from '../../services/material/material.service';

import { WebsocketService } from '../../services/websocket/websocket.service';

import { NotificationsService } from 'angular2-notifications';

export interface DialogData {
  animal: string;
  name: string;
}

export interface Sample {

  name: string;
  experiment: number;
  sample_experiment_type: number;
}


@Component({
  selector: 'app-sample-creation-dialog',
  templateUrl: './sample-creation-dialog.component.html',
  styleUrls: ['./sample-creation-dialog.component.css']
})



export class SampleCreationDialogComponent implements OnInit, OnDestroy {

  constructor(
    public dialogRef: MatDialogRef<SampleCreationDialogComponent>,
    private websocket: WebsocketService,
    private materialLotContainer: MaterialLotContainerService,
    private material: MaterialService,
    private notification: NotificationsService,
    ) {}


  saveSample;
  scannedObj: any;
  selectedContainers = [] as any;
  _ws: any;
  allowedScannerPrefixes = ['QCID', 'SGX'];
   sampleTypeList = ['5 % H2 Treatment (furnace)', 'Sintered Pellet', 'Carbon Impregnation', 'Post Cracking', 'Pellet Reduction', 'Carbon Physical Mixture'];
   newSample:any = { 'name': null, 'experiment': null, 'sample_experiment_type': null, 'experiment_sample': null };
   selectedExperiment = { has_materials: false, id: null, abbrev: null, next_sample: null };

   selected_type;
   gridApi;
   gridColumnApi;
   cellOldValue;
   randomNumber;
   selectedRowObj;

  // Toggles
   weighAfterScanning = true;
   listenToSelectedScale;


  ColumnDefs = [
    {headerName: 'ID', field: 'id',  maxWidth: 80,  },
    {
      headerName: 'Chemical',
      maxWidth: 250,
      cellRenderer: function(event) {
        // console.log(container);
        return '<b style="margin-right:5px;">' + event.data.lot.material.name + '</b><small>' + event.data.lot.material.grade + '</small>';
      },
    },
    {headerName: 'Lot', field: 'lot.lot_name',  maxWidth: 150,  },
    {headerName: 'Size', maxWidth: 100,  cellRenderer: function(event) {

      return event.data.amount_ordered + ' ' + event.data.denomination;

    } },
    {headerName: 'Formula Weight (g/mol)', field: 'lot.material.formula_weight', editable: true},
    {headerName: 'Mols (mol)', editable: true, field: 'mols', type: 'numericColumn'  },
    {headerName: 'Mass (g)', editable: true, field: 'mass', type: 'numericColumn'  },
   /* {headerName: 'Actual', editable: false,  field: 'actual', cellRenderer: function(params){

     // console.log(params);
      const USL = params.data.mass + 0.1;
      const LSL = params.data.mass - 0.1;

      if(params.value > USL || params.value < LSL ) return '<button type="button" class="btn btn-danger">'+params.value+' g</button>';

     // return '<button type="button" class="btn btn-success" onclick="unSelectRow()">'+params.value+'</button>';
     //console.log(this);
      return '<div class="input-group mb-3">\
      <input type="text" class="form-control" placeholder="Scale Value" aria-label="" aria-describedby="basic-addon2" value="'+params.value+'">\
      <div class="input-group-append">\
        <span class="input-group-text" id="basic-addon2">SGX</span>\
      </div>\
     </div>';


    }},*/
    {headerName: 'Measured', editable: true,  field: 'actual', type: 'numericColumn'},

  ];

  public DefaultColDef = {
  // maxWidth:120,
    suppressSorting: true,
    suppressMenu: true,
    cellStyle: function (params) {
      return {
        cursor: 'pointer',
      };
    },

  };



    ngOnInit() {

      this.websocket.redirectOnScan = false;

      setInterval((x) => {

        this.updateSelectedRowScaleValue();

      }, 200);


      // subscribe to scanner events
      this._ws = this.websocket.scannerEvents.subscribe((r) => {
             // take scanned data and add it to the container.
              // Fetch container add to table array
              console.log(r.data);
              this.materialLotContainer.fetch(r.data).subscribe((container: any) => {


                this.addContainerToTable(container);

              });
      });

    }

    ngOnDestroy() {
       this.websocket.redirectOnScan = true;
      this._ws.unsubscribe();
    }

    addContainerFromSelectList(event) {
      this.selectedContainers.push(event);
    }





    onGridReady(params) {
      this.gridApi = params.api;
      this.gridColumnApi = params.columnApi;
      setTimeout(() => {  this.gridApi.sizeColumnsToFit(); }, 200);
    }

    onCellEditingStarted(event) {
      console.log(event);
      this.cellOldValue = event.value;
    }


    onCellEditingStopped(event) {


      if (event.column.colId === 'lot.material.formula_weight') {
        const params = {'formula_weight': event.data.lot.material.formula_weight};
        this.material.updateMaterial(params, event.data.lot.material.id).subscribe();

      }

      if (event.column.colId === 'mass') {
        event.data.mols =  event.data.mass / event.data.lot.material.formula_weight;
        event.node.setData(event.data);

      }
      if (event.column.colId === 'mols') {

            event.data.mass = event.data.mols * event.data.lot.material.formula_weight;
            event.node.setData(event.data);
      }

    }

    materialContainerChanged(event) {
      if (event.id) {
        this.addContainerToTable(event);
      }
    }

    experimentChanged(event) {

      console.log(event);
      this.selectedExperiment = event;
      this.newSample.experiment_sample = this.selectedExperiment.abbrev + '-' + this.selectedExperiment.next_sample;

//
    }

    selectRow(event) {
      this.selectedRowObj = event;
    }
    unSelectRow() {
      this.selectedRowObj = null;
    }

    updateSelectedRowScaleValue() {
      if (this.selectedRowObj) {
       this.selectedRowObj.data.actual = Math.random();
       this.selectedRowObj.node.setData(this.selectedRowObj.data);
      }
    }

    addContainerToTable(container) {
      const testPresence = this.selectedContainers.find(function(obj, index) { // search containers that have the same ID
        return container.id === obj.id;
      });

      if (!testPresence) {
        container.mols = 1;
        container.rowId = container.id;
        this.selectedContainers.push(container);
        this.gridApi.setRowData(this.selectedContainers);
      } else {
        this.notification.error('Error', 'Container is already in the list.', {timeOut: 4000, showProgressBar: false, clickToClose: true});
      }

      console.log(this.gridApi);

      // get row ID for container and set as selected
      if (this.weighAfterScanning) {}
    }
}
