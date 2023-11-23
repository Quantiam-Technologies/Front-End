import { Component,OnInit } from '@angular/core';

import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import * as Highcharts from 'highcharts';
import { ActivatedRoute, Router, } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-throughput',
  templateUrl: './throughput.component.html',
  styleUrls: ['./throughput.component.css']
})
export class ThroughputComponent {

  
  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router ) {}
  
  urlProcessViewMap = {
    slipcast: "http://old.edm.quantiam.com/#!/slipcast/",
    furnace_run: "http://old.edm.quantiam.com/#!/furnacerun/"
  };

  displayReworkTable = false;
  displayHoldTable = true;
  displayFailureTable = false;

  Highcharts: typeof Highcharts = Highcharts; // required
  chartConstructor: string = 'chart'; // optional string, defaults to 'chart'
  chartCallback: Highcharts.ChartCallbackFunction = function (chart) { } // optional function, defaults to null
  updateFlag: boolean = false; // optional boolean
  oneToOneFlag: boolean = true; // optional boolean, defaults to false
  runOutsideAngular: boolean = false; // optional boolean, defaults to false
  throughputResponse; 
  ReworkHoldFailureResponse;

  chartOptions: Highcharts.Options  = { 
   
    chart: {
      type: 'column',
      backgroundColor:null
    },
    credits:{
      text:'Quantiam Technologies Inc.'
    },
    title: {
        text: 'Operation Throughput',
        align: 'center'
    },
    xAxis: [{
        categories: [
          '2023-26',
          '2023-27', 
          '2023-28',
          ],
          title: {
            text: 'Week'
        },
        
}],
    yAxis: {
        min: 0,
        //max: 100,
        //minorGridLineWidth:0,
        gridLineWidth:0,
        title: {
            text: 'Steel Processed'
        },
        labels:{ enabled:false},
        stackLabels: {
            enabled: true
        }
    },
     
    legend: {
      enabled:true,
      itemMarginTop: 10,
      itemMarginBottom: 10,
        align: 'center',
      
        verticalAlign: 'bottom',
       
       // floating: true,
        backgroundColor:
        Highcharts.defaultOptions.legend.backgroundColor || 'white',
        borderColor: '#CCC',
        borderWidth: 1,
        shadow: false,
        itemStyle:{"fontSize": "10px", "fontWeight": "bold"}
        
    },
    tooltip: {
        headerFormat: 'Week - <b>{point.x}</b><br/>',
        pointFormatter: function(){ 

          let point = this,
          series = point.series;

          let string = '';

          if(point.y > 0){
            string = string +  '<span style="color:'+series.color+'">'+series.name+':</span> '+point.y+'<br/>';
          }
          
          return string;
        },
        shared:true,
      
    },
    plotOptions: {
        column: {
            stacking: 'normal',
            dataLabels: {
               // enabled: true
            }
        }
    },
    series: [/* {
      name: 'BPL',
      type:null,
      data: [3, 5, 1, 13]
  }, {
      name: 'FA Cup',
      type:null,
      data: [14, 8, 8, 12]
  }, {
      name: 'CL',
      type:null,
      data: [0, 2, 6, 3]
  } */]

  };

  ngOnInit(){

    this.fetchThroughputSteelData();
    this.fetchReworkHoldFailureStatus();
  }

  fetchReworkHoldFailureStatus()
  {

    var params = {};
    this.http.get(environment.apiUrl + `/campaign/29/ReworkHoldFailureSummary`, { params: params }).subscribe((r: any) => {
      
      this.ReworkHoldFailureResponse = r;

    })

  }


  fetchThroughputSteelData()
  {

    var params = {};
    var totalDataArray = [];

    this.http.get(environment.apiUrl + `/campaign/29/throughput`, { params: params }).subscribe((r: any) => {

      //console.log(r);
      this.throughputResponse = r;
      
      var categoryArray = [];
      var SeriesArray = [];
      this.chartOptions.series = [];

      this.chartOptions.xAxis[0].categories = r.weeks;
     
      var currentWeek = moment().format('YYYY-WW');
      if(!r.weeks.includes(currentWeek)) this.chartOptions.xAxis[0].categories.push(currentWeek);
  
  

      for(var unitOperation in r.steel_data )
      {
      
        var seriesObj:any = {
          name: unitOperation,
          type: null,
          data:[]

        };

        //first populate data array in series with unique weeks as a placeholder
        r.weeks.forEach(element => { seriesObj.data.push(0); });
        var categoryIndex = null;
        //identify matching weeks and replace index.
        r.steel_data[unitOperation].forEach((object) => {

          //console.log(unitOperation,object);
          if(r.weeks.indexOf(object.week) >= 0){ 

            //console.log(r.weeks.indexOf(object.week));
            seriesObj.data[r.weeks.indexOf(object.week)] = object.total;

          }

        });

       // console.log(seriesObj);

        this.chartOptions.series.push(seriesObj); 

      }

     // console.log(this.chartOptions);
      this.updateFlag = true; // tells the chart to update

     

    })

    

  }

  navigateToProcess(navigateToProcess)
  {
    if(navigateToProcess.view_type === 'furnace_run') 
    {
      this.router.navigateByUrl('/furnace/run/'+navigateToProcess.process_id);
    }
    else
    {
    if(this.urlProcessViewMap.hasOwnProperty(navigateToProcess.view_type)) window.open(this.urlProcessViewMap[navigateToProcess.view_type]+navigateToProcess.process_id, "_blank");
    }
  }


  changeReworkHoldFailure(ReworkHoldFailure)
  {
    if(ReworkHoldFailure == 'rework'){

      this.displayReworkTable = true;
      this.displayHoldTable = false;
      this.displayFailureTable = false;
    }

    if(ReworkHoldFailure == 'hold'){

      this.displayReworkTable = false;
      this.displayHoldTable = true;
      this.displayFailureTable = false;
    }

    if(ReworkHoldFailure == 'fail'){

      this.displayReworkTable = false;
      this.displayHoldTable = false;
      this.displayFailureTable = true;
    }
  }


}
