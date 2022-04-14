import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';


import { AllModules  } from '@ag-grid-enterprise/all-modules';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-ncr-database',
  templateUrl: './ncr-database.component.html',
  styleUrls: ['./ncr-database.component.css']
})
export class NcrDatabaseComponent implements OnInit {

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

  filteredStatus;
  filteredTextFilterName;
  filteredType;
  filteredBuisnessUnit;

  statusTypes = [
    {id:'draft',value:'draft'},
    {id:'ongoing',value:'ongoing'},
    {id:'completed',value:'Completed'}
  ]
  
  typeTypes = [
    {id:'procedure',value:'Procedure'},
    {id:'product',value:'Product'},
  ]

  buissnessUnits = [
    {id:'trial_manufacturing', name:"Trial Manuacturing"},
    {id:'receiving', name:"Receiving"},
    {id:'health_and_safety', name:"Health and Safety"},
    {id:'research_and_developmemnt', name:"R & D"},
    {id:'finance', name:"Finance"},

  ]

  
  columnDefs = [
    {
      field: 'id',      
      headerName: 'ID',
      width: 30,
    },
    {
      field: 'name',      
      headerName: 'NCR Name',
      width: 200,
    },
    {
      field: 'project_id',      
      headerName: 'Project',
      width: 60,
    },
     {
      field: 'type',      
      headerName: 'Type',
      width: 70,
      cellRenderer: (cell) => {

        if(cell.value)
        {
        return cell.value.replace(/^./, cell.value[0].toUpperCase());
        }
        return '';
      }
    },    
    {
      field: 'buisness_unit',      
      headerName: 'Buisness Unit',
      width: 100,
      cellRenderer: (cell) => {
        if(cell.value)
        {
                  return cell.value.split('_').map((word)=>{
          return word.replace(word[0],word[0].toUpperCase());
        }).join(' ');
      }

       return '';
      }
    },
    {
      field: 'severity',      
      headerName: 'Severity',
      width: 70,
      cellRenderer: (cell) => {
        if(cell.value)
        {
        return cell.value.replace(/^./, cell.value[0].toUpperCase());
        }
        return '';
      }
    },    
    {
      field: 'created_by.name',      
      headerName: 'By',
      width: 70,
    },{
      field: 'created_at',      
      headerName: 'Created',
      width: 70,
    },
    {
      field: 'status',      
      headerName: 'Status',
      width: 60,
      cellStyle: {textAlign: "center",  'align-items': "center", 'justify-content': "center", display: "flex"},
      cellRenderer: (cell) => {

        if(cell.value === 'ongoing' && cell.value)
        {
          return '<button class="btn btn-warning btn-sm">'+cell.value.replace(/^./, cell.value[0].toUpperCase())+'</button>';
        }

        if(cell.value === 'draft' && cell.value)
        {
          return '<button class="btn btn-light btn-sm">'+cell.value.replace(/^./, cell.value[0].toUpperCase())+'</button>';
        }

        if(cell.value === 'completed' && cell.value)
        {
          return '<button class="btn btn-success btn-sm">'+cell.value.replace(/^./, cell.value[0].toUpperCase())+'</button>';
        }

        return '';

      }
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


  constructor(public router: Router, private route: ActivatedRoute, private http: HttpClient) {

this.gridOptions = {
  rowSelection: 'single',
  cacheBlockSize: 18,
  enableRangeSelection: true,
   maxBlocksInCache: 2,
   rowHeight: 38,
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
    const datasource = this.fetchDatabase();
    params.api.setServerSideDatasource(datasource); // datasource needs to be a serverSide model

  }

  sizeColumnsToFit() {
    setTimeout(() => {  this.gridApi.sizeColumnsToFit(); }, 300);
  }

  onRowDoubleClicked(event) {
    this.router.navigate(['/quality/ncr/' + event.data.id]); 
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
      console.log(params2);
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



        this.http.get(environment.apiUrl + '/ncr', {params: requestParams}).subscribe((response: any) => {

             params2.successCallback(response.data, response.total);
             this.totalRows = response.total;
             this.gridApi.sizeColumnsToFit();
           ///  console.log(params2);
        });

    }
  };

}

  createNCR()
  {
    //http to create ncr
    this.http.post(environment.apiUrl+'/ncr', {}).subscribe((r:any)=>{
        this.refreshDatabase();
       this.router.navigate(['/quality/ncr/' + r.id]);
    })

  }

  onTextFilterChanged() {
    clearTimeout(this.timeoutTextFilter);
    this.timeoutTextFilter = setTimeout((x) => {

            this.refreshDatabase();
    }, 500 );

}


  
  filterStatus(event)  { this.filteredStatus = event.id; 
    this.refreshDatabase(); }
  clearFilterStatus () {this.filteredStatus = '';
  this.refreshDatabase(); } 
  
  
  filterBuisnessUnits(event)  { this.filteredBuisnessUnit = event.id; 
    this.refreshDatabase(); }
    clearFilterBuisnessUnits () {this.filteredBuisnessUnit = '';
  this.refreshDatabase(); }  
  
  
  filterTypes(event)  { this.filteredType = event.id; 
    this.refreshDatabase(); }
    clearFilterTypes () {this.filteredType = '';
  this.refreshDatabase(); }

}
