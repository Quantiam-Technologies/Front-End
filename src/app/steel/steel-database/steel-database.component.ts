import { Component, OnInit } from '@angular/core';

import { HttpClient, HttpParams } from '@angular/common/http';
import {  environment} from '../../../environments/environment';
import { NotificationsService } from 'angular2-notifications';

import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';


import {  AgGridSteelActionsDisplayComponent } from './ag-grid-steel-actions-display/ag-grid-steel-actions-display.component'; 

import { Router } from '@angular/router';

import { AllModules  } from '@ag-grid-enterprise/all-modules';

import { SteelCreationDialogComponent } from '../steel-creation-dialog/steel-creation-dialog.component';
 
@Component({
  selector: 'app-steel-database',
  templateUrl: './steel-database.component.html',
  styleUrls: ['./steel-database.component.css']
})
export class SteelDatabaseComponent implements OnInit {

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

   gridApi;
   gridColumnApi;
   gridOptions;

   pageSizes = [20, 25, 50, 100];

   modules = AllModules;
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
    steelActionsContainerDisplay: AgGridSteelActionsDisplayComponent,
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
      headerName: 'ID',
      field: 'id',
      width: 35,
      cellRenderer: (cell) => {

        return ''+ cell.data.id + '';
      }
    },
    {
      headerName: 'Name',
      field: 'heat_id',
      width: 70,
      cellRenderer: (cell) => {

        var string = '<b>'+ cell.data.heat_id + '</b>';
        if(cell.data.cut) string = string+' C'+cell.data.cut;
        return string; 
      }
    },    
    {
      headerName: 'Cut',
      field: 'cut',
      width: 35,
      hide:true,
    },
    
    {
      headerName: 'Steel Type',
      field: 'steel_type.part_name',
      width: 80,
    },  
    {
      headerName: 'Metallurgy',
      field: 'steel_type.metallurgy',
      width: 60,
      hide:true
    },
    
    {
      headerName: 'Last Status',
      field: 'last_known_process_status',
      width: 80,
    },
    {
      headerName: 'Manufacturer',
      field: 'steel_type.manufacturer',
      width: 60,
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
      //hide:true,
    },
    {
      headerName: 'OG Len (mm)',
      field: 'steel_type.length',
      width: 80,
    },
    {
      headerName: 'Shipped Len (mm)',
      field: 'steel_type.length_shipped',
      width: 80,
    },

    {
      headerName: 'Part Number',
      field: 'steel_type.client_part_number',
      width: 60,
      hide:true,
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

  createSteelDialog()
  {

    const dialogRef = this.dialog.open(SteelCreationDialogComponent, {
      width: '600px',
      position: {'top':'20px'},
      //data: car,
    });

    dialogRef.afterClosed().subscribe(result => {

      console.log(result);
     // if(result)
     // this.refreshDatabase();
    })
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
