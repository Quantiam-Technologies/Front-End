import { Component, OnInit } from '@angular/core';
import { SemDatabaseService } from './sem-database.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import {  environment} from '../../../environments/environment';
import { Router } from '@angular/router';
import { RefreshDBTablesService } from '../../services/refresh-db-tables/refresh-dbtables.service';


import { NotificationsService } from 'angular2-notifications';

import { AgGridSelectProjectEditorComponent } from '../../shared/ag-grid-select-project/ag-grid-select-project.component';
import { AgGridSelectUserComponent } from '../../shared/ag-grid-select-user/ag-grid-select-user.component';
import { AgGridSemTypeComponent } from './ag-grid-sem-type/ag-grid-sem-type.component';
import { AgGridDurationComponent } from '../../shared/ag-grid-duration/ag-grid-duration.component';
import { AgGridSemContainerSteelCellDisplayComponent } from './ag-grid-sem-container-steel-cell-display/ag-grid-sem-container-steel-cell-display.component';
import { AgGridSemContainerSteelEditComponent } from './ag-grid-sem-container-steel-edit/ag-grid-sem-container-steel-edit.component';

import { ServerSideRowModelModule } from '@ag-grid-enterprise/server-side-row-model';

import { SettingsService } from '../../services/settings/settings.service';

 

@Component({
  selector: 'app-sem-database',
  templateUrl: './sem-database.component.html',
  styleUrls: ['./sem-database.component.css']
})
export class SemDatabaseComponent implements OnInit {

   gridApi;
   gridColumnApi;
    
   pageSizes = [20, 25, 50, 100, 200];


      public modules: any[] = [
        ServerSideRowModelModule 
    ];

   columnDefs;
   defaultColDef;
   rowData: [];

   editable = false;

   gridOptions;
   rowModelType;
   rowSelection;
   maxBlocksInCache;
   cacheBlockSize;
   oldCellValue;

   filteredOperator = '';
   filteredRequestor = '';
   filteredContainer = '';
   filteredSteel = '';
   filteredSampleType = '';
   filteredProject = '';
   filteredTextFilterName = '';
   filteredSemrun = '';
   timeoutTextFilter;

   components;

   totalRows;


   componentSettings = {

    autoRefreshTable: false,
   };


