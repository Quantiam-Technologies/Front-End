import {  Component,  OnInit} from '@angular/core';
import {  HttpClient} from '@angular/common/http';
import {  Router } from '@angular/router';
import {  SampleService } from '../../services/sample/sample.service';


import { SampleCreationDialogComponent } from '../sample-creation-dialog/sample-creation-dialog.component';

import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';


import { AllModules  } from '@ag-grid-enterprise/all-modules';

@Component({
  selector: 'app-sample-database',
  templateUrl: './sample-database.component.html',
  styleUrls: ['./sample-database.component.css']
})
export class SampleDatabaseComponent implements OnInit {


   gridApi;
   gridColumnApi;
   rowData = [];

   columnDefs;
   defaultColDef;
   rowModelType;
   cacheBlockSize;
   maxBlocksInCache;
   getRowNodeId;
   icons;
   cellOldValue;

   modules = AllModules;

   sampleTypeList: any[] = ['5 % H2 Treatment (furnace)', 'Sintered Pellet', 'Carbon Impregnation', 'Post Cracking', 'Pellet Reduction', 'Carbon Physical Mixture'];


  constructor(
    private http: HttpClient,
    private router: Router,
    private sampleService: SampleService,
    public dialog: MatDialog

  ) {
    this.columnDefs = [{
        field: 'id',
        width: 100,
        headerName: 'ID',
        cellStyle: function (params) {
          return {
            cursor: 'pointer'
          };
        },
        editable: false,
      },
      {
        headerName: 'Project',
        field: 'project',
        width: 120
      },
      {
        headerName: 'Name',
        field: 'name',
        width: 300
      },
      {
        headerName: 'Experiment',
        field: 'experiment',
        width: 200
      },
      {
        headerName: 'Materials',
        field: 'container',
        editable: false,
        width: 120,
      },
      {
        headerName: 'Creator',
        field: 'created_by',
        editable: false,
        cellStyle: function (params) {
          return {
            cursor: 'pointer'
          };
        },
        valueGetter: function aPlusBValueGetter(params) {

          if (params.data.creator) { return params.data.creator.name; }
          return '';

        }
      },
      {
        field: 'created_at',
        editable: false,
        cellStyle: function (params) {
          return {
            cursor: 'pointer'
          };
        },
      },
      {
        field: 'created_at',
        headerName: 'Delete',
        editable: false,
        width: 130,
        cellStyle: function (params) {
          return {
            cursor: 'pointer'
          };
        },
        cellRenderer: function (params) {
          return '<button mat-button class="mat-button mat-warn" style="color:red;">Delete</button>';


        },
        onCellDoubleClicked: (params) => {

          this.deleteSample(params);

        }
      },
    ];


    this.defaultColDef = {
      // editable: true,
      sortable: true,
      resizeable: true,
      filter: true,
      suppressMenu: true,


    };


    this.rowModelType = 'serverSide';
    this.cacheBlockSize = 10;
    this.maxBlocksInCache = 2;
    this.getRowNodeId = function (item) {
      return item.id;
    };
    this.icons = {
      groupLoading: '<img src="https://raw.githubusercontent.com/ag-grid/ag-grid-docs/master/src/javascript-grid-server-side-model/spinner.gif" style="width:22px;height:22px;">'
    };
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    this.sampleService.sampleDatabase$.subscribe((r) => {


      if (r[0]) { this.rowData = r; }
      setTimeout(() => {  this.gridApi.sizeColumnsToFit(); }, 300);

    });
  }


  testChange(event) {
    console.log(event);
  }

  onCellDoubleClicked(event) {
    // console.log(event);
    if (event.column.colId === 'id') { this.router.navigate(['/sample/' + event.data.id]); }
    if (event.column.colId === 'created_at') { this.router.navigate(['/sample/' + event.data.id]); }
    if (event.column.colId === 'creator') { this.router.navigate(['/sample/' + event.data.id]); }
    if (event.column.colId === 'containers') { this.router.navigate(['/sample/' + event.data.id]); }
    if (event.column.colId === 'created_by') { this.router.navigate(['/sample/' + event.data.id]); }


  }


  onCellEditingStarted(event) {
    console.log(event);
    this.cellOldValue = event.value;
  }

  deleteSample(params) {

    if (confirm('Are you sure to delete this sample?')) {
      this.sampleService.delete(params.data.id).subscribe((r) => {
        this.rowData.splice(params.rowIndex, 1);
        this.gridApi.setRowData(this.rowData);


      });
    }
    // alert('test');
  }

  onCellEditingStopped(event) {

    if (this.cellOldValue !== event.value) {
      console.log(event);
      const params: any = {};
      params[event.column.colId] = event.value;
      this.sampleService.update(event.data.id, params).subscribe((r) => {

      });
    }
  }


  makeCellsEditable() {



  }

  onAddRow() {

    this.sampleService.create({}).subscribe((r) => {
      this.rowData.splice(0, 0, r);
      this.gridApi.setRowData(this.rowData);
      // 	this.gridApi.updateRowData({ add: [r] });


    });



  }


  openAddSampleDialog(): void {
    const dialogRef = this.dialog.open(SampleCreationDialogComponent, {
      height: '90%',
      width: '80%',
    // disableClose: true,
      autoFocus: true,
    // data: {name: this.name, animal: this.animal}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

    });
  }



  ngOnInit() {

    this.sampleService.getDatabase({});


  }



}
