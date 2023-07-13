import { Component, OnInit } from '@angular/core';

import { HttpClient, HttpParams } from '@angular/common/http';
import {  environment} from '../../../environments/environment';
import { NotificationsService } from 'angular2-notifications';

import { MatLegacyDialog as MatDialog, MatLegacyDialogConfig as MatDialogConfig, MatLegacyDialogRef as MatDialogRef } from '@angular/material/legacy-dialog';

import { Router } from '@angular/router';

import { AllModules  } from '@ag-grid-enterprise/all-modules';

import { SteelCreationDialogComponent } from '../steel-creation-dialog/steel-creation-dialog.component';
 
@Component({
  selector: 'app-steel-database',
  templateUrl: './steel-database.component.html',
  styleUrls: ['./steel-database.component.css']
})
export class SteelDatabaseComponent implements OnInit {

  constructor(  private dialog: MatDialog, private http: HttpClient, private notification: NotificationsService, private router: Router) { }

  gridApi;
   gridColumnApi;

   pageSizes = [20, 25, 50, 100];

   modules = AllModules;
   rowData: [];
   rowModelType;
   rowSelection;
   maxBlocksInCache;
   cacheBlockSize;

   filteredCampaign = '';
   filteredTextFilterName = '';
   timeoutTextFilter;

   totalRows;

   frameworkComponents = {
  };

  columnDefs = [
    {
      headerName: '',
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
      headerName: 'ID',
      field: 'id',
      width: 40,
      cellRenderer: (cell) => {

        return '<b>'+ cell.data.id + '</b>';
      }
    },
    {
      headerName: 'Name',
      field: 'heat_id',
      width: 100,
    },    
    {
      headerName: 'Cut',
      field: 'cut',
      width: 40,
    },
    
    {
      headerName: 'Reworked',
      field: 'rework',
      width: 40,
      hide:true,
    },
    {
      headerName: 'Steel Type',
      field: 'steel_type.part_name',
      width: 100,
    },  
    {
      headerName: 'Length (mm)',
      field: 'steel_type.length',
      width: 40,
    },

    {
      headerName: 'Part Number',
      field: 'steel_type.client_part_number',
      width: 60,
      hide:true,
    },
    {
      headerName: 'Manufacturer',
      field: 'steel_type.manufacturer',
      width: 60,
     // hide:true,
    },
    {
      headerName: 'Metallurgy',
      field: 'steel_type.metallurgy',
      width: 60,
      //hide:true,
    },
    {
      headerName: 'Campaign',
      field: 'campaign.campaign_name',
      width: 80,
    },
    
    {
      headerName: 'Hold',
      field: 'hold',
      width: 40,
      hide: true,
    },
    {
      headerName: 'Comments',
      field: 'Comments',
      width: 80,
      hide:true,
    },
    {
      headerName: 'Created',
      field: 'created_at',
      width: 90,
      hide:true,
    },    
    {
      headerName: 'Actions',
      width: 40,
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

  gridOptions = {
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
        .append('campaign', `${this.filteredCampaign}`);
       // .append('type', `${this.filteredSemrun}`);


          this.http.get(environment.apiUrl + '/steel', {params: requestParams}).subscribe((response: any) => {

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

  createSteel()
  {

    const dialogRef = this.dialog.open(SteelCreationDialogComponent, {
      width: '600px',
      position: {'top':'10px'},
      //data: car,
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe(result => {


      this.refreshDatabase();
    })
  }



  

}
