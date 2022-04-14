import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { HttpClient } from '@angular/common/http';

import { AllModules  } from '@ag-grid-enterprise/all-modules';

import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';
HC_exporting(Highcharts);

@Component({
  selector: 'app-company-insight-headcount',
  templateUrl: './company-insight-headcount.component.html',
  styleUrls: ['./company-insight-headcount.component.css']
})
export class CompanyInsightHeadcountComponent implements OnInit {

  currentYear = new Date().getFullYear();
  selectedYear = this.currentYear;
  yearList = [];
  
  modules = AllModules;

  Highcharts = Highcharts;

  renderHeadcountChart = false;
  updateHeadcountFlag = false;

  headcountOptions: any = {
    credits: {
        text: 'Quantiam Technologies',
    },
    chart: {

        type: 'column'
    },
    title: {

        text: 'Employee Timesheet User Count '

    },
    subtitle: {
        text: 'Quantiam Technologies Inc. 2015 to ' + this.currentYear,
    },
    legend:{
      enabled: false,
    },
    yAxis: {
        title: {
            text: 'Hours'
        }
    },
    xAxis: {
      categories: [  ],
      labels:{
        step:6,
        rotation: 45,
      },
      crosshair: true
  },
  series:[
    {
      name:'Headcount',
    }
  ]
};

headcountRowData;
headcountColumnDefs = [
  {field: 'year' },
  {field: 'month' },
  {field: 'count'}
];


headcountgridApi;
headcountgridColumnApi;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getheadcountData();
  }


  getheadcountData() {


    this.http.get(environment.apiUrl + '/timesheet/insights/company/headcount').subscribe((r: any) => {

      this.headcountOptions.xAxis.categories = r.categories;
      this.headcountOptions.series[0].data = r.seriesData;
      this.headcountRowData = r.data;
      setTimeout((x) => { this.renderHeadcountChart = true; },100);


      this.updateHeadcountFlag = true;

    })

  }


  
  
  headcountGridReady(params) {
    this.headcountgridApi = params.api;
    this.headcountgridColumnApi = params.columnApi;
    this.headcountgridApi.sizeColumnsToFit();
  }


}
