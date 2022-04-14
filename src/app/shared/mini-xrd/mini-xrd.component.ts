import { Component, OnInit,Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NotificationsService } from 'angular2-notifications';
import { environment } from '../../../environments/environment';

import * as moment from 'moment';

import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';
HC_exporting(Highcharts);

@Component({
  selector: 'app-mini-xrd',
  templateUrl: './mini-xrd.component.html',
  styleUrls: ['./mini-xrd.component.css']
})
export class MiniXrdComponent implements OnInit {

  @Input() xrdAnalysisId:any = null; 

  constructor(  private http: HttpClient,
  private notification: NotificationsService,) { }

  selectedXrdAnalysis; //holds
  xrdAnalyses = [] as any;
  updateFlag;
  
  
  Highcharts = Highcharts;
  oneToOneFlag = true; 
  

  HighchartOptions: any = {
    chart: { zoomType: 'xy', panning: true, panKey: 'shift'},
    title: { text: '' },
    credits: { text: 'Quantiam Technologies Inc.'}, 
    subtitle: { text: ''},
    series: [],
    xAxis: [{
      gridLineWidth: 0,

      minorGridLineWidth: 0,
    }],
    yAxis: [
      {
       maxPadding: 0.25,
       tickLength: 0,
       floor: 0,
       gridLineColor: "#e6e6e600",
       tickColor: "#e6e6e600",
       minorGridLineColor: "#e6e6e600",
        title: {
          text: 'Counts',
        }
    },
      {
       maxPadding: 0.25,
       tickLength: 0,
       floor: 0,
       visible: false,
    }
  
  ],
    legend: {
      enabled: false, 
      labelFormatter: function(this:any) {

        if (this.userOptions.formula) {
          return this.userOptions.formula;
        }

        if (this.name.length > 25) {
        return this.name.slice(0, 25) + '...';
        }
        return this.name;
    }
     // align: 'right',
    //  layout: 'vertical',
    },
    hcCallback: (chart: Highcharts.Chart) => {
      console.log('some variables: ', Highcharts, chart);
    }
  };

  ngOnInit() {
  //  console.log(this.xrdAnalysisId);
    this.fetchXrdAnalysisData(this.xrdAnalysisId);

  }

  
  fetchXrdAnalysisData(id) {
    this.http.get(environment.apiUrl + '/instrument/xrd/analysis/' + id).subscribe((r:any) => {
      this.xrdAnalyses.push(r);
      this.buildChartObj();
    },
    (error) => {
      this.notification.error('Error', 'This Analysis has failed to load.', {timeOut: 2000, showProgressBar: false, clickToClose: true}); /// Daily OT notificaton
    });
  }

  buildChartObj() {


    this.HighchartOptions.series = [];
    let netSpectraPresent = false;
    this.HighchartOptions.yAxis[0].max = 0;


    this.xrdAnalyses.forEach((xrdAnalysis:any, index) => { // loop through each loaded Analyses

      if (index === 1) { this.HighchartOptions.title.text = this.HighchartOptions.title.text + ' | ' + xrdAnalysis.name; }
      if (index === 0) { this.HighchartOptions.title.text = xrdAnalysis.name; }


      xrdAnalysis.spectra.forEach(spectra => {

          
          spectra.type = 'spline';
          spectra.name = spectra.sample_name + '';
          spectra.marker = {enabled: false } ;
          spectra.visible = true ;
          if(spectra.y_max > this.HighchartOptions.yAxis[0].max){ this.HighchartOptions.yAxis[0].max = spectra.y_max; }
          if(spectra.x_end > this.HighchartOptions.yAxis[0].max){ this.HighchartOptions.xAxis[0].max = spectra.x_end; }
          if(spectra.x_start < this.HighchartOptions.xAxis[0].min){ this.HighchartOptions.xAxis[0].min = spectra.x_start; }
          if(spectra.data.length > 1000){ spectra.turboThreshold = spectra.data.length + 100; }
          this.HighchartOptions.series.push(spectra);

          if(spectra.is_net)
          {
              // create new spectra that is the new, then hide the other two
              netSpectraPresent = true;
          }

       });

    });

    if(netSpectraPresent)
    {
      this.xrdAnalyses.forEach((xrdAnalysis:any, index) => { 
        xrdAnalysis.spectra.forEach(spectra => { 
            if(!spectra.is_net){
              spectra.visible = false;
            }

        })

      })
    }


    this.xrdAnalyses.forEach((xrdAnalysis:any, index) => { // loop through each loaded Analyses

      xrdAnalysis.spectra.forEach(spectra => {
          if (spectra.patterns) {
            spectra.patterns.forEach(pattern => {
              pattern.type = 'column';
                 pattern.y = pattern.intensity * pattern.yScale;  
                 pattern.yAxis = 1;
                this.HighchartOptions.series.push(pattern);
             
            });
          }
      });

    });


     console.log(this.HighchartOptions);
   // this.firstChartLoad = false;
    this.updateFlag = true;
    //if (this.chart) { this.setReferences(); }


  }

}
