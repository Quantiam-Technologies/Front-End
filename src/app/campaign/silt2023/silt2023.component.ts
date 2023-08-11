import { Component,OnInit } from '@angular/core';

import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import * as Highcharts from 'highcharts';
import { ActivatedRoute, Router, } from '@angular/router';
// import { UserService } from '../../services/user/user.service';
// import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-silt2023',
  templateUrl: './silt2023.component.html',
  styleUrls: ['./silt2023.component.css']
})
export class Silt2023Component implements OnInit {


  constructor(private http: HttpClient, private route: ActivatedRoute, ) {}
  
  
  Highcharts: typeof Highcharts = Highcharts; // required
  chartConstructor: string = 'chart'; // optional string, defaults to 'chart'
  chartOptions: Highcharts.Options = {
   
    chart: {
      type: 'column',
      backgroundColor: '#FFFFFF',
    },
    credits:{
      text:'Quantiam Technologies Inc.'
    },
    title: {
        text: 'SiLT 2023 Campaign Status',
        align: 'left'
    },
    xAxis: [{
        categories: [
          'Receiving',
          'Honing',
          'Slipcasting',
          'Debind',
          'Consolidation',
          'Posting Finish',
          'Oxide Generation',
          'Final',
          ],
          title: {
            text: 'Unit Operation'
        },
        
}],
    yAxis: {
        min: 0,
        max: 160,
        //minorGridLineWidth:0,
        gridLineWidth:0,
        title: {
            text: 'Count'
        },
        labels:{ enabled:false},
        stackLabels: {
            enabled: true
        }
    },
    
    legend: {

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
        headerFormat: '<b>{point.x}</b><br/>',
        pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}',
      
    },
    plotOptions: {
        column: {
            stacking: 'normal',
            dataLabels: {
               // enabled: true
            }
        }
    },
    series: []

  };
  chartCallback: Highcharts.ChartCallbackFunction = function (chart) { } // optional function, defaults to null
  updateFlag: boolean = false; // optional boolean
  oneToOneFlag: boolean = true; // optional boolean, defaults to false
  runOutsideAngular: boolean = false; // optional boolean, defaults to false






  ngOnInit(){

    this.fetchProducedSteelData();

  }




  fetchProducedSteelData()
  {

    var params = {};
    var totalDataArray = [];

    this.http.get(environment.apiUrl + `/campaign/29/produced`, { params: params }).subscribe((r: any) => {

      console.log(r);

      var categoryArray = [];
      var SeriesArray = [];

      var totalObject = {

        type:null,
        id: '0',
        name: "Remaining",
        data: [152,152,152,152,152],
        color:'rgba(0,0,0,0)',
        borderColor: '#FF0000',
        //borderWidth: '1px',

      }

      var SeriesObj = {};

      r.steelTypes.forEach(steelType=>{
        SeriesObj[steelType.id] = {};
        SeriesObj[steelType.id].name = steelType.part_name;
        SeriesObj[steelType.id].id = steelType.steel_type_id;
        SeriesObj[steelType.id].type = null;
        SeriesObj[steelType.id].data = [];
      })

     // console.log(SeriesObj);


      for(var propt in r.data){
        categoryArray.push(propt.toUpperCase());// Categories
        console.log(propt);
       // if(r.data[propt])
        r.data[propt].forEach((element,index) => {
          SeriesObj[element.steel_type_id].data.push(element.total);
          

        });
    }

    //console.log(categoryArray,SeriesObj);
      // console.log(categoryArray);

      this.chartOptions.series = [];

      for(var propt in SeriesObj )
      {
        this.chartOptions.series.push(SeriesObj[propt]);
      //  console.log(SeriesObj[propt]);
        SeriesObj[propt].data.forEach((element,index)=>{

          //console.log(index,element);
          totalObject.data[index] = totalObject.data[index] - element;

        })

      }

      this.chartOptions.series.unshift(totalObject);
      
    //  this.chartOptions.title.text = "This was change";
      //console.log(this.chartOptions);
      this.chartOptions.xAxis[0].categories = categoryArray;
      this.updateFlag = true; // tells the chart to update

      /*  {

        receiving:[],
        honing:[]
        slipcasting:[]
        debind:[]
        consolidation:[]

      }

      */

    })

    

  }


}
