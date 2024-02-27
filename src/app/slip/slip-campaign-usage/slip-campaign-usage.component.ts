import { Component, OnInit, OnChanges,ElementRef,ChangeDetectorRef, AfterViewInit, Input  } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { NotificationsService } from 'angular2-notifications';


interface ExtendedStackItemObject extends Highcharts.StackItemObject {
  stack: string;
}

import * as Highcharts from 'highcharts';
import more from 'highcharts/highcharts-more';
import HC_exporting from 'highcharts/modules/exporting';

more(Highcharts);
HC_exporting(Highcharts);

@Component({
  selector: 'app-slip-campaign-usage',
  templateUrl: './slip-campaign-usage.component.html',
  styleUrls: ['./slip-campaign-usage.component.css']
})
export class SlipCampaignUsageComponent implements OnInit {


  @Input() campaignID: any = null;
  campaignSlipUsageObject = null;
  updateHighchartsFlag = false;
  Highcharts: typeof Highcharts = Highcharts;
  materialObjectIndex = [];
  renderChart = false;

  point;
  total;

  powderSum = 0;
  organicSum = 0;
  SolventSum = 0;

  HighchartsOptions:any = {


 //   colors: ['#386b99', "#544fc5", "#00e272", "#fe6a35", "#6b8abc", "#d568fb", "#2ee0ca", "#fa4b42", "#feb56a", "#91e8e1"],
    credits: {
      text: 'Quantiam Technologies',
    },
    chart: {
        type: 'column',
        inverted: true,
        //polar: true,
        height:"600px",
    },
    title: {
        text: 'Material Usage',
        align: 'center'
    },
    subtitle: {
        text: 'Source: ' +
            '<a href="https://en.wikipedia.org/wiki/All-time_Olympic_Games_medal_table"' +
            'target="_blank">Wikipedia</a>',
        align: 'center'
    },
    tooltip: {
      outside: true,
      format: 
      '<b>Material ID: </b>{point.material_id}<br>' +
      '<b>Material:</b> <i>{point.name} - {point.grade}</i><br><br>' +
      '<b>Recipe ID: </b>{point.recipe_id} <br>' + 
      '<b>Recipe Name: </b>{point.recipe_name} <br><br>' + 
      '<b>Amount</b>: {point.y} g' 
   
  },

    pane: {
        size: '85%',
        innerSize: '20%',
        endAngle: 270
    },
    legend:{
      title:{text:'Recipe ID'
    }
    },
    xAxis: {
        tickInterval: 1,
        labels: {
            align: 'right',
            useHTML: true,
            allowOverlap: true,
            step: 1,
            y: 0,
            style: {
                fontSize: '10px',
                width:"110px",
                textOverflow: 'none',
                align:'right',
                textAlignLast: 'right',
            }
        },
        lineWidth: 0,
        gridLineWidth: 0,
        categories: [ ]
    },
    yAxis: {
        lineWidth: 0,
        tickInterval: 2500,
        reversedStacks: false,
        endOnTick: true,
        title:{
          text:'Weight (g)'
        },
        showLastLabel: true,
        gridLineWidth: 0,
        stackLabels:{
          enabled:true,       
          //format:"{total:.f} g",
        /*   formatter: function(this){
            
            let thing = setTimeout(()=>{
              console.log(this.axis.series[0].data[0]);
                            return this.total;
            },1000)
            return thing;
            
          } as any */
        }
    },
    plotOptions: {
        column: {
            stacking: 'normal',
            borderWidth: 0,
            pointPadding: 0,
            groupPadding: 0.15,
            borderRadius: '10%'
        }
    },
    series: []

  }

  constructor(
    private http: HttpClient,
    private notification: NotificationsService,
    private route: ActivatedRoute,
    public chartElem: ElementRef,
    private ref: ChangeDetectorRef 
    ) { 


    

  }
  
  ngOnChanges(changes)
  {
    this.getData();
  }



    ngOnInit(): void {

      

      this.route.paramMap.subscribe(params => {
        console.log(params);
        if(!this.campaignID) this.campaignID = parseInt(params.get('id'));
        // this.getData();

      })

    }

    createEmptySeriesObjects (r){

    
      this.HighchartsOptions.series = [];
      this.HighchartsOptions.xAxis.categories = [];

      r.slipRecipes.length;
      r.materials.length;
      let seriesObject;

      for (let i = 0; i <  r.slipRecipes.length; i++) {  //loop through each recipe

         seriesObject = { name: r.slipRecipes[i], data:[]};
         
        // console.log(seriesObject);

         for (let i = 0; i <  r.materials.length; i++) {

          seriesObject.data.push({y:0.0, x:0.0});

         }
         this.HighchartsOptions.series.push(seriesObject);
      }
    //  console.log(this.HighchartsOptions);


      this.updateHighchartsFlag = true;
 

    }


    getData(){

      this.powderSum = 0;
      this.organicSum = 0;
      this.SolventSum = 0;

      this.http.get<any>(environment.apiUrl + '/campaign/'+this.campaignID+'/slip/usage').subscribe(r => {  

        this.createEmptySeriesObjects(r);

        this.campaignSlipUsageObject = r;

        this.HighchartsOptions.subtitle.text = 'Campaign '+this.campaignID+'';

        this.HighchartsOptions.xAxis.categories = r.materials;

        r.measured.forEach((element,index) => {     ///requires logic to find the high amount of materials.


       

         let recipeIndex = r.slipRecipes.indexOf(element.slip_recipe_id);
         let materialIndex = r.materials.indexOf(element.slip_material_id);
         this.materialObjectIndex[materialIndex] = {name:element.name,grade:element.grade,id:element.slip_material_id};
         
        // if(!this.HighchartsOptions.xAxis.categories.includes(element.name)) this.HighchartsOptions.xAxis.categories.push(element.name);
       
         // console.log(this.materialObjectIndex);
         this.HighchartsOptions.series[recipeIndex].data[materialIndex] = {

          y: element.sum,
          name: element.name,
          grade: element.grade,
          recipe_id: element.slip_recipe_id,
          recipe_name: element.recipe_name,
          material_id: element.slip_material_id,
          x: materialIndex,

         };

         if(element.powder) this.powderSum = this.powderSum + element.sum; 
         if(element.organic) this.organicSum = this.organicSum + element.sum; 
         if(element.solvent) this.SolventSum = this.SolventSum + element.sum; 

         //console.log(recipeIndex,materialIndex);

          
        });


        /// replace axis names with Material Name
        this.HighchartsOptions.xAxis.categories = [];

        this.materialObjectIndex.forEach(material => {

          this.HighchartsOptions.xAxis.categories.push(material.name);
          
        });
      

        //this.HighchartsOptions.yAxis.stackLabels.format = '{stack} <br> {total} g' 

        this.HighchartsOptions.materialIndex = this.materialObjectIndex;

        setTimeout(()=>{
          this.renderChart = true;
        },300);
      
        
        this.updateHighchartsFlag = true;
        console.log(this.HighchartsOptions);

      });

    }



    exportCSV(type)
    {
     // console.log(row);

     let fileName;
     let rows = [];

     if(type == 'slips'){ rows = this.campaignSlipUsageObject.slips; fileName = ' Slip List'};
     if(type == 'measured'){ rows = this.campaignSlipUsageObject.measured; fileName = ' Material Usage'};
  
  
      

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
              link.setAttribute('download', 'Campaign '+this.campaignID+' - '+fileName+'.csv');
              link.style.visibility = 'hidden';
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
           // }
           // }
          }
        
  
  
    }

}
