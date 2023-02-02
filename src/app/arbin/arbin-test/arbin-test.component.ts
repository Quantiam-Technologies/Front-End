import { Component, OnInit } from '@angular/core';

import {  HttpClient} from '@angular/common/http';

import { ActivatedRoute, Router } from '@angular/router';

import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';
import HC_boost from 'highcharts/modules/boost';
import HC_map from 'highcharts/modules/map'

HC_exporting(Highcharts);
HC_boost(Highcharts);
HC_map(Highcharts);

@Component({
  selector: 'app-arbin-test',
  templateUrl: './arbin-test.component.html',
  styleUrls: ['./arbin-test.component.css']
})
export class ArbinTestComponent implements OnInit {

  constructor( private http: HttpClient,private route: ActivatedRoute,) { }

  firstEISRender;

  selectedTests:any = [];
  dataSets:any = [];
  testData:any = [];
  firstLoad = false;

  Highcharts = Highcharts;
  chart: any; // Chart Instance
  updateFlag;
  updateEISFlag;
  oneToOneFlag = true;

  indexTracker = 0;

  currentXField = 'Step_Time';
  currentYField = 'Voltage';
  fields = ['Charge_Capacity','Discharge_Capacity','Charge_Energy','Seconds','Minutes','Hours','Step_Time','Data_Point','Channel_ID','Date_Time','Current','Voltage'];
 
  eisCurrentXField = 'Zreal';
  eisCurrentYField = 'Zimg_negative';
  eisFields = ['Seconds','Minutes','Hours','EIS_Data_Point', 'Frequency','Zmod','Zphz','Zreal','Zimg','Zimg_negative','OCV','AC_AMP_RMS'];

  graphType = ['spline','scatter'];
  currentEISGraphType = 'spline';

  EISchartOptions: any = {
    chart: {  panning: true,
      zoomType: 'xy',
      panKey:'shift',
    },
    title: { text: '' },
    credits:{text: 'Quantiam Technologies', href:''},
    /* mapNavigation: {
      enabled: true,
    }, */
    tooltip: {
     // enabled: false
    },
    subtitle: { text: ''},
    series: [],
    xAxis: [{
      gridLineWidth: 0,

      minorGridLineWidth: 0,
      title:{ text: ''}
    }],
    yAxis: [{
     // maxPadding: 0.25,
     // tickLength: 0,  
     
     gridLineWidth: 0,
     minorGridLineWidth: 0,   
      title: {
        text: '',
      } 
    }],

  };

  HighchartOptions: any = {
    chart: {  panning: true,
      zoomType: 'xy',
      panKey:'shift',
    },
    exporting: {
      sourceWidth: 1920,
      sourceHeight: 1080,
      scale: 1, 
      chartOptions: {
      }
  },  
    title: { text: '' },
    credits:{text: 'Quantiam Technologies', href:''},
    /*  mapNavigation: {
      enabled: true,
      enableDoubleClickZoomTo: true,
      enableButtons:true,
    },  */
    tooltip: {
      enabled: false
    },
    subtitle: { text: ''},
    series: [],
    xAxis: [{
      gridLineWidth: 0,

      minorGridLineWidth: 0,
      title:{ text: ''}
    }],
    yAxis: [{
        maxPadding: 0.25,
       tickLength: 0,
       //floor: 0,
      title: {
        text: '',
      } 
    }],
    legend: {
      labelFormatter: function(this:any) {
        if (this.userOptions.formula) {
          return this.userOptions.formula;
        }

        if (this.name.length > 25) {
        return this.name.slice(0, 25) + '...';
        }
        return this.name;
    }
    },
    hcCallback: (chart: Highcharts.Chart) => {
      console.log('some variables: ', Highcharts, chart);
    }
  };

  ngOnInit() {

    this.route.paramMap.subscribe(params => {
      this.fetchTestData(params.get('id'));
    });
  }


  fetchTestData(id, name = null)
  {
    this.http.get('http://api.edm.quantiam.com:3000/arbin/test/'+id).subscribe((r:any) => {
       this.firstLoad = true;
       this.selectedTests.push(parseInt(id));
    
        let serie:any = {};
        serie.type = 'scatter';

        r.forEach((element) => {

            element.x = element[this.currentXField];
            element.y = element[this.currentYField];
          
          
        });

        this.HighchartOptions.xAxis[0].title.text = this.currentXField;
        this.HighchartOptions.yAxis[0].title.text = this.currentYField;

      
        serie.data = r;
        serie.name =  '('+id+') ' + r[0].Test_Name;
        serie.Test_ID =  r[0].Test_ID;
        serie.boostThreshold = 1;
        // serie.keys = ['name','test','test','y', 'test','test', 'test', 'test','test','test','x'];
        serie.turboThreshold = 0;
        serie.marker = {};
        serie.marker.radius = 2;
        //console.log(serie);



        this.HighchartOptions.series.push(serie);
        
       // this.updateSeriesNamesFromValues();

         this.updateFlag = true;

         setTimeout(()=>{

          this.fetchEISData(id,serie.name);
         },2000);
           
    }, error => { 

      console.log(error);
    });
  }

