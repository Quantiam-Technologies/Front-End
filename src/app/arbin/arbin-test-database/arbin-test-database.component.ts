import { Component, OnInit } from '@angular/core';

import { AllModules  } from '@ag-grid-enterprise/all-modules';

import {  HttpClient} from '@angular/common/http';

import { Router } from '@angular/router';

import * as moment from 'moment';

@Component({
  selector: 'app-arbin-test-database',
  templateUrl: './arbin-test-database.component.html',
  styleUrls: ['./arbin-test-database.component.css']
})
export class ArbinTestDatabaseComponent implements OnInit {

  constructor(private http: HttpClient, 
    public router: Router,) { }

  rowData:any = [];
  gridColumnApi;
  gridApi;

  modules = AllModules;
  editable = false;

  gridOptions;

  columnDefs = [
    {
      field: 'Test_ID',
      width: 80,
      headerName: 'ID',

    },
    {
      field: 'Test_Name',
      headerName: 'Name',

    },
    {
      field: 'First_Start_DateTime',
      width: 250,
      headerName: 'Test Started',
      cellRenderer: (cell) =>{

    //    console.log(cell);
        const dateString = moment.unix((cell.value )).format('MMMM Do YYYY, h:mm:ss a');
        return dateString;
        
      }
    },
  ];

//   this.components = { datePicker: getDatePicker() };

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

  
  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;


    this.fetchTestList();
    //  this.rowData = r; 
    //  this.gridApi.sizeColumnsToFit(); 
  }

  onRowClicked(row)
  {
    console.log(row);
    this.router.navigate([`/arbin/test/${row.data.Test_ID}`]);
  }

  fetchTestList()
  {
    this.http.get('http://api.edm.quantiam.com:3000/arbin/test').subscribe(r => {

        this.rowData = r;
    }, error => { 

      console.log(error);
    });
  }


  ngOnInit() {
  }

}
