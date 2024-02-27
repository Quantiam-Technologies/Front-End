import { Component, OnInit, OnChanges,ElementRef,ChangeDetectorRef, AfterViewInit, Input  } from '@angular/core';
import { environment } from '../../../environments/environment';
import { NotificationsService } from 'angular2-notifications';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';




import * as Highcharts from 'highcharts';
import more from 'highcharts/highcharts-more';
import HC_exporting from 'highcharts/modules/exporting';

more(Highcharts);
HC_exporting(Highcharts);

@Component({
  selector: 'app-slip-campaign-production',
  templateUrl: './slip-campaign-production.component.html',
  styleUrls: ['./slip-campaign-production.component.css']
})
export class SlipCampaignProductionComponent implements OnInit {

  @Input() campaignID: any = 35;
  
  campaignProductionObject = null;
  updateHighchartsFlag = false;
  numberOfContainers:number = 0;
  totalOperatorTime:number = 0;
  Highcharts: typeof Highcharts = Highcharts;

  ngOnChanges(changes)
  {
    this.getData();
  }


  HighchartsOptions:any = {

    //colors: ['#386b99', "#544fc5", "#00e272", "#fe6a35", "#6b8abc", "#d568fb", "#2ee0ca", "#fa4b42", "#feb56a", "#91e8e1"],
    credits: {
      text: 'Quantiam Technologies',
    },
    chart: {
      zoomType: 'xy'
  },
  title: {
      text: 'Slip Weighing',
      align: 'center'
  },
  subtitle: {
      text: '',
      align: 'center'
  },
  xAxis: [{
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
          'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      crosshair: true
  }],
  yAxis: [{ // Primary yAxis
      labels: {
          format: '{value} mins',
          style: {
              color: Highcharts.getOptions().colors[1]
          }
      },
      title: {
          text: 'Time',
          style: {
              color: Highcharts.getOptions().colors[1]
          }
      }
  }, { // Secondary yAxis
      title: {
          text: 'Materials Measured',
          style: {
              color: Highcharts.getOptions().colors[0]
          }
      },
      labels: {
          format: '{value}',
          style: {
              color: Highcharts.getOptions().colors[0]
          }
      },
      opposite: true
  }],
  tooltip: {
      shared: true,
      format:'<b>{point.date}</b><br>'+
      '<span style="color:#2caffe">●</span> Materials Measured: {point.unique_containers}<br>'+
      '<span style="color:#544fc5">●</span> Operator Time: {point.minutes} mins<br>'+
      '   Slips Modified: {point.slips} <br>'+
      '   Total Mass: {point.sum} g',

      //   '<b>Material:</b>{series.yAxis.categories.(point.y)}</b><br> <i>{point.material_name} - {point.material_grade}</i><br>' + #544fc5
  },
  legend: {
     // align: 'bottom',
     // x: 80,
     // verticalAlign: 'top',
     // y: 40,
     // floating: true,
      backgroundColor:
          Highcharts.defaultOptions.legend.backgroundColor || // theme
          'rgba(255,255,255,0.25)'
  },
  series: [{
      name: 'Materials Measured',
      type: 'column',
      yAxis: 1,
      data: [27.6, 28.8, 21.7, 34.1, 29.0, 28.4, 45.6, 51.7, 39.0,
          60.0, 28.6, 32.1],
      tooltip: {
          valueSuffix: ''
      }

  }, {
      name: 'Operator Time',
      type: 'spline',
      data: [-13.6, -14.9, -5.8, -0.7, 3.1, 13.0, 14.5, 10.8, 5.8,
          -0.7, -11.0, -16.4],
      tooltip: {
          valueSuffix: ' mins'
      }
  }]


  };


  constructor(
    private http: HttpClient,
    private notification: NotificationsService,
    private route: ActivatedRoute,
    public chartElem: ElementRef,
    private ref: ChangeDetectorRef 
    ) { }



    ngOnInit(): void {

      

      this.route.paramMap.subscribe(params => {
       // console.log(params);
        if(!this.campaignID) this.campaignID = parseInt(params.get('id'));
        //this.getData();

      })

    }



  getData(){


    this.http.get<any>(environment.apiUrl + '/campaign/'+this.campaignID+'/slip/production').subscribe(r => { 

      
      this.HighchartsOptions.series[0].data = [];
      this.HighchartsOptions.series[1].data = [];

      this.HighchartsOptions.xAxis[0].categories = this.getDates(r.first,r.last)

      this.HighchartsOptions.xAxis[0].categories.forEach(element => {

        this.HighchartsOptions.series[0].data.push({y:0,slips:0,sum:0,date:element,unique_containers:0,minutes:0});
        this.HighchartsOptions.series[1].data.push({y:0,slips:0,sum:0,date:element,unique_containers:0,minutes:0});
        
      });


      this.HighchartsOptions.subtitle.text = 'Campaign '+this.campaignID+ '';

      this.totalOperatorTime = 0;
       //set Time used values
      r.production.forEach(e => {


        //this.numberOfContainers = e.unique_containers + this.numberOfContainers;
        this.totalOperatorTime = e.minutes + this.totalOperatorTime;


        let index = this.HighchartsOptions.xAxis[0].categories.indexOf(e.date);
      
        let point2 = {
          y: e.minutes,
          slips: e.slips,
          sum: e.sum,
          date:e.date,
          unique_containers: e.unique_containers,
          minutes: e.minutes
        };
        let point = {
          y: e.unique_containers,          
          slips: e.slips,
          sum: e.sum,
          date:e.date,          
          unique_containers: e.unique_containers,
          minutes: e.minutes
        };

       // console.log(point,point2);

        this.HighchartsOptions.series[0].data[index] = point;
        this.HighchartsOptions.series[1].data[index] = point2;   
        
        /// if next date isn't +1, add an empty array
        
        

      });


      this.totalOperatorTime = this.totalOperatorTime/60;
           
        

      console.log(this.HighchartsOptions);


      this.campaignProductionObject = r;
      this.updateHighchartsFlag = true;
     })
  }


 getDates (startDate, endDate) {
        // start date
       startDate = new Date(startDate);

      // end date
       endDate = new Date(endDate);

      // array of dates
      const datesArray = [];

      // loop from start date to end date
      for (
            let date = startDate; 
            date <= endDate; 
            date.setDate(date.getDate() + 1)       
            

          ) 
      {
        
        const result = date.toISOString().split('T')[0]
        datesArray.push(result);
      }

      return datesArray;
  }


  exportCSV(type)
  {
   // console.log(row);

    let rows = [];
    let fileString = '';
    if(type =='measured') {rows = this.campaignProductionObject.measured; fileString = 'Measured Containers Log'; }
    if(type =='production') { rows = this.campaignProductionObject.production; fileString = 'Daily Production Summary'; }


        const separator = ',';
        const keys = Object.keys(rows[0]);
        const csvContent =
          keys.join(separator) +
          '\n' +
          rows.map(row => {
            return keys.map(k => {
              let cell = row[k] === null || row[k] === undefined ? '' : row[k];

              //if(typeof cell === 'object' && cell !== null) return null;
              //console.log(cell,k);
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
            link.setAttribute('download', 'Campaign '+this.campaignID+' - '+fileString+'.csv');
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
         // }
         // }
        }
      


  }

  

}