  fetchEISData(id, name = null)
  {
    this.http.get('http://api.edm.quantiam.com:3000/arbin/test/eis/'+id).subscribe((r:any) => {
       //this.firstLoad = true;
       //this.selectedTests.push(parseInt(id));
    
        let serie:any = {};
        serie.type = this.currentEISGraphType;

        r.forEach((element) => {

            element.x = element[this.eisCurrentXField];
            element.y = element[this.eisCurrentYField];
          
          
        });

        this.EISchartOptions.xAxis[0].title.text = this.eisCurrentXField;
        this.EISchartOptions.yAxis[0].title.text = this.eisCurrentYField;

      
        serie.data = r;
        serie.name =  name;
         serie.Test_ID =  id;
        //serie.boostThreshold = 1;
        // serie.keys = ['name','test','test','y', 'test','test', 'test', 'test','test','test','x'];
       // serie.turboThreshold = 0;
        serie.marker = {};
        serie.marker.radius = 3;
        console.log(serie);



        this.EISchartOptions.series.push(serie);
        //console.log(this.EISchartOptions);
        
       // this.updateSeriesNamesFromValues();
         this.indexTheDataSets();

         this.updateEISFlag = true;
           
    }, error => { 

      console.log(error);
    });
  }

  chartCallback(){

  }

  changeAxis(){


  }

  updateSeriesNamesFromValues()
  {
        this.selectedTests.forEach((e,i) => {
          
          this.HighchartOptions.series[i].name = e.Test_Name;
          console.log(this.HighchartOptions.series[i]);
      });
  }

  changeEISFields()
  {
    this.EISchartOptions.series.forEach(series => {
      
          series.data.forEach(dataPoint => {

            dataPoint.x = dataPoint[this.eisCurrentXField];
            dataPoint.y = dataPoint[this.eisCurrentYField];
            
          });
      
    });

    this.EISchartOptions.xAxis[0].title.text = this.eisCurrentXField;
    this.EISchartOptions.yAxis[0].title.text = this.eisCurrentYField;

    this.updateEISFlag = true;
  }

  changeEISGraphType()
  {
    this.EISchartOptions.series.forEach(series => {

      series.type = this.currentEISGraphType;
    })

    this.updateEISFlag = true;
  }

  changeFields() 
  {
    this.HighchartOptions.series.forEach(series => {
      
          series.data.forEach(dataPoint => {

            dataPoint.x = dataPoint[this.currentXField];
            dataPoint.y = dataPoint[this.currentYField];
            
          });
      
    });

    this.HighchartOptions.xAxis[0].title.text = this.currentXField;
    this.HighchartOptions.yAxis[0].title.text = this.currentYField;

    this.updateFlag = true;
  }

  testAdded(event){
    //console.log(event);
    this.fetchTestData(event.Test_ID,event.Test_Name);
    
  }

  selectedTestsCleared(){


  }

  testsChanged(event)
  {
    console.log(event);
  }

  testRemoved(event){
  
    console.log(event.value.Test_ID);
    this.HighchartOptions.series = this.HighchartOptions.series.filter(function( obj ) {
        return obj.Test_ID !== event.value.Test_ID;
    });

    console.log(this.HighchartOptions.series);

      this.EISchartOptions.series = this.EISchartOptions.series.filter(function( obj ) {
        return obj.Test_ID !== event.value.Test_ID;
    });
    
    console.log(this.EISchartOptions.series);
 

    this.updateFlag = true;
    this.updateEISFlag = true;

  }

  selectedGraphViewChanged(event)
  {
     if(event.value === 'EIS'){ this.firstEISRender = true; }
     if(event.value === 'data_sets'){ this.indexTheDataSets(); }
  }

  indexTheDataSets()
  {
    this.dataSets = [];

    this.HighchartOptions.series.forEach((element,index) => {
    
        this.dataSets.push({
          test_id: element.data[0].Test_ID,
          name: element.name,
          type: 'IV',
          index: index
        })
      
    });

    this.EISchartOptions.series.forEach((element,index) => {
    
      try{
      this.dataSets.push({
        test_id: element.data[0].Test_ID,
        name: element.name,
        type: 'EIS',
        index: index
      })
    } catch (e) {}
    
  });
  }

  exportCSV(row)
  {
    console.log(row);

    let rows = [];
    if(row.type === 'EIS'){
      rows = this.EISchartOptions.series[row.index].data;
    }
    if(row.type ==='IV'){
      rows = this.HighchartOptions.series[row.index].data;
    }

        const separator = ',';
        const keys = Object.keys(rows[0]);
        const csvContent =
          keys.join(separator) +
          '\n' +
          rows.map(row => {
            return keys.map(k => {
              let cell = row[k] === null || row[k] === undefined ? '' : row[k];
              cell = cell instanceof Date
                ? cell.toLocaleString()
                : cell.toString().replace(/"/g, '""');
              if (cell.search(/("|,|\n)/g) >= 0) {
                cell = `"${cell}"`;
              }
              return cell;
            }).join(separator);
          }).join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
     /*    if (navigator.msSaveBlob) { // IE 10+
          navigator.msSaveBlob(blob, row.name);
        } else { */
          const link = document.createElement('a');
          if (link.download !== undefined) {
            // Browsers that support HTML5 download attribute
            const url = URL.createObjectURL(blob);
            link.setAttribute('href', url);
            link.setAttribute('download', row.name+' '+row.type+'.csv');
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
         // }
         // }
        }
      


  }

 

}