  constructor(
    private semDatabaseService: SemDatabaseService,
    private http: HttpClient,
    private notification: NotificationsService,
    public router: Router,
    private settings: SettingsService,
    private refreshDBTableService: RefreshDBTablesService
  ) {

    refreshDBTableService.refreshSemDBTable$.subscribe(refresh => {

        if (refresh) {
          this.refreshDatabase();
        }
    });



      this.columnDefs = [
        {
          headerName: 'ID',
          field: 'id',
          width: 100,
          hide: true,
          filter: false,
          editable: false,
        },
        {
          headerName: 'SEM',
          field: 'sem',
          width: 80,
          hide: true,
          filter: true,
          editable: false,
        },
        {
          headerName: 'ID',
          field: 'semrun_id',
          width: 60,
          filter: false,
          editable: false,
        },
        {
          headerName: 'Project',
          field: 'project_id',
          width: 60,
          filter: false,
          cellEditor: 'projectEditor',
        },
        {
          headerName: 'Steel / Container / Sample',
          // field: 'id',
          width: 150,
          cellRenderer: 'steelContainerDisplay',
          cellEditor: 'steelContainerEdit',
          valueSetter: (params) => {


             if (params.newValue) {
              console.log(params.newValue);
              if (params.newValue.container_id) {
                params.data.container = params.newValue;
                params.data.container_id = params.newValue.container_id;
               }

              if (params.newValue.steel_type) {
                params.data.steel = params.newValue;
                params.data.steel_id = params.newValue.id;
               }

               this.updateSemRun(params);

              return params.newValue;

            }
            return null;
          },
        },
        {
          headerName: 'Sample Name',
          field: 'samplename',
          minwidth: 270,
          filter: false,
          cellRenderer: (cell) => {
            // console.log(cell);
            if (cell.hasOwnProperty('data') && cell.data.samplename) { return '<b>' + cell.data.samplename + '</b>'; }
            return '';
          }
        },
        {
          headerName: 'Type',
          field: 'type',
           width: 120,
          filter: true,
          cellEditor: 'typeEditor',
          cellRenderer: (cell) => {
            if (cell.hasOwnProperty('data') && cell.data.type) { return cell.data.type.type; }
            return '';
          }
        },
        {
          headerName: 'Operator',
          field: 'operator',
          width: 70,
          filter: true,
          cellEditor: 'userEditor',

          cellRenderer: (cell) => {

            if (cell.hasOwnProperty('data') && cell.data.operator) { return cell.data.operator.name_abbrev; }
            return '';
          }
        },
        {
          headerName: 'Requested',
          field: 'requestor',
          width: 70,
          filter: true,
          cellEditor: 'userEditor',

          cellRenderer: (cell) => {
           // console.log(cell);
            if (cell.hasOwnProperty('data') && cell.data.requestor) { return cell.data.requestor.name_abbrev; }
            return '';
          }
        },
        {
          headerName: 'Duration',
          field: 'duration',
          width: 80,
          filter: false,
         // editable: false,
          cellEditor: 'durationEditor',
          cellRenderer: (cell) => {



             if (cell.hasOwnProperty('data') && cell.data.duration) {

                let minutes = (cell.data.duration / 60);

                if (minutes > 60) {
                    minutes = (minutes / 60);
                    return '~' + minutes.toFixed(2) + ' Hours';
                }
                return '~' + minutes.toFixed() + ' Mins';
             }
             return '';
           }
        },
        {
          headerName: 'Date',
          field: 'date_created',
         // width: 100,
          filter: false,
          editable: false,
        },
        {
          headerName: 'View',
          field: 'id',
          width: 60,
          filter: false,
          editable: false,
          onCellClicked: (cell ) => {

            if (cell.data) {
              this.router.navigate(['/sem/run/' + cell.data.semrun_id]);
             }
            //  console.log('worked');

          },
          cellRenderer: function(cell) {

            // console.log(cell);
             if (cell.value) {
               return '<p style="color:green; cursor:pointer;">View</p>';
             }


             return '';
           },
        },

      ];

      this.defaultColDef = {
        filter: true,
        sorting: true,
        editable: true,
       };



      this.gridOptions = {
        rowSelection: 'single',
        cacheBlockSize: 20,
        enableRangeSelection: true,
        // maxBlocksInCache: 2,
       // enableServerSideFilter: false,
       // enableServerSideSorting: false,
        rowModelType: 'serverSide',
        serverSideStoreType: 'partial',
        pagination: true,
        maxConcurrentDatasourceRequests: 1,
        paginationPageSize: 20,
        // paginationAutoPageSize: true
      };

      this.components = {
        projectEditor: AgGridSelectProjectEditorComponent,
        userEditor: AgGridSelectUserComponent,
        typeEditor: AgGridSemTypeComponent,
        durationEditor: AgGridDurationComponent,
        steelContainerDisplay: AgGridSemContainerSteelCellDisplayComponent,
        steelContainerEdit: AgGridSemContainerSteelEditComponent,
      };
   }

  ngOnInit() {

     this.settings.get(this.constructor.name) ? this.componentSettings = this.settings.get(this.constructor.name) : this.settings.set(this.constructor.name, this.componentSettings);

    setInterval(() => {

      if (this.componentSettings.autoRefreshTable) { this.refreshDatabase(); }
    }, 60000);
  }


  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    //  console.log(params.api);

    const datasource = this.fetchSemDatabase();

