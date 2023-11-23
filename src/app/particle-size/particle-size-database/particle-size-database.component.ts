import { Component, OnInit } from '@angular/core';
import { ParticleSizeDatabaseService } from './particle-size-database.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment} from '../../../environments/environment';
import { Router } from '@angular/router';
import { RefreshDBTablesService } from '../../services/refresh-db-tables/refresh-dbtables.service';


import { NotificationsService } from 'angular2-notifications';

import { AgGridSelectProjectEditorComponent } from '../../shared/ag-grid-select-project/ag-grid-select-project.component';
import { AgGridSelectUserComponent } from '../../shared/ag-grid-select-user/ag-grid-select-user.component';
import { AgGridSemContainerSteelCellDisplayComponent } from '../../sem/sem-database/ag-grid-sem-container-steel-cell-display/ag-grid-sem-container-steel-cell-display.component';
import { AgGridParticlePdfComponent } from './ag-grid-particle-pdf/ag-grid-particle-pdf.component';

import { SettingsService } from '../../services/settings/settings.service';

 

@Component({
  selector: 'app-particle-size-database',
  templateUrl: './particle-size-database.component.html',
  styleUrls: ['./particle-size-database.component.css']
})
export class ParticleSizeDatabaseComponent implements OnInit {

  gridApi;
  gridColumnApi;
     
  pageSizes = [20, 25, 50, 100, 200];

  totalRows;
  rowData;
  timeoutTextFilter;
  filteredTextFilterName;

  oldCellValue;

  defaultColDef = {

    sortable: true,
    resizable: true,
    filter: true,
    cellStyle: function (params) {
      return {
        cursor: 'pointer',
      };
    },

  };


  frameworkComponents = {
    projectEditor: AgGridSelectProjectEditorComponent,
    userEditor: AgGridSelectUserComponent,
    steelContainerDisplay: AgGridSemContainerSteelCellDisplayComponent,
    particlePdfDisplay: AgGridParticlePdfComponent,
    //steelContainerEdit: AgGridSemContainerSteelEditComponent,
  };

