import { Component, OnInit, Input } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import {  environment} from '../../../environments/environment';
import { NotificationsService } from 'angular2-notifications';
import { ColDef } from 'ag-grid-community';
import * as _moment from 'moment';

 

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.css']
})
export class LogsComponent implements OnInit {


  @Input() selectedRouteParams: any = [{timesheet: 65}, {timesheet: 60}]; // default value, object or ID
  @Input() showDates = true; 

  constructor(   private http: HttpClient,
    private notification: NotificationsService, ) { }

  rowData: [];

   
   editable = false;
   title = '';

    endDate;
    startDate;

   gridApi;
   gridColumnApi;
   pageSizes = [20, 25, 50, 100, 200];
   rowModelType;
   rowSelection;
   maxBlocksInCache;
   cacheBlockSize;
   timeoutTextFilter;
   filteredTextFilterName;

   frameworkComponents;

   totalRows;

   gridOptions:any = {
    rowSelection: 'single',
    cacheBlockSize: 20,
    enableRangeSelection: true,
    // maxBlocksInCache: 2,
   // enableServerSideFilter: false,
   // enableServerSideSorting: false,
    rowModelType: 'serverSide',
    pagination: true,
    maxConcurrentDatasourceRequests: 1,
     paginationPageSize: 20,
    // paginationAutoPageSize: true
  };


  columnDefs: ColDef[] = [
    {
      headerName: 'Action ID',
      field: 'id',
      hide: true,
      maxWidth: 100,
      filter: false,
      editable: false,
    },

    {
      headerName: 'Time',
      field: 'time',
      maxWidth: 150,
      editable: false,
    },

    {
      headerName: 'Method',
      field: 'method',
      maxWidth: 100,
      editable: false,
    },
    {
      headerName: 'User',
      field: 'id_plus_name',
      maxWidth: 150,
      editable: false,
    },
    {
      headerName: 'path',
      field: 'path',
      hide: true,
      maxWidth: 150,
      editable: false,
    },
    {
      headerName: 'Data',
      field: 'payload',
      editable: false,
      cellRenderer: (cell) => {
        if (cell.hasOwnProperty('data') && cell.data.payload) { return JSON.stringify(cell.data.payload); }
        return '';
      }
    },
    {
      headerName: 'route_parameters',
      field: 'route_parameters',
      editable: false,
      hide: true,
    },
    {
      headerName: 'comment',
      field: 'comment',
      width: 100,
      editable: false,
      hide: true,
    },

  ];

  defaultColDef =  {};


  ngOnInit() {
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    const datasource = this.fetchDatabase();

    params.api.setServerSideDatasource(datasource); // datasource needs to be a serverSide model

  }

  fetchDatabase () {

    return {
      getRows: (params2: any) => {
        console.log(params2);
        const page = (this.gridApi.paginationGetCurrentPage() + 1);

        let requestParams: HttpParams = new HttpParams()
        .append('limit', `${this.gridOptions.cacheBlockSize}`)
        .append('page', `${page}`);

      if (this.startDate) {
        requestParams = requestParams.append('startDate', `${_moment(this.startDate).format('YYYY-MM-DD')}`);
      }
      if (this.endDate) {
        requestParams = requestParams.append('endDate', `${_moment(this.endDate).add(1,'days').format('YYYY-MM-DD')}`);
      } else {
        requestParams = requestParams.append('endDate', `${_moment().add(1,'days').format('YYYY-MM-DD')}`);
      }
        this.selectedRouteParams.forEach((obj) => {

            Object.keys(obj).forEach(key => {

              this.title = this.title + key + ' - ' + obj[key] + ' ';
              requestParams = requestParams.append(key, obj[key]); // this doesn't work for the multiple of the same type of object 
              console.log(key, obj[key]);
          });
            console.log(obj);
        });

          this.http.get(environment.apiUrl + '/api/logs', {params: requestParams}).subscribe((response: any) => {

               params2.successCallback(response.data, response.total);
               this.totalRows = response.total;
              this.gridApi.sizeColumnsToFit();
             ///  console.log(params2);
          });

      }
    };

  }

  refreshDatabase() {

    const datasource = this.fetchDatabase();
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
    // this.refreshDatabase();

  }



}
