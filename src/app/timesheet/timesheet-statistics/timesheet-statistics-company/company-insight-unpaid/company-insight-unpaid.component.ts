import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { HttpClient } from '@angular/common/http';

 

import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';
HC_exporting(Highcharts);

@Component({
  selector: 'app-company-insight-unpaid',
  templateUrl: './company-insight-unpaid.component.html',
  styleUrls: ['./company-insight-unpaid.component.css']
})
export class CompanyInsightUnpaidComponent implements OnInit {

  currentYear = new Date().getFullYear();
  selectedYear = this.currentYear;
  yearList = [];
  
   

  Highcharts = Highcharts;

  renderUnpaidChart = false;
  renderCTOCreditedChart = false;
  updateUnpaidFlag = false;
  updateCTOCreditedFlag = false;

  unpaidOptions: any = {
    credits: {
        text: 'Quantiam Technologies',
    },
    chart: {

        type: 'column'
    },
    title: {

        text: 'Unpaid Time Off Per Month '

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
      name:'Unpaid Hours',
    }
  ]
};

unpaidRowData;
unpaidColumnDefs = [
  {field: 'year' },
  {field: 'month' },
  {field: 'hours'}
];

CTOCreditedRowData;
CTOCreditedColumnDefs = [
  {field: 'year', },
  {field: 'month' },
  {field: 'hours'}
];
ctogridColumnApi;
unpaidgridColumnApi;

ctogridApi;
unpaidgridApi;

CTOCreditedOptions: any = {
  credits: {
      text: 'Quantiam Technologies',
  },
  chart: {

      type: 'column'
  },
  title: {

      text: 'CTO Credited Per Month (Overtime) '

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
    name:'CTO Credited to Employees',
  }
]
};
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getUnpaidData();
    this.getCTOCreditData();
  }


  getUnpaidData() {


    this.http.get(environment.apiUrl + '/timesheet/insights/company/unpaid').subscribe((r: any) => {

      this.unpaidOptions.xAxis.categories = r.categories;
      this.unpaidOptions.series[0].data = r.seriesData;
      this.unpaidRowData = r.data;
      setTimeout((x) => { this.renderUnpaidChart = true; },100);

      console.log(this.unpaidOptions);

      this.updateUnpaidFlag = true;

    })

  }
  
  getCTOCreditData() {


    this.http.get(environment.apiUrl + '/timesheet/insights/company/overtime').subscribe((r: any) => {

      this.CTOCreditedOptions.xAxis.categories = r.categories;
      this.CTOCreditedOptions.series[0].data = r.seriesData;
      this.CTOCreditedRowData = r.data;
      setTimeout((x) => { this.renderCTOCreditedChart = true; },100);

      console.log(this.CTOCreditedOptions);
       ;
      this.updateCTOCreditedFlag = true;

    })

  }


  
  onctoGridReady(params) {
    this.ctogridApi = params.api;
    this.ctogridColumnApi = params.columnApi;
    this.ctogridApi.sizeColumnsToFit();
  }
  
  onunpaidGridReady(params) {
    this.unpaidgridApi = params.api;
    this.unpaidgridColumnApi = params.columnApi;
    this.unpaidgridApi.sizeColumnsToFit();
  }

}
