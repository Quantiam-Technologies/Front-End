import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MatLegacyDialog as MatDialog, MatLegacyDialogRef as MatDialogRef, MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';

import { MaterialLotContainerService } from '../../services/material-lot-container/material-lot-container.service';
import { MaterialService } from '../../services/material/material.service';

import { WebsocketService } from '../../services/websocket/websocket.service';

export interface DialogData {
  animal: string;
  name: string;
}


@Component({
  selector: 'app-sgx-creation-dialog',
  templateUrl: './sgx-creation-dialog.component.html',
  styleUrls: ['./sgx-creation-dialog.component.css']
})
export class SgxCreationDialogComponent implements OnInit, OnDestroy {

    scannedObj: any;
    selectedContainers = [] as any;
    _ws: any;
    allowedScannerPrefixes = ['QCID', 'SGX'];

     sampleTypeList = ['5 % H2 Treatment (furnace)', 'Sintered Pellet', 'Carbon Impregnation', 'Post Cracking', 'Pellet Reduction', 'Carbon Physical Mixture'];

     selected_type;

    private gridApi;
    private gridColumnApi;
    private cellOldValue;



     ColumnDefs = [
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
      {headerName: 'Formula Weight', field: 'lot.material.formula_weight', editable: true},
      {headerName: 'Mols', editable: true, field: 'mols', type: 'numericColumn'  },
      {headerName: 'Calculated', editable: true, field: 'calculated', type: 'numericColumn'  },
      {headerName: 'Actual', editable: true,  field: 'actual', type: 'numericColumn' },
    ];

     DefaultColDef = {
    // maxWidth:120,
      suppressSorting: true,
      suppressMenu: true,
      cellStyle: function (params) {
        return {
          cursor: 'pointer',
        };
      },

    };

    constructor(
      public dialogRef: MatDialogRef<SgxCreationDialogComponent>,
      private websocket: WebsocketService,
      private materialLotContainer: MaterialLotContainerService,
      private material: MaterialService,
      ) {}




      ngOnInit() {

        this.websocket.redirectOnScan = false;
        this._ws = this.websocket.observable.subscribe((r) => {


          if (r.type === 'Scanner') {
            // take scanned data and add it to the container.
                // Fetch container add to table array
                console.log(r.data);
                this.materialLotContainer.fetch(r.data).subscribe((container: any) => {

                  this.selectedContainers.push(container);
                  this.gridApi.setRowData(this.selectedContainers);
                  console.log(container, this.selectedContainers);
                });

          }
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

      }

}