    params.api.setServerSideDatasource(datasource); // datasource needs to be a serverSide model

  }


  fetchSemDatabase () {

    return {
      getRows: (params2: any) => {
        console.log(params2);
        const page = (this.gridApi.paginationGetCurrentPage() + 1);

        const requestParams: HttpParams = new HttpParams()
        .append('limit', `${this.gridOptions.cacheBlockSize}`)
        .append('like', `${this.filteredTextFilterName}`)
        .append('requestor', `${this.filteredRequestor}`)
        .append('operator', `${this.filteredOperator}`)
        .append('project', `${this.filteredProject}`)
        .append('type', `${this.filteredSemrun}`)
        .append('steel_id', `${this.filteredSteel}`)
        .append('container_id', `${this.filteredContainer}`)
        .append('page', `${page}`);

          this.http.get(environment.apiUrl + '/instrument/sem/run', {params: requestParams}).subscribe((response: any) => {

               params2.successCallback(response.data, response.total);
              // this.gridOptions.rowCount = response.total;
            //   this.totalRows = response.total;
               this.gridApi.sizeColumnsToFit();
             ///  console.log(params2);
          });

      }
    };

  }

  refreshDatabase() {

    const datasource = this.fetchSemDatabase();
    this.gridApi.setServerSideDatasource(datasource);
  }

  onTextFilterChanged() {
      clearTimeout(this.timeoutTextFilter);
      this.timeoutTextFilter = setTimeout((x) => {

              this.refreshDatabase();
      }, 500 );

  }

  onPageSizeChanged() {
    this.gridOptions.paginationPageSize = this.gridOptions.cacheBlockSize;
    this.refreshDatabase();

  }

  filterProject(event) {
    if (event) {  this.filteredProject = event.id; } else { this.filteredProject = ''; }
      this.refreshDatabase();
  }
  clearFilterProject(event) {
     this.filteredProject = '';
     this.refreshDatabase();
  }


  filterOperator(event) {
    if (event) { this.filteredOperator = event.id; } else { this.filteredOperator = ''; }

      this.refreshDatabase();
  }

  clearFilterOperator(event) {
     this.filteredOperator = '';
     this.refreshDatabase();
  }

  filterSteel(event) {
    if (event) { this.filteredSteel = event.id; } else { this.filteredSteel = ''; }

      this.refreshDatabase();
  }

  clearFilterSteel(event) {
     this.filteredSteel = '';
     this.refreshDatabase();
  }

  filterContainer(event) {
    if (event) { this.filteredContainer = event.id; } else { this.filteredContainer = ''; }

      this.refreshDatabase();
  }

  clearFilterContainer(event) {
     this.filteredContainer = '';
     this.refreshDatabase();
  }


  filterRequestor(event) {
    if (event) { this.filteredRequestor = event.id; } else { this.filteredRequestor = ''; }
    this.refreshDatabase();
  }

  clearFilterRequestor(event) {
     this.filteredRequestor = '';
     this.refreshDatabase();
  }

  filterSemrun(event) {
    if (event) {  this.filteredSemrun = event.type_id; } else { this.filteredSemrun = ''; }
    this.refreshDatabase();
  }

  clearFilterSemrun(event) {
     this.filteredSemrun = '';
     this.refreshDatabase();
  }

  onCellEditingStopped($event) {

    let value = $event.value;
    if (value === '') { value = null; }
    if (this.oldCellValue !== value ) {
      this.updateSemRun($event);
     }
     return;
  }
  onCellEditingStarted($event) {

      //  console.log($event);
        this.oldCellValue = $event.value;
        return;


  }

  updateSemRun(cell) {

   // console.log(cell);

    const params: any = {};

    console.log(cell);

    if (cell.column.colId === 'requestor') { params.requested_by = cell.data.requestor.id; }
    if (cell.column.colId === 'operator') { params.operator_id = cell.data.operator.id; }
    if (cell.column.colId === 'project_id') { params.project_id = cell.value; }
    if (cell.column.colId === 'samplename') { params.samplename = cell.value; }
    if (cell.column.colId === 'type') { params.type_id = cell.data.type.type_id; }
    if (cell.column.colId === 'duration') { params.duration = cell.value; }
    if (cell.column.colId === '0') {
      if ( cell.data.container ) { params.container_id = cell.data.container_id; }
      if ( cell.data.steel_id ) { params.steel_id = cell.data.steel_id; }
    }

    console.log(params);

     this.http.put(environment.apiUrl + '/instrument/sem/run/' + cell.data.semrun_id + '?filterSpinner', params)
    .subscribe(response => {

      this.notification.success('Success', 'This field was updated', {showProgressBar: false, timeOut: 2000, clickToClose: true});
      // Sanitized logo returned from backend
    },
    error => {
                this.notification.error('Error', error.error.error, {showProgressBar: false, timeOut: 5000, clickToClose: true});

    });


  }

  toggleAutoUpdate() {

    this.componentSettings.autoRefreshTable = !this.componentSettings.autoRefreshTable;
    this.settings.set(this.constructor.name, this.componentSettings);

  }

  updateTimesheet()
  {
    
    this.http.get(environment.apiUrl + '/instrument/sem/run/process/durations')
    .subscribe(response => {

      this.notification.success('Success', 'The timesheet was updated and missing run durations calculated.', {showProgressBar: false, timeOut: 2000, clickToClose: true});
      this.refreshDatabase();
      // Sanitized logo returned from backend
    },
    error => {
                this.notification.error('Error', error.error.error, {showProgressBar: false, timeOut: 5000, clickToClose: true});

    });

  
  }


}


