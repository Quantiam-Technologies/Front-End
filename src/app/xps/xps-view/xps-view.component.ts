import { Component, OnInit, ViewChild } from '@angular/core';

import { environment } from '../../../environments/environment';
import { XpsService } from '../../services/xps/xps.service';
import { ActivatedRoute } from '@angular/router';
import { UntypedFormBuilder, FormGroup }   from '@angular/forms';
// import { Chart } from 'angular-highcharts';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap, delay, shareReplay, publishReplay, refCount } from 'rxjs/operators';

@Component({
  selector: 'app-xps-view',
  templateUrl: './xps-view.component.html',
  styleUrls: ['./xps-view.component.css']
})
export class XpsViewComponent implements OnInit {




  constructor(
  private fb: UntypedFormBuilder,
  private xpsService: XpsService,
  private route: ActivatedRoute,
  public http: HttpClient,
  ) {

    this.chartBuilder();

    }

   xpsRun$: any; 
   xpsRun: any;
   rowData: any;
   chart: any;
   edit: boolean = false;
   id: string;
   gridApi: any;
   gridColumnApi: any;
   paginationPageSize;
  
   sampleTypeList = [
	  
      {id: 'Coupon'},
      {id: 'Powder'},

	  ];

    scanTypeList = ['Wide', 'Narrow', 'Mulitplex'];
    anodTypeList = ['Mg', 'Al', 'Focussed', 'Diffuse'];



   private columnDefs = [
        {headerName: 'Created', field: 'created_at', width: 260},
        {headerName: 'Filename', field: 'path',  valueGetter: function aPlusBValueGetter(params) {

                let filename = params.data.path.replace(/^.*[\\\/]/, '');
                return filename;
        }, width: 300},
        // {headerName: 'ID', field: 'id', width:100},
        {headerName: 'Element', field: 'element', },
        {headerName: 'Energy', field: 'energy', hide: true},
        {headerName: 'Start', field: 'start_energy', },
        {headerName: 'End', field: 'end_energy', },
        {headerName: 'Anode', field: 'anode', },
        {headerName: 'TPS', field: 'time_per_step', type: 'numericColumn'},
        {headerName: 'Region', field: 'region', type: 'numericColumn'},
        {headerName: 'Cycle', field: 'cycle', suppressMenu: true,  type: 'numericColumn'},
        {headerName: 'Sweep', field: 'sweeps', type: 'numericColumn'},
        {headerName: 'Steps', field: 'steps', type: 'numericColumn'},
        {headerName: 'Duration (s)', field: 'duration', },

        // {headerName: '', field: 'sample_name',},
        /* {headerName: 'Hours',field: 'duration',  type: "numericColumn", valueGetter: function aPlusBValueGetter(params) {

          if(params.data.duration)
          {
            return parseFloat((params.data.duration/60/24).toFixed(2));
          }
           return null;
        }}, */


    ];

  ngOnInit() {

    this.id  = this.route.snapshot.params['id'];  //obtain ID from route

    this.xpsService.get(this.id);

    this.xpsRun$ = this.xpsService.xpsRun$.subscribe(r => {

      this.xpsRun = r;
       this.rowData = r.analyses;



        if (this.rowData) { this.getAnalysisData(this.rowData[0]); }

      console.log(r);


    });


  }

  chartBuilder() {

  //  this.chart = new Chart({
  //   chart: {
  //     type: 'line',
  //     backgroundColor:'rgba(255, 255, 255, 0.0)'
  //   },
  //   title: {
  //     text: 'XPS Data'
  //   },
  //   xAxis:{
  //     title:{
  //       text:'Energy (eV)',
  //     }
  //   },
  //   yAxis:{
  //     title:{
  //       text:'Counts',
  //     }
  //   },
  //   credits: {
  //     enabled: false
  //   },
  //   series: []
  // });

  }

  add() {
    this.chart.addPoint(Math.floor(Math.random() * 10));



  }

   onRowDoubleClicked(event) {
    this.getAnalysisData(event.data);


  }

  getAnalysisData(analysisObject: any) {
     this.http.get<any>(environment.apiUrl + '/xps/run/analysis/' + analysisObject.id + '/data').pipe(
        tap( r => {

                    }), // set id to be last_id
        map( (r) => {




            let res = r;


            return res;
          }), // return results without transformation
        catchError((err) => {

         // this.notification.error(id,'Does not exist.',{showProgressBar:false,timeOut:3000,clickToClose: true});
          return err;
         }),
      )
      .subscribe(
        (r: any) => {



              let filename = analysisObject.path.replace(/^.*[\\\/]/, '');
              let newSeries: any = {};

              newSeries.data = r;
              newSeries.name = 'Element: ' + analysisObject.element + ' || ' + filename;
              newSeries.turboThreshold = 5000;

             this.chart.removeSeries(0);
             this.chart.addSeries(newSeries);


      }
      );


  }

  onPageSizeChanged(newPageSize) {
    let value = (<HTMLInputElement>document.getElementById('page-size')).value;
    this.gridApi.paginationSetPageSize(Number(value));
  }



  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    setTimeout(() => {  this.gridApi.sizeColumnsToFit(); }, 400);
   // this.autoSizeAll();

  }

  autoSizeAll() {
    var allColumnIds = [] as any;
    this.gridColumnApi.getAllColumns().forEach(function(column, i) {

       allColumnIds.push(column.colId);
    });
    this.gridColumnApi.autoSizeColumns(allColumnIds);
  }


  ngOnDestroy() {
    if (this.xpsRun$ ) this.xpsRun$.unsubscribe();


  }

  updateXpsRun (sampleName) {}
  updateContainerField (event, thing) {}

}
