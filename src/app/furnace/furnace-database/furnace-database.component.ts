import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import {  environment} from '../../../environments/environment';
import { NotificationsService } from 'angular2-notifications';

import { Router } from '@angular/router';

@Component({
  selector: 'app-furnace-database',
  templateUrl: './furnace-database.component.html',
  styleUrls: ['./furnace-database.component.css']
})
export class FurnaceDatabaseComponent {

  constructor(  private http: HttpClient, private notification: NotificationsService, private router: Router) {


    this.gridOptions = {
      rowSelection: 'single',
      cacheBlockSize: 20,
      enableRangeSelection: true,
      rowHeight: 50,
      // maxBlocksInCache: 2,
     // enableServerSideFilter: false,
     // enableServerSideSorting: false,
      rowModelType: 'serverSide',
      serverSideStoreType: 'partial',
      pagination: true,
      maxConcurrentDatasourceRequests: 1,
      paginationPageSize: 10,
      // paginationAutoPageSize: true
    };

   }

   
   gridApi;
   gridColumnApi;
   gridOptions;

   pageSizes = [10, 20, 25, 50, 100];

   rowData: [];
   rowModelType;
   rowSelection;
   maxBlocksInCache;
   cacheBlockSize;

   filteredCampaign = '';
   filteredSteelTypeId = '';
   filteredTextFilterName = '';
   timeoutTextFilter;

   totalRows;

   frameworkComponents = {    
    //steelActionsContainerDisplay: AgGridSteelActionsDisplayComponent,
  };

  columnDefs = [
    {
      headerName: 'Code',
      field: 'datamatrix',
      width: 30,
      suppressMenu : true,
      cellRenderer: (cell) => {

      if(cell.data.datamatrix)
      {
         return '<img width="38px" src="' + cell.data.datamatrix + '"></img>';
      }
    
      return '';
    }
  },

  {
    headerName: 'ID',
    field: 'id',
    width: 35,
    hide: true,
  },

  {
    headerName: 'Name',
    field: 'furnace_run_name',
    width: 35,
    cellRenderer: (cell) => {

      return '<b>'+ cell.data.furnace_run_name + '</b>';
    }
  },

  
  {
    headerName: 'Type',
    field: 'process.process_name',
    width: 40,
  },

   
  {
    headerName: 'Profile',
    field: 'profile.profile_name',
    width: 60,
  },
  {    
      
    headerName: 'Count',
    field: 'steel',
    width: 30,
    cellStyle: (params)=> {
      return {
        'justify-content': 'center',
        display: 'flex',
        height: '100%',
        "align-items": 'center',
        cursor: 'pointer',
      }
    },
    cellRenderer: (cell) => {


      return '<p>'+cell.data.steel_extended.length+'</p>';
    }
  },



  {
    headerName: 'Steel Types',
    field: 'steel',
    width: 240,
    cellRenderer: (cell) => {

      var string = '<ul style="columns: 2;-webkit-columns: 2;-moz-columns: 2; font-size: 11px; margin-bottom: inherit; padding-left:0px; ">';
      var count = {};

      cell.data.steel_extended.forEach(steel => {

        if(!count.hasOwnProperty(steel.steel_type.part_name))  count[steel.steel_type.part_name]  = 0;
        count[steel.steel_type.part_name] = count[steel.steel_type.part_name] + 1;
        
      });

      for(var propt in count){
        string = string + '<ol>' + propt + ': ' + count[propt] + '</ol>'; 
    }
    var string = string + '</ul>';
    return string;
    }
  },

  
  {
    headerName: 'Updated',
    field: 'updated_at',
    width: 50,
    hide:true,
  },

  {
    headerName: 'Created',
    field: 'created_at',
    width: 50,
  },


  ];

  defaultColDef = {
    filter: false,
    sorting: true,
    resizable: true,
    cellStyle: (params)=> {
      return {
        display: 'flex',
        height: '100%',
        "align-items": 'center',
        cursor: 'pointer',
      };
    }
   };

   ngOnInit() {
  }


   onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

      console.log(params.api);

    const datasource = this.fetchDatabase();

    params.api.setServerSideDatasource(datasource); // datasource needs to be a serverSide model

  }


  fetchDatabase(){
    return {
      getRows: (params2: any) => {

        const page = (this.gridApi.paginationGetCurrentPage() + 1);

        const requestParams: HttpParams = new HttpParams()
        .append('limit', `${this.gridOptions.cacheBlockSize}`)
        .append('like', `${this.filteredTextFilterName}`)
        .append('page', `${page}`)
        //.append('steel_type_id', `${this.filteredSteelTypeId}`)
        .append('campaign_id', `${this.filteredCampaign}`);
       // .append('type', `${this.filteredSemrun}`);


          this.http.get(environment.apiUrl + '/furnace/run', {params: requestParams}).subscribe((response: any) => {

              params2.successCallback(response.data, response.total);
              this.totalRows = response.total;
              
              this.gridApi.sizeColumnsToFit();
            //  console.log(params2);
          });

      }
    };
  }

  refreshDatabase() {

    const datasource = this.fetchDatabase();
    this.gridApi.setServerSideDatasource(datasource);
  }


  createFurnaceRun(){

    
  }







  onTextFilterChanged() {
    clearTimeout(this.timeoutTextFilter);
    this.timeoutTextFilter = setTimeout((x) => {
          const datasource = this.fetchDatabase();
          this.gridApi.setServerSideDatasource(datasource);
    }, 800 );

  }

  onPageSizeChanged(){

  }


  onRowDoubleClicked(event) {
      this.router.navigate(['/furnace/run/' + event.data.id]); 
      return;
  }



  filterCampaign(event) {
    if (event) {  this.filteredCampaign = event.id; } else { this.filteredCampaign = ''; }
      this.refreshDatabase();
  }

  


}
