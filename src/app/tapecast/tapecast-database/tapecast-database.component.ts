import { Component, OnInit } from '@angular/core';
import {  environment} from '../../../environments/environment';
import { AllModules  } from '@ag-grid-enterprise/all-modules';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { MatLegacyDialog as MatDialog, MatLegacyDialogConfig as MatDialogConfig, MatLegacyDialogRef as MatDialogRef } from '@angular/material/legacy-dialog';

@Component({
  selector: 'app-tapecast-database',
  templateUrl: './tapecast-database.component.html',
  styleUrls: ['./tapecast-database.component.css']
})
export class TapecastDatabaseComponent implements OnInit {

  private gridApi;
  private gridColumnApi;
   rowData: any = [{}, {}];

   modules = AllModules;

   rowModelType;
   rowSelection;
   maxBlocksInCache;
   cacheBlockSize;
   oldCellValue;

   timeoutTextFilter;
   components: any;
   statusBar: any;
   getRowNodeId;
   icons;
   cellOldValue;
   searchBarValue: string;
   frameworkComponents;
   totalRows;
   context;

   
   gridOptions;

  defaultColDef = {

    sortable: true,
    resizable: true,
    filter: false,
    cellStyle: function (params) {
      return {
        cursor: 'pointer',
      };
    },

  };


   columnDefs = [
    {
      field: 'id',
      width: 100,
      headerName: 'ID',

    },   
    {
      field: 'name',
      width: 100,
      headerName: 'Name',
    },
    {
      field: 'campaign.campaign_name',
      width: 100,
      headerName: 'Campaign',
    }, 

    {
      field: 'profile.name',
      width: 100,
      headerName: 'Profile',
    }, 
      {
      field: 'profile.table_name',
      width: 100,
      headerName: 'Table',
    }, 
    
    {
      field: 'airflow_start_time',
      width: 100,
      headerName: 'Run Started',
    },
    
    {
      field: 'time_removed_from_table',
      width: 100,
      headerName: 'Run Ended',
    },

  ]


  constructor( private dialog: MatDialog, private http: HttpClient, public router: Router, private route: ActivatedRoute,) { 

this.gridOptions =  {
  rowSelection: 'single',
  cacheBlockSize: 18,
  enableRangeSelection: true,
   maxBlocksInCache: 2,
   rowHeight: 35,
 //  enableServerSideFilter: true,
  enableServerSideSorting: false,
  rowModelType: 'serverSide',
  
  serverSideStoreType: 'partial',
  pagination: true,
  maxConcurrentDatasourceRequests: 1,
 // paginationPageSize: 20,
  paginationAutoPageSize: true
};

  }

  ngOnInit(): void {
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    const datasource = this.fetchTapecastList();
    params.api.setServerSideDatasource(datasource); // datasource needs to be a serverSide model

  }

  onRowDoubleClicked(event) {
    this.router.navigate(['/tapecast/' + event.data.id]); 
    return;
  }


  openDialog(){

    
  }

  refreshDatabase(){

    const datasource = this.fetchTapecastList();
    this.gridApi.setServerSideDatasource(datasource); // datasource needs to be a serverSide model
  }

  createTapecast()
  {

    this.http.post<any>(environment.apiUrl + `/tapecast`,null)
    .subscribe( res => {        
      this.router.navigate(['/tapecast/' + res.id]);
    });
  }


  fetchTapecastList(){

     
  return {
    getRows: (params2: any) => {
      console.log(params2);
      const page = (this.gridApi.paginationGetCurrentPage() + 1);

      const requestParams: HttpParams = new HttpParams()
      .append('limit', `${this.gridOptions.cacheBlockSize}`)
     /*  .append('like', `${this.filteredTextFilterName}`)
      .append('hazards[]', this.hazardSearchFilter)
      .append('suppliers[]', this.supplierSearchFilter)
      .append('locations[]', this.locationSearchFilter) */
      .append('page', `${page}`);



        this.http.get(environment.apiUrl + '/tapecast', {params: requestParams}).subscribe((response: any) => {

             params2.successCallback(response.data, response.total);
             this.totalRows = response.total;
             this.gridApi.sizeColumnsToFit();
           ///  console.log(params2);
        });

    }
  };
  }
}
