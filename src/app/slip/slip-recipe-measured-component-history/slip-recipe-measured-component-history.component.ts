import { Component, OnInit, OnChanges,ElementRef,ChangeDetectorRef, AfterViewInit  } from '@angular/core';
import { environment } from '../../../environments/environment';
import { NotificationsService } from 'angular2-notifications';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';



import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';
import HC_heatmap from 'highcharts/modules/heatmap';
import HC_treemap from 'highcharts/modules/treemap';

HC_exporting(Highcharts);
HC_heatmap(Highcharts);
HC_treemap(Highcharts);

@Component({
  selector: 'app-slip-recipe-measured-component-history',
  templateUrl: './slip-recipe-measured-component-history.component.html',
  styleUrls: ['./slip-recipe-measured-component-history.component.css']
})
export class SlipRecipeMeasuredComponentHistoryComponent  implements OnInit {

  recipeID;
  recipeObject;
  updateHighchartsFlag = false;
  updateHighchartsFlag2 = false;
  componentHistoryObject:any;
  
  Highcharts: typeof Highcharts = Highcharts;


  HighchartsOptions: any = {

    credits: {
      text: 'Quantiam Technologies',
    },

    plotOptions:{

      heatmap:{
        color:'red',
      }

    },

    chart: {
      type: 'heatmap',
      marginTop: 60,
      marginBottom: 80,
      plotBorderWidth: 1
  },


  title: {
      text: 'Lot Changes',
      style: {
          fontSize: '1em'
      }
  },
  subtitle:{
    text:'249 - CNRL Screens WC-XT (gen 2) (4L) wider viscosity range'
  },

  xAxis: {
      categories: ['Alexander', 'Marie', 'Maximilian', 'Sophia', 'Lukas',
          'Maria', 'Leon', 'Anna', 'Tim', 'Laura'],
          title: { text:'Slip ID' },
  },

  yAxis: {
      categories: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      title: { text:'Material ID' },
      reversed: true
  },

  

  colorAxis: {
    stops: [
      [0, '#FFFFFF'],
      [1, '#FAEB33']
    ]
},

  legend: {
      align: 'right',
      layout: 'vertical',
      margin: 0,
      verticalAlign: 'top',
      y: 25,
      symbolHeight: 280
  },

  tooltip: {
      format: '<b> Slip ID: </b>{series.xAxis.categories.(point.x)} <br>' +
      '<b>Material:</b>{series.yAxis.categories.(point.y)}</b><br> <i>{point.material_name} - {point.material_grade}</i><br>' +
          '<b>Lot Names:</b> {point.lot_ids}' 
  },

  series: [{
      name: 'Sales per employee',
      borderWidth: 1,
      borderColor: '#FFFFFF',
      colorAxis: 0,
      data: [],
      //color: 'red',
      dataLabels: {
        enabled: true,
        filter:{
          operator: '>',
          property: 'count',
          value: 1
        },
        format: 'Mixed'
        //color: '#808080'
    }
  }],

  responsive: {
      rules: [{
          condition: {
              maxWidth: 500
          },
          chartOptions: {
              yAxis: {
                  labels: {
                      format: '{substr value 0 1}'
                  }
              }
          }
      }]
  }

  }


