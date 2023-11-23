import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import {  environment} from '../../../environments/environment';
import { NotificationsService } from 'angular2-notifications';
import { RefreshDBTablesService } from '../../services/refresh-db-tables/refresh-dbtables.service';


import { AgGridSemContainerSteelCellDisplayComponent } from '../../sem/sem-database/ag-grid-sem-container-steel-cell-display/ag-grid-sem-container-steel-cell-display.component';
import { AgGridSemContainerSteelEditComponent } from '../../sem/sem-database/ag-grid-sem-container-steel-edit/ag-grid-sem-container-steel-edit.component';

import { ServerSideRowModelModule } from '@ag-grid-enterprise/server-side-row-model';

import { AgGridSelectProjectEditorComponent } from '../../shared/ag-grid-select-project/ag-grid-select-project.component';
import { XrdAnalysesFileRendererComponent } from './xrd-analyses-file-renderer/xrd-analyses-file-renderer.component';

@Component({
  selector: 'app-xrd-database',
  templateUrl: './xrd-database.component.html',
  styleUrls: ['./xrd-database.component.css']
})
export class XrdDatabaseComponent implements OnInit {

   gridApi;
   gridColumnApi;

   public modules: any[] = [
    ServerSideRowModelModule 
];

   pageSizes = [20, 25, 50, 100];


   columnDefs;
   defaultColDef;
   rowData: [];

   gridOptions;
   rowModelType;
   rowSelection;
   maxBlocksInCache;
   cacheBlockSize;

   filteredOperator = '';
   filteredRequestor = '';
   filteredSampleType = '';
   filteredProject = '';
   filteredTextFilterName = '';
   timeoutTextFilter;

   totalRows;

    frameworkComponents = {
    projectEditor: AgGridSelectProjectEditorComponent,
    analysesRenderer: XrdAnalysesFileRendererComponent,
    steelContainerDisplay: AgGridSemContainerSteelCellDisplayComponent,
    steelContainerEdit: AgGridSemContainerSteelEditComponent,

  };

  constructor(private http: HttpClient, private notification: NotificationsService,
    private refreshDBTableService: RefreshDBTablesService) {

    refreshDBTableService.refreshXrdDBTable$.subscribe(refresh => {

      if (refresh) {
        this.refreshDatabase();
      }
  });

    this.columnDefs = [
      {
        headerName: 'ID',
        field: 'id',
        width: 50,
        hide: true,
      },
      {
        headerName: '',
        field: 'instrument_name',
        width: 50,
        hide: true,
      },
      {
        headerName: 'Run',
        field: 'name',
        width: 100,
      },
      {
        headerName: 'Project',
        field: 'project_id',
        width: 70,
        editable: true,
        cellEditor: 'projectEditor',
      },
      {
        headerName: 'Steel / Container / Sample',
        // field: 'id',
        width: 150,
        editable: true,
        cellRenderer: 'steelContainerDisplay',
        cellEditor: 'steelContainerEdit',
        valueSetter: (params) => {


           if (params.newValue) {
            if (params.newValue.container_id) {
              params.data.container = params.newValue;
              params.data.container_id = params.newValue.container_id;
             }

            if (params.newValue.steel_type) {
              params.data.steel = params.newValue;
              params.data.steel_id = params.newValue.id;
             }

             this.updateXRDRun(params);
            console.log(params);
            return params.newValue;

          }
          return null;
        },
      },
      {
        headerName: 'Sample Name',
        field: 'sample_name',
        width: 400,
      },
      {
        headerName: 'Type',
        field: 'type.name',
        width: 100,
      },


     /*  {
        headerName: 'File Name',
        field: 'path',
        width: 200,
        cellRenderer: (cell) =>{
          let filename =  cell.data.path.split('\\').pop().split('/').pop();
          return filename;
        }

      }, */
      {
        headerName: 'Operator',
        field: 'operator',
        width: 100,
      },
      {
        headerName: 'Requested By',
        field: 'requestor',
        width: 100,
      },
      {
        headerName: 'Duration',
        field: 'duration',
        width: 100,
        cellRenderer: (cell) => {

            let duration;

          if (cell.data.duration) {
             duration =  '~' + (cell.data.duration / 60).toFixed(1) + ' mins';
          }

          return duration;
        }
      },
       {
        headerName: 'Analyses',
        field: 'xrd_runs',
        width: 80,
        cellRenderer: 'analysesRenderer',
      },
      {
        headerName: 'Run Date',
        field: 'analyzed_date',
        width: 150,
      },

    ];

    this.defaultColDef = {
      filter: false,
      sorting: true,
      resizable: true,
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


 }

ngOnInit() {
}

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

      console.log(params.api);

    const datasource = this.fetchDatabase();

    params.api.setServerSideDatasource(datasource); // datasource needs to be a serverSide model

  }


  fetchDatabase () {

    return {
      getRows: (params2: any) => {

        const page = (this.gridApi.paginationGetCurrentPage() + 1);

        const requestParams: HttpParams = new HttpParams()
        .append('limit', `${this.gridOptions.cacheBlockSize}`)
        .append('like', `${this.filteredTextFilterName}`)
        .append('page', `${page}`)
        .append('requestor', `${this.filteredRequestor}`)
        .append('operator', `${this.filteredOperator}`)
        .append('project', `${this.filteredProject}`);
       // .append('type', `${this.filteredSemrun}`);


          this.http.get(environment.apiUrl + '/instrument/xrd/run', {params: requestParams}).subscribe((response: any) => {

              params2.successCallback(response.data, response.total);
              this.totalRows = response.total;
              this.gridApi.sizeColumnsToFit();
            //  console.log(params2);
          });

      }
    };

  }

  onTextFilterChanged() {
      clearTimeout(this.timeoutTextFilter);
      this.timeoutTextFilter = setTimeout((x) => {

            console.log('test');
            const datasource = this.fetchDatabase();
            this.gridApi.setServerSideDatasource(datasource);
      }, 800 );

  }



  refreshDatabase() {

    const datasource = this.fetchDatabase();
    this.gridApi.setServerSideDatasource(datasource);
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


  filterRequestor(event) {
    if (event) { this.filteredRequestor = event.id; } else { this.filteredRequestor = ''; }
    this.refreshDatabase();
  }

  clearFilterRequestor(event) {
     this.filteredRequestor = '';
     this.refreshDatabase();
  }

  updateXRDRun (cell) {


    const params: any = {};
    if (cell.column.colId === 'requestor') { params.requested_by = cell.data.requestor.id; }
    if (cell.column.colId === 'operator') { params.operator_id = cell.data.operator.id; }
   // if (cell.column.colId === 'project_id') { params.project_id = cell.value; }
    if (cell.column.colId === 'run_type_id') { params.type_id = cell.data.type.type_id; }
    //  if (cell.column.colId === 'duration') { params.duration = cell.value; }
    if (cell.column.colId === '0') {
      if ( cell.data.container ) { params.container_id = cell.data.container_id; }
      if ( cell.data.steel_id ) { params.steel_id = cell.data.steel_id; }
    }

    this.http.put(environment.apiUrl + '/instrument/xrd/run/' + cell.data.id + '?filterSpinner', params)
    .subscribe(response => {

      this.notification.success('Success', 'This field was updated', {showProgressBar: false, timeOut: 2000, clickToClose: true});
      // Sanitized logo returned from backend
    },
    error => {
                this.notification.error('Error', error.error.error, {showProgressBar: false, timeOut: 5000, clickToClose: true});

    });

  }

}