  columnDefs = [
    
    {
      headerName: 'ID',
      field: 'id',
      width: 70,
      editable: false,
      filter: 'agSetColumnFilter',
        filterParams: {
            values: params => {
                // async update simulated using setTimeout()
                setTimeout(() => {
                    // fetch values from server
                    const values = ['test','test2','test3'];
                    // supply values to the set filter
                    params.success(values);
                }, 3000);
            }
        },
      cellRenderer: (cell) => {
        return '<b>' + cell.data.id + '</b>';      
      }
      
    }, 
    {
      headerName: 'Project',
      field: 'project_id',
      width: 60,
      filter: false,
      cellEditor: 'projectEditor',
    },    
  

    {
      headerName: 'Material',
      field: 'container.lot.material.name',
      cellRenderer: (cell) => {

        if (cell.hasOwnProperty('data') && cell.data.name) { return cell.data.name; }

        if (cell.hasOwnProperty('data') && cell.data.container_id) { 
          
          return cell.data.container.lot.material.name+', '+cell.data.container.lot.material.grade+', '+cell.data.container.lot.material.supplier.supplier_name; 
        
        
        }

        if (cell.hasOwnProperty('data') && !cell.data.container_id) { 
          
        try {
          console.log(cell.data);
          const split = cell.data.pdf.split(/(QCID [0-9]+)|(QCID[0-9]+)|(QCID-[0-9]+)|(Q[0-9]+)/);   
          return split[1]+' is not a registered container.';
          }
          catch (e)
          {
            console.log(e);
            return 'Not a registered container';
          }
     
        }
        return '';
      }
    },
    {
      headerName: 'Grade',
      field: 'container.lot.material.grade',
      hide: true,
    }, 
    {
      headerName: 'Supplier',
      field: 'container.lot.material.supplier.supplier_name',
      hide: true,
    },
    {
      headerName: 'D(90)',
      field: 'd90',
      width: 50,
    },
    {
      headerName: 'D(50)',
      field: 'd50',
      width: 50,
    },
    {
      headerName: 'D(10)',
      field: 'd10',
      width: 50,
    },
 
    {
      headerName: 'Operator',
      field: 'operator_id',
      width: 70,
      filter: true,
      cellEditor: 'userEditor',

      cellRenderer: (cell) => {

        if (cell.hasOwnProperty('data') && cell.data.operator) { return cell.data.operator.name_abbrev; }
        return '';
      }
    },
    /* {
      headerName: 'Requested',
      field: 'requested_by',
      width: 70,
      filter: true,
      //hide:true,
      cellEditor: 'userEditor',

      cellRenderer: (cell) => {

        if (cell.hasOwnProperty('data') && cell.data.operator) { return cell.data.operator.name_abbrev; }
        return '';
      }
    }, */ 
    {
      headerName: 'Analyzed',
      width: 90,
      field: 'created_at',
     
    },

    {
      headerName: 'Material ID',
      field: 'container.lot.material.id',
      width: 50,
      hide: false,
    },
   

    {
      headerName: 'Container',
      // field: 'id',
      width: 70,
      cellRenderer: 'steelContainerDisplay',
      cellEditor: 'steelContainerEdit',
      valueSetter: (params) => {

         if (params.newValue) {         
          if (params.newValue.container_id) {
            params.data.container = params.newValue;
            params.data.container_id = params.newValue.container_id;
           }
           this.update(params);

          return params.newValue;

        }
        return null;
      },
    },
    
    {
      headerName: 'PDF',
      width: 70,
      cellRenderer: 'particlePdfDisplay',
      /// code that creates a PDF button
    },
    {
      headerName: 'Received',
      field: 'container.created_at',
      hide: true,
    },
   
    {
      headerName: 'Lot ID',
      field: 'container.lot.id',
      hide: true,
    },
    {
      headerName: 'Lot Name',
      field: 'container.lot.lot_name',
      hide: true,
    },
    {
      headerName: 'Container ID',
      field: 'container.id',
      hide: true,
    },
    {
      headerName: 'QCID',
      field: 'container.qcid',
      hide: true,
    },
  ];
 

  gridOptions;


  constructor( 
     private ParticleSizeDatabaseService: ParticleSizeDatabaseService,
    private http: HttpClient,
    private notification: NotificationsService,
    public router: Router,
    private settings: SettingsService,
    private refreshDBTableService: RefreshDBTablesService
    ) {

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

    

  ngOnInit(): void {
  
  }

  onRowDoubleClicked(event) {
     this.router.navigate(['/particle-size/analysis/' + event.data.id]); 
    return;
  }


  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    //  console.log(params.api);

    const datasource = this.fetchDatabase();

    params.api.setServerSideDatasource(datasource); // datasource needs to be a serverSide model

  }


  fetchDatabase () {

     return {
      getRows: (params2: any) => {
        console.log(params2);
        const page = (this.gridApi.paginationGetCurrentPage() + 1);

        const requestParams: HttpParams = new HttpParams()
         .append('limit', `${this.gridOptions.cacheBlockSize}`)
         .append('like', `${this.filteredTextFilterName}`)
       
        .append('page', `${page}`); 

          this.http.get(environment.apiUrl + '/particle-size/list', {params: requestParams}).subscribe((response: any) => {

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
  this.refreshDatabase();

}

  onCellEditingStopped($event) {

    let value = $event.value;
    if (value === '') { value = null; }
    if (this.oldCellValue !== value ) {
      this.update($event);
     }
     return;
  }
  onCellEditingStarted($event) {

        this.oldCellValue = $event.value;
        return;


  }

  update(cell)
  {


  }

  updateTimesheet()
  {
    
    this.http.get(environment.apiUrl + '/particle-size/update-mastersizer-timesheet')
    .subscribe(response => {

      this.notification.success('Success', 'The mastersizer timesheet was updated.', {showProgressBar: false, timeOut: 2000, clickToClose: true});
      this.refreshDatabase();
      // Sanitized logo returned from backend
    },
    error => {
                this.notification.error('Error', error.error.error, {showProgressBar: false, timeOut: 5000, clickToClose: true});

    });

  
  }


}
