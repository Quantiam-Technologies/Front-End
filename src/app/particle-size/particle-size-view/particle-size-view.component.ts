import { Component, OnInit, OnChanges,ElementRef,ChangeDetectorRef, AfterViewInit  } from '@angular/core';
import { environment } from '../../../environments/environment';
import { NotificationsService } from 'angular2-notifications';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../../services/user/user.service';
import { MaterialLotContainerService } from '../../services/material-lot-container/material-lot-container.service';
import { C } from '@angular/cdk/keycodes';

import { Pipe, PipeTransform} from '@angular/core';
import { DomSanitizer } from "@angular/platform-browser";

import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';
HC_exporting(Highcharts);

@Component({
  selector: 'app-particle-size-view',
  templateUrl: './particle-size-view.component.html',
  styleUrls: ['./particle-size-view.component.css'],
})
export class ParticleSizeViewComponent implements OnInit, AfterViewInit {

  runID;
  particleSizeRun:any;
  materialHistoryObject:any;
  
  
  Highcharts: typeof Highcharts = Highcharts;
	
  d10Array = [];
  d50Array = [];
  d90Array = [];

  
  updateMaterialhistoryFlag = false;

  masterSizerHistoryChartOptions: any = {
    
    credits: {
      text: 'Quantiam Technologies',
    },
    title: {
      text:'Chart Title',
    },
    subtitle: {
      text:'Chart Title',
    },
    tooltip: {
      crosshairs: true,
      shared: true
  },
    yAxis:{
      title:{
        text:'Microns'
      },
      
    },
    series: [
      {
        "name": "d10",
        "type": "line",
        "data": [
          { y: 5.08, 'date':"test"},
        ]
      },
      {
        "name": "d50",
        "type": "line",
        "data": [          
          { y: 5.08, 'date':"test"},
        ]
      }
      ,{
        "name": "d90",
        "type": "line",
        "data": [          
          { y: 5.08, 'date':"test"},
        ]
      }
    ],

  }
  
  
  
  
  
  
  
  
  container: any;
  margin:any;
  width;
  height;
  safeurl;
   
  noMeasurements = true;

  //JQX
  pageable: boolean;
  columnsResize: boolean;
  pagerButtonsCount: number
  multiplerowsextended: boolean;
  pdfUrl:string;
 

  source: any =
  {
      dataType: 'array',
      dataFields:
      [
          { name: 'date', type: 'string' },
          { name: 'd10', type: 'number' },
          { name: 'd50', type: 'number' },
          { name: 'd90', type: 'number' },
          { name: 'laser_obscuration', type: 'number' },
         // { name: 'particle_density', type: 'number' },
         // { name: 'particle_refractive_index', type: 'number' },
          
          
      ]
  };
  dataAdapter;
  columns: any[] =
  [
      { text: 'Date', dataField: 'date', },
      { text: 'D10', dataField: 'd10', },
      { text: 'D50', dataField: 'd50', },
      { text: 'D90', dataField: 'd90', },
      { text: 'Obscuration', dataField: 'laser_obscuration', },

  ];


  constructor(
    private sanitizer: DomSanitizer,
    private http: HttpClient,
    private notification: NotificationsService,
    private route: ActivatedRoute,
    private userService: UserService,
    private materialLotCotainerService: MaterialLotContainerService,
    public chartElem: ElementRef,
    private ref: ChangeDetectorRef 
    ) { 


    

    }



    ngAfterViewInit() {
      //this.ref.detach()
    }

  ngOnInit(): void {

    this.route.paramMap.subscribe(params => {
      console.log(params);
  
      this.runID = params.get('id');
  
      this.fetchData();
     // this.showTimeOffRequestForm = false;
  
    });


   this.margin = {top: 30, right: 150, bottom: 80, left: 60};
   this.width = 1024 - this.margin.left - this.margin.right;
   this.height = 768 -this. margin.top - this.margin.bottom;
    
  }




  fetchData(){

    this.noMeasurements = true;

    this.ref.reattach();

    this.http.get(environment.apiUrl + '/particle-size/' + this.runID).subscribe((r:any) => {

      this.particleSizeRun = r;
      if(r.measurements) { this.noMeasurements= false;  r.measurements.shift(); }
      this.source.localData = r.measurements;
     // console.log(r.measurements);
      this.dataAdapter = new jqx.dataAdapter(this.source);
      //console.log(this.particleSizeRun);
      this.fetchContainer();

      this.getSafeUrl(r.pdf);

      //http://api.edm.quantiam.com/file?server_path=\\STSERVER4\\DATA$\\Equipment\\Analytical\\Particle Size\\Master Sizer 3000\\Reports\\2024\\PSA-24-008.pdf

    });


  }



     getSafeUrl(value) {
      this.safeurl = this.sanitizer.bypassSecurityTrustResourceUrl('http://api.edm.quantiam.com/file?server_path='+value);     
  }


  fetchMaterialHistory(material_id){

    this.http.get(environment.apiUrl + '/material/' + material_id + '/mastersizerhistory').subscribe((r:any) => {

      this.materialHistoryObject = r;
      console.log(this.materialHistoryObject);
      
      this.masterSizerHistoryChartOptions.series[0].data = [];
      this.masterSizerHistoryChartOptions.series[1].data = [];
      this.masterSizerHistoryChartOptions.series[2].data = [];

      r.forEach(mastersizerRun => {
        this.masterSizerHistoryChartOptions.series[0].data.push({ y: parseFloat(mastersizerRun.d10), name:mastersizerRun.id, date:mastersizerRun.created_at});
        this.masterSizerHistoryChartOptions.series[1].data.push({ y: parseFloat(mastersizerRun.d50), name:mastersizerRun.id, date:mastersizerRun.created_at});
        this.masterSizerHistoryChartOptions.series[2].data.push({ y: parseFloat(mastersizerRun.d90), name:mastersizerRun.id, date:mastersizerRun.created_at});

        
      });

      this.masterSizerHistoryChartOptions.title.text = material_id+" - "+this.particleSizeRun.container.lot.material.name+"";
      this.masterSizerHistoryChartOptions.subtitle.text = "Master Sizer Run History";


 

      console.log( this.masterSizerHistoryChartOptions);
      this.updateMaterialhistoryFlag = true;
      setTimeout(()=>{ 
        //this.ref.detach();
      },2000);


    
    });


  }
  
  
  fetchContainer(){

    this.http.get(environment.apiUrl + '/material/lot/container/' + this.particleSizeRun.container_id).subscribe((r:any) => {

        this.container = r;
        this.fetchMaterialHistory(r.lot.material.id);
       
    });


  }


  openPdf()
  { 
   
   // window.open('http://api.edm.quantiam.com/file?server_path='+this.encodeUriFixes(this.mastersizerRun.pdf)+'', '_blank');
    
  }

encodeUriFixes(string)
    {
      let str = string.replace('+', "%2B");
      str = str.replace('+', "%2B");
      str = str.replace('#', "%23");
      return str; 
    }



    


}
