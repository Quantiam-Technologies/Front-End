import { Component, OnInit } from '@angular/core';

import { environment } from '../../../environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NotificationsService } from 'angular2-notifications';

import * as moment from 'moment';

import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';
HC_exporting(Highcharts);

@Component({
  selector: 'app-xrd-view',
  templateUrl: './xrd-view.component.html',
  styleUrls: ['./xrd-view.component.css']
})
export class XrdViewComponent implements OnInit {

  constructor(  private http: HttpClient,
    private notification: NotificationsService,
    private route: ActivatedRoute) { }

    xrdAnalyses = [] as any;
    images;
    xrdAnalysisId;
    firstChartLoad = true;

    Highcharts = Highcharts;
    chart: any; // Chart Instance
    updateFlag;
    userOptions
    oneToOneFlag = true;
    HighchartOptions: any = {
      chart: { zoomType: 'xy', panning: true, panKey: 'shift'},
      title: { text: '' },
      credits: { text: 'Quantiam Technologies'},
      subtitle: { text: ''},
      series: [],
      xAxis: [{
        gridLineWidth: 0,

        minorGridLineWidth: 0,
      }],
      yAxis: [{
         maxPadding: 0.25,
         tickLength: 0,
         floor: 0,
         gridLineColor: '#e6e6e600',
         tickColor: '#e6e6e600',
         minorGridLineColor: '#e6e6e600',
        title: {
          text: 'Counts',
        }
      },
      {
        visible: false,
        floor: 0,
        min: 0,
        max: 0,
     }],
      legend: {
        labelFormatter: function(this:any) {
          // do truncation here and return string
          // this.name holds the whole label
          // for example:
        //  console.log(this);
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

    patterns: any[];

  ngOnInit() {

    this.route.paramMap.subscribe(params => {

      this.fetchXrdAnalysisData(params.get('id'), true);
    });
  }


  chartCallback: Highcharts.ChartCallbackFunction = (chart) => {
    this.chart = chart;
    this.setReferences();
    // console.log(this.updateFlag, this.HighchartOptions);

  }

  setReferences() {

   // this.HighchartOptions.yAxis[0].max =  this.chart.yAxis[0].dataMax;
   // this.HighchartOptions.yAxis[0].min =  this.chart.yAxis[0].dataMin;
   // this.HighchartOptions.xAxis[0].min =  this.chart.xAxis[0].dataMin;
    // this.HighchartOptions.xAxis[0].max =  this.chart.xAxis[0].dataMax;
  }

  fetchXrdAnalysisData(id, routeChange = false) {
    this.http.get(environment.apiUrl + '/instrument/xrd/analysis/' + id).subscribe((r) => {

      if (routeChange) {  this.xrdAnalyses = []; }
       this.xrdAnalyses.push(r);
      this.buildChartObj();
      this.fetchXrdAnalysisImages(id);
    },
    (error) => {
      this.notification.error('Error', 'This Analysis has failed to load.', {timeOut: 2000, showProgressBar: false, clickToClose: true}); /// Daily OT notificaton
    });
  }


  buildChartObj() {


    this.HighchartOptions.series = [];
    let netSpectraPresent = false;
    this.HighchartOptions.yAxis[0].ceiling = 0;
    this.HighchartOptions.yAxis[1].ceiling = 0;
    this.HighchartOptions.yAxis[1].max = 0;


    this.xrdAnalyses.forEach((xrdAnalysis, index) => { // loop through each loaded Analyses

      if (index === 1) { this.HighchartOptions.title.text = this.HighchartOptions.title.text + ' | ' + xrdAnalysis.name; }
      if (index === 0) { this.HighchartOptions.title.text = xrdAnalysis.name; }


      xrdAnalysis.spectra.forEach(spectra => {

          spectra.type = 'spline';
          spectra.name = spectra.sample_name + '';
          spectra.marker = {enabled: false } ;
          spectra.visible = true ;
          if (spectra.y_max > this.HighchartOptions.yAxis[0].ceiling) { this.HighchartOptions.yAxis[0].ceiling = spectra.y_max; }
          if (spectra.y_max > this.HighchartOptions.yAxis[1].ceiling) { this.HighchartOptions.yAxis[1].ceiling = spectra.y_max; this.HighchartOptions.yAxis[1].max =  this.HighchartOptions.yAxis[1].ceiling; }
          if (spectra.x_end > this.HighchartOptions.yAxis[0].max) { this.HighchartOptions.xAxis[0].max = spectra.x_end; }
          if (spectra.x_start < this.HighchartOptions.xAxis[0].min) { this.HighchartOptions.xAxis[0].min = spectra.x_start; }
          if (spectra.data.length > 1000) { spectra.turboThreshold = spectra.data.length + 100; }
          this.HighchartOptions.series.push(spectra);

          if (spectra.is_net) {
              // create new spectra that is the new, then hide the other two
              netSpectraPresent = true;
          }

       });

    });

    if (netSpectraPresent) {
      this.xrdAnalyses.forEach((xrdAnalysis, index) => {
        xrdAnalysis.spectra.forEach(spectra => {
            if (!spectra.is_net) {
              spectra.visible = false;
            }

        });

      });
    }


    this.xrdAnalyses.forEach((xrdAnalysis, index) => { // loop through each loaded Analyses

      xrdAnalysis.spectra.forEach(spectra => {
          if (spectra.patterns) {
            spectra.patterns.forEach(pattern => {
              pattern.type = 'column';
              pattern.yAxis = 1;
              pattern.y = pattern.intensity * pattern.yScale;
              if (pattern.display) {
                this.HighchartOptions.series.push(pattern);
              }
            });
          }
      });

    });


    console.log(this.HighchartOptions);
    this.firstChartLoad = false;
    this.updateFlag = true;
    if (this.chart) { this.setReferences(); }


  }


  yScaleChange(pattern) {

    const found = this.HighchartOptions.series.find((series) => {

        if (series.name === pattern.name && series.formula === pattern.formula) {
          return series;
        }

    });

   // console.log(found);

    found.data.forEach((point) => {
        point.y = point.intensity * pattern.y_scale;
    });
    console.log(this.HighchartOptions.series);
    this.updateFlag = true;
    return;

  }





  generateXrdCSV () {
		console.log(this.HighchartOptions.series);

    const csvData = [] as any;

		this.HighchartOptions.series[0].data.forEach((series, pointIndex) => {

			const temp = [] as any;

			for (let i = 0; i < this.HighchartOptions.series.length; i++) {

					if (this.HighchartOptions.series[i].type === 'spline') { temp[i] = this.HighchartOptions.series[i].data[pointIndex].y; }

				}

				temp.unshift(this.HighchartOptions.series[0].data[pointIndex].x);

				csvData.push(temp);


		});
		const headers = ['Two Theta'];
		this.HighchartOptions.series.forEach((series) => {

					series.turboThreshold = 0;
					if (series.type === 'spline') {  headers.push(series.name); }

			});

		// Patterns

		this.HighchartOptions.series.forEach((series) => {

		// console.log(series);

				if (series.type === 'column') {
					headers.push('Two Theta ' + series.name);
					headers.push(series.name);

					series.data.forEach((data, i) => {

							csvData[i].push(data.x);
							csvData[i].push(data.y);

						});

				}


			});



		csvData.unshift(headers);
	// 	console.log(csvData);


		const lineArray = [] as any;
		csvData.forEach( (infoArray:any, index) => {
			const line = infoArray.join(',');
			lineArray.push(index === 0 ? 'data:text/csv;charset=utf-8,' + line : line);
		});
		const csvContent = lineArray.join('\n');

		// console.log(csvContent);

    const encodedUri = encodeURI(csvContent);
		const link = document.createElement('a');
		link.setAttribute('href', encodedUri);
		link.setAttribute('download', this.HighchartOptions.title.text + '.csv');
		document.body.appendChild(link); // Required for FF
		link.click();
		document.body.removeChild(link);

	}

  fetchXrdAnalysisImages(id) {
    this.images = [];
    this.http.get(environment.apiUrl + '/instrument/xrd/analysis/' + id + '/images?filterSpinner').subscribe((r: any) => {


      this.images = r.images;
      console.log(this.images);
    },
    (error) => {
      this.notification.error('Error', 'Fetching images has failed to load.', {timeOut: 2000, showProgressBar: false, clickToClose: true}); /// Daily OT notificaton
    });
  }




}
