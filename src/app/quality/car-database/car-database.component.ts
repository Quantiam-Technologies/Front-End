import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';

import { environment } from '../../../environments/environment';
@Component({
  selector: 'app-car-database',
  templateUrl: './car-database.component.html',
  styleUrls: ['./car-database.component.css']
})
export class CarDatabaseComponent implements OnInit {

  constructor(public router: Router, private route: ActivatedRoute, private http: HttpClient) {

    this.gridOptions = {
      rowSelection: 'single',
      cacheBlockSize: 18,
      enableRangeSelection: true,
       maxBlocksInCache: 2,
       rowHeight: 38,
      enableServerSideSorting: false,
      rowModelType: 'serverSide',    
      serverSideStoreType: 'partial',
      pagination: true,
      maxConcurrentDatasourceRequests: 1,
     // paginationPageSize: 20,
      paginationAutoPageSize: true
    };

   }

  private gridApi;
  private gridColumnApi;
  rowData: any = [{}, {}];
   
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

  filteredStatus;
  filteredTextFilterName;
  filteredType;
  filteredBuisnessUnit;

  columnDefs = [
    {
      field: 'id',      
      headerName: 'ID',
      width: 30,
    },     
    {
      field: 'ncr_id',      
      headerName: 'NCR',
      width: 50,
    },    
    {
      field: 'name',      
      headerName: 'CAR Name',
      width: 150,
    },
    {
      field: 'description',      
      headerName: 'Details',
     
    },
    {
      field: 'ncr.project_id',      
      headerName: 'Project',
      width: 60,
     
    },
    {
      field: 'effecive',      
      headerName: 'Effective',
      width: 100,
     
      cellRenderer: (cell) => {

        

        if(cell.data.effective === 0 && cell.data.completed === 1)
        {
          return '<button class="btn btn-danger btn-sm"> Ineffective </button>';
        }
        if(cell.data.effective === 1 && cell.data.completed === 1)
        {
          return '<button class="btn btn-success btn-sm"> Effective </button>';
        }
        if((cell.data.effective === null) && cell.data.completed === 1)
        {
          return '<button class="btn btn-info btn-sm"> Ongiong </button>';
        }
        
        if((cell.data.effective === null || !cell.data.effective) && cell.data.completed === 0)
        {
          return '<button class="btn btn-warning btn-sm"> Pending </button>';
        }
        return;
      }
    
    },
    
    {
      field: 'created_at',      
      headerName: 'Created',
     
    },
   
  ];

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

  gridOptions;

  
  ngOnInit(): void {
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    const datasource = this.fetchDatabase();
    params.api.setServerSideDatasource(datasource); // datasource needs to be a serverSide model

  }

  sizeColumnsToFit() {
    setTimeout(() => {  this.gridApi.sizeColumnsToFit(); }, 300);
  }

  onRowDoubleClicked(event) {
    this.router.navigate(['/quality/car/' + event.data.id]); 
    return;
  }

refreshDatabase()
{
  const datasource = this.fetchDatabase();
  this.gridApi.setServerSideDatasource(datasource);
}

fetchDatabase () {

  return {
    getRows: (params2: any) => {
    //  console.log(params2);
      const page = (this.gridApi.paginationGetCurrentPage() + 1);

       const requestParams: HttpParams = new HttpParams()
     // .append('limit', `${this.gridOptions.cacheBlockSize}`)
      .append('like', `${this.filteredTextFilterName}`)
      .append('status', `${this.filteredStatus}`)
      .append('type', `${this.filteredType}`)
      .append('buisness_unit', `${this.filteredBuisnessUnit}`);
     /* .append('hazards[]', this.hazardSearchFilter)
      .append('suppliers[]', this.supplierSearchFilter)
      .append('locations[]', this.locationSearchFilter)
      .append('page', `${page}`); */



        this.http.get(environment.apiUrl + '/car', {params: requestParams}).subscribe((response: any) => {

             params2.successCallback(response.data, response.total);
             this.totalRows = response.total;
             this.gridApi.sizeColumnsToFit();
           ///  console.log(params2);
        });

    }
  };

}

 
  onTextFilterChanged() {
    clearTimeout(this.timeoutTextFilter);
    this.timeoutTextFilter = setTimeout((x) => {

            this.refreshDatabase();
    }, 500 );

}



}
