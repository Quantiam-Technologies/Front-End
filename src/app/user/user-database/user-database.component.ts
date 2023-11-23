import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Router } from '@angular/router';

 
@Component({
  selector: 'app-user-database',
  templateUrl: './user-database.component.html',
  styleUrls: ['./user-database.component.css']
})
export class UserDatabaseComponent implements OnInit {


  private gridApi;
  private gridColumnApi;
   rowData: any;
  private paginationPageSize = 25;
   active_filter = '1';
   searchBarValue: string;

    



    columnDefs:any = [

       
        {headerName: 'ID', sort: 'asc', field: 'employeeid', headerTooltip: '#',  filter: 'agTextColumnFilter', maxWidth: 90, },
        {headerName: 'Firstname', field: 'firstname',   maxWidth: 130, },
        {headerName: 'Lastname', field: 'lastname', maxWidth: 130, },
        { headerName: 'Title', field: 'title',  },
        {headerName: 'Supervisor', field: 'employeeid', maxWidth: 150, valueGetter: function aPlusBValueGetter(params) {

          if(!params.data.supervisor.name) { return "Steve Petrone"; }
          return params.data.supervisor.name;
      },  },

        {headerName: 'Direct Line', field: 'direct_line',  maxWidth: 130,  },
        {headerName: 'Ext.', field: 'extension',  maxWidth: 100, },
        {headerName: 'Email', field: 'email',   },

        {headerName: 'Active', field: 'active', maxWidth: 150, valueGetter: function cellRenderer (params) {
          if(params.data.active)
          {
            return 'Active';
          }
          else
          {
            return 'Inactive';
          }
      }, 
     },

        {headerName: 'Username', field: 'ldap_username', hide: true,  },
       
      


        {headerName: 'Compensation', field: 'compensation', maxWidth: 130, hide: true, },
      
      
    ];

     defaultColDef = {

     // maxWidth:120,
      sorting: true,
     //   suppressMenu: true,
      sortable: true,
      filter: true,
      cellStyle: function (params) {
        return {
          cursor: 'pointer',
        };
      },

    };

    constructor(private http: HttpClient, private router: Router) { }

    ngOnInit() {  }


  onPageSizeChanged(newPageSize) {
    const value = (<HTMLInputElement>document.getElementById('page-size')).value;
    this.gridApi.paginationSetPageSize(Number(value));
  }

   onRowDoubleClicked(event) {

    if(event.data.employeeid)
    {
    this.router.navigate(['/user/' + event.data.employeeid]);
    }
    else
    {
      this.router.navigate(['/user/' + event.data.employee_database_id]);
    }

  }

  onFilterChanged() {
    this.gridApi.setQuickFilter(this.searchBarValue);
  }

  onActiveFilterChange()
  {
    //console.log(this.active_filter);
    var activeFilterSent = this.active_filter;
   

    const obj: any = {'params': { 'supervisor': true,'active': activeFilterSent}};
    if(this.active_filter == 'both'){ delete  obj.params.active; };
    this.http.get<any>('http://api.edm.quantiam.com/users', obj).subscribe((r) => {

      this.rowData = r;
        setTimeout(() => {  this.gridApi.sizeColumnsToFit(); }, 200);
   });
    
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;


	        const obj: any = {'params': { 'supervisor': true, 'active': this.active_filter}};

           this.http.get<any>('http://api.edm.quantiam.com/users', obj).subscribe((r) => {

                this.rowData = r;
                  setTimeout(() => {  this.gridApi.sizeColumnsToFit(); }, 200);
             });




  }

  autoSizeAll() {
    const allColumnIds = [] as any;
    this.gridColumnApi.getAllColumns().forEach(function(column) {
      allColumnIds.push(column.colId);
    });
    this.gridColumnApi.autoSizeColumns(allColumnIds);
  }



}