  HighchartsOptions2: any = {

    credits: {
      text: 'Quantiam Technologies',
    },
    plotOptions:{

      heatmap:{
        color:'red',
      }

    },

    chart: {
      type: 'heatmap',
      marginTop: 60,
      marginBottom: 80,
      plotBorderWidth: 1
  },


  title: {
      text: 'Container Changes',
      style: {
          fontSize: '1em'
      }
  },
  subtitle:{
    text:'249 - CNRL Screens WC-XT (gen 2) (4L) wider viscosity range'
  },

  xAxis: {
      categories: ['Alexander', 'Marie', 'Maximilian', 'Sophia', 'Lukas',
          'Maria', 'Leon', 'Anna', 'Tim', 'Laura'],
          title: { text:'Slip ID' },
  },

  yAxis: {
      categories: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      title: { text: 'Material ID'},
      reversed: true
  },

  

  colorAxis: {
    stops: [
      [0, '#FFFFFF'],
      [1, '#FAEB33']
    ]
},
  legend: {
      align: 'right',
      layout: 'vertical',
      margin: 0,
      verticalAlign: 'top',
      y: 25,
      symbolHeight: 280
  },

  tooltip: {
      format: '<b> Slip ID: </b>{series.xAxis.categories.(point.x)} <br>' +
          '<b>Material:</b>{series.yAxis.categories.(point.y)}</b> <br> <i>{point.material_name} - {point.material_grade} </i><br>' +
          '<b>QCIDs: </b> {point.qcids} <br>'  
  },

  series: [{
      name: 'Sales per employee',
      borderWidth: 5,
     //borderColor: '#FFFFFF',
      colorAxis: 0,
      data: [],
      //color: 'red',
      dataLabels: {
          enabled: true,
          filter:{
            operator: '>',
            property: 'count',
            value: 1
          },
          format: 'Mixed'
          //color: '#808080'
      }
  }],

  responsive: {
      rules: [{
          condition: {
              maxWidth: 500
          },
          chartOptions: {
              yAxis: {
                  labels: {
                      format: '{substr value 0 1}'
                  }
              }
          }
      }]
  }

  }

  constructor(
    private http: HttpClient,
    private notification: NotificationsService,
    private route: ActivatedRoute,
    public chartElem: ElementRef,
    private ref: ChangeDetectorRef 
    ) {  }

    ngOnInit(): void {

      this.route.paramMap.subscribe(params => {
        console.log(params);
        this.recipeID = params.get('id');
        this.getData();

      })

      
    }

     getData(){


      this.http.get<any>(environment.apiUrl + '/slip/recipe/'+this.recipeID).subscribe(response => {  

          this.recipeObject = response;
          this.http.get<any>(environment.apiUrl + '/slip/recipe/'+this.recipeID+'/measured-component-history')
          // .pipe(delay(500))
          .subscribe(response => {
    
            this.componentHistoryObject = response;
            this.HighchartsOptions.subtitle.text = this.recipeID+' - '+this.recipeObject.recipe_name;
            this.HighchartsOptions.xAxis.categories = response.slip_ids.map(String);
            this.HighchartsOptions.yAxis.categories = response.material_ids.map(String);
            this.HighchartsOptions.series[0].data = [];
    
    
            this.HighchartsOptions2.subtitle.text = this.recipeID+' - '+this.recipeObject.recipe_name;
            this.HighchartsOptions2.xAxis.categories = response.slip_ids.map(String);
            this.HighchartsOptions2.yAxis.categories = response.material_ids.map(String);
            this.HighchartsOptions2.series[0].data = [];
    
            for (var material in response.materialHistory) {
              response.materialHistory[material].forEach(element => {
    
                this.HighchartsOptions.series[0].data.push({
                  x: Number(element.slip_index),
                  y: Number(element.material_index),
                  value: Number(element.different_lot),
                  material_name: element.name,
                  material_grade: element.grade,
                  count: element.lot_count,
                  lot_ids: element.lot_names,
                  qcids: element.qcids
                 // color: "#00FF00"
                });
    
    
              
    
                this.HighchartsOptions2.series[0].data.push({
                    x: Number(element.slip_index),
                    y: Number(element.material_index),
                    value: Number(element.different_container),
                    material_name: element.name,
                    material_grade: element.grade,
                    count: element.container_count,
                    qcids: element.qcids,
                    lot_ids: element.lot_names,
                   // color: "#00FF00"
                  
                  }
                    );
    
    
    
    
                
                
              });
    
            }
    
           
    
            this.updateHighchartsFlag = true;
            this.updateHighchartsFlag2 = true;
            console.log(this.HighchartsOptions);
    
    
          })

      })


  



    }


    SlipRecipeChanged(event){

      if (typeof event !== 'undefined') {
        this.recipeID = event.id;  
        this.getData();
        }
        else
        {
          delete this.recipeID;
        }
      
    }

}