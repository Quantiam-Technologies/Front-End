import {  Component,  OnInit} from '@angular/core';
import {  HttpClient} from '@angular/common/http';
import {  Router} from '@angular/router';

@Component({
  selector: 'app-xps-database',
  templateUrl: './xps-database.component.html',
  styleUrls: ['./xps-database.component.css']
})
export class XpsDatabaseComponent implements OnInit {

  constructor(private http: HttpClient, private router: Router) {}


   gridApi;
   gridColumnApi;
   rowData: any[];
   paginationPageSize = 25;
   _xrdRuns: any;





   columnDefs = [
    /* {headerName: 'Actions',field: 'duration', valueGetter: function aPlusBValueGetter(params) {


           return '<button md-button>Test </button>';
        }}, */
    {
      headerName: 'Run Folder Created',
      field: 'created_at',
      cellStyle: function (params) {
        return {
          cursor: 'pointer'
        };
      }

    },
    // {headerName: 'ID', field: 'id', width:100},
    {
      headerName: 'Run #',
      field: 'name',
      width: 150,
      cellStyle: function (params) {
        return {
          cursor: 'pointer'
        };
      }
    },
    {
      headerName: 'Project',
      field: 'project',
      width: 150
    },
    {
      headerName: 'Sample Name',
      field: 'sample_name',
      editable: true,
      cellStyle: function (params) {
        return {
          cursor: 'text'
        };
      }
    },
    {
      headerName: 'Sample Type',
      field: 'sample_type',
      editable: true,
      cellEditorParams: {
        values: ['Coupon', 'Powder']
      },
      cellEditor: 'agRichSelectCellEditor',
    },
    {
      headerName: 'Hours',
      field: 'duration',
      type: 'numericColumn',
      width: 140,
      valueGetter: function aPlusBValueGetter(params) {

        if (params.data.duration) {
          return parseFloat((params.data.duration / 60 / 24).toFixed(2));
        }
        return null;
      }
    },
    {
      headerName: 'Seconds',
      field: 'duration',
      type: 'numericColumn',
      width: 140,
      hide: true
    },
    {
      headerName: 'Analyses',
      field: 'analyses',
      type: 'numericColumn',
      width: 140
    },
    {
      headerName: 'Operator',
      field: 'operator',
      editable: true,
      cellEditor: 'agRichSelectCellEditor',
      cellEditorParams: {
        values: [{
          'id': 30,
          'text': 'Peter Unwin'
        }]
      }

    },
    {
      headerName: 'Requested By',
      field: 'requested_by',
      editable: true
    },

  ];

  ngOnInit() {



  }

  onPageSizeChanged(newPageSize) {
    const value = ( < HTMLInputElement > document.getElementById('page-size')).value;
    this.gridApi.paginationSetPageSize(Number(value));
  }

  onCellDoubleClicked(event) {
    if (event.column.colId == 'created_at') { this.router.navigate(['/xps/run/' + event.data.id]); }
    if (event.column.colId == 'name') { this.router.navigate(['/xps/run/' + event.data.id]); }

  }



  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    this._xrdRuns = this.http.get < any > ('http://api.edm.quantiam.com/xps/runs', {
      params: {}
    }).subscribe((r) => {

      this.rowData = r;
      setTimeout(() => {
        this.gridApi.sizeColumnsToFit();
      }, 400);
    });

    /*
                 this.sampleService.sampleDatabase$.subscribe((r)=>{

                  this.rowData = r;


                  })
         */
    // params.api.sizeColumnsToFit();

  }

  autoSizeAll() {
    let allColumnIds = [] as any;
    this.gridColumnApi.getAllColumns().forEach(function (column) {
      allColumnIds.push(column.colId);
    });
    this.gridColumnApi.autoSizeColumns(allColumnIds);
  }


  ngOnDestroy() {
    this._xrdRuns.unsubscribe();
  }


}
