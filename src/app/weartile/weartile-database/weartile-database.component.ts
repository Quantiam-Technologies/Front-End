




import { Component, OnInit } from '@angular/core';

import { HttpClient, HttpParams } from '@angular/common/http';
import {  environment} from '../../../environments/environment';
import { NotificationsService } from 'angular2-notifications';

import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';

import { ServerSideRowModelModule } from '@ag-grid-enterprise/server-side-row-model';

import { Router } from '@angular/router';

 
@Component({
  selector: 'app-weartile-database',
  templateUrl: './weartile-database.component.html',
  styleUrls: ['./weartile-database.component.css']
})


export class WeartileDatabaseComponent implements OnInit {

  constructor(  private dialog: MatDialog, private http: HttpClient, private notification: NotificationsService, private router: Router) {

   

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

   public modules: any[] = [
    ServerSideRowModelModule 
];


   gridApi;
   gridColumnApi;
   gridOptions;

   pageSizes = [20, 25, 50, 100];

    
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
    steelActionsContainerDisplay: null,
  };

  columnDefs = [
    {
      headerName: 'Code',
      field: 'datamatrix',
      width: 30,
      cellRenderer: (cell) => {

      if(cell.data.datamatrix)
      {
         return '<img width="25px" src="' + cell.data.datamatrix + '"></img>';
      }
    
      return '';
    }
    },
    {
      headerName: 'Wear Tile ID',
      field: 'id',
      width: 35,
      hide:true,
    },
    {
      headerName: 'Identifier',
      field: 'identifier',
      width: 35,
    },
    {
      headerName: 'Name',
      field: 'name',
      width: 70,
    }, 
    
    {
      headerName: 'Type ID',
      field: 'weartile_type_id',
      width: 80,
      hide:true,
    },  
    
    {
      headerName: 'Type',
      field: 'weartile_type.name',
      width: 80,
    },
    {
      headerName: 'Product',
      field: 'weartile_type.quantiam_product',
      width: 80,
    },
    {
      headerName: 'Manufacturer',
      field: 'steel_type.manufacturer',
      width: 60,
      hide:true,
    },

    {
      headerName: 'Campaign ID',
      field: 'campaign_id',
      width: 80,
      hide:true,
    },
   
    {
      headerName: 'Campaign',
      field: 'campaign.campaign_name',
      width: 80,
    },
      
    
    
    {
      headerName: 'Reworks',
      field: 'rework',
      width: 45,
      hide:true,
    },
    
    
    {
      headerName: 'Hold',
      field: 'hold',
      width: 40,
      hide: true,
    },
    {
      headerName: 'Fail',
      field: 'fail',
      width: 40,
      hide: true,
    },
    
    {
      headerName: 'Updated',
      field: 'updated_at',
      width: 90,
      hide:true,
    }, 
    
    
    {
      headerName: 'Last Status',
      field: 'last_known_process_status',
      width: 80,
    },
    
    {
      headerName: 'Created',
      field: 'created_at',
      width: 90,
     // hide:true,
    }, 
    {
      headerName: 'Actions',
      hide:true,
      width: 60,
      cellRenderer: 'steelActionsContainerDisplay',
    },
  ];

  defaultColDef = {
    filter: false,
    sorting: true,
    resizable: true,
    cellStyle: (params)=> {
      return {
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
        .append('steel_type_id', `${this.filteredSteelTypeId}`)
        .append('campaign_id', `${this.filteredCampaign}`);
       // .append('type', `${this.filteredSemrun}`);


          this.http.get(environment.apiUrl + '/weartile', {params: requestParams}).subscribe((response: any) => {

              params2.success({ rowData: response.data });
              
              this.gridApi.sizeColumnsToFit();              
             this.gridApi.setRowCount(response.total,true);
            //  console.log(params2);
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
          const datasource = this.fetchDatabase();
          this.gridApi.setServerSideDatasource(datasource);
    }, 800 );

  }


  onRowDoubleClicked(event) {
      this.router.navigate(['/steel/' + event.data.id]); 
      return;
  }
  
  onPageSizeChanged()
  {
    
  }


  filterCampaign(event) {
    if (event) {  this.filteredCampaign = event.id; } else { this.filteredCampaign = ''; }
      this.refreshDatabase();
  }


  
  printTraveller(steel_id){
    this.http.get(environment.apiUrl + '/steel/'+steel_id+'/traveller',).subscribe((r:any) => {
      window.location.assign(r.url);    
    });
  }


  

}
