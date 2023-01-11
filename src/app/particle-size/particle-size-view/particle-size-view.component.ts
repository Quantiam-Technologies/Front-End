import { Component, OnInit, OnChanges,ElementRef  } from '@angular/core';
import { environment } from '../../../environments/environment';
import { NotificationsService } from 'angular2-notifications';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../../services/user/user.service';
import { MaterialLotContainerService } from '../../services/material-lot-container/material-lot-container.service';
import { C } from '@angular/cdk/keycodes';

@Component({
  selector: 'app-particle-size-view',
  templateUrl: './particle-size-view.component.html',
  styleUrls: ['./particle-size-view.component.css']
})
export class ParticleSizeViewComponent implements OnInit {

  runID;
  particleSizeRun:any;
  
	container: any;

  margin:any;
  width;
  height;
   

  //JQX
  pageable: boolean;
  columnsResize: boolean;
  pagerButtonsCount: number
  multiplerowsextended: boolean;

 

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


  constructor(private http: HttpClient,
    private notification: NotificationsService,
    private route: ActivatedRoute,
    private userService: UserService,
    private materialLotCotainerService: MaterialLotContainerService,
    public chartElem: ElementRef) { 


    

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

    this.http.get(environment.apiUrl + '/particle-size/' + this.runID).subscribe((r:any) => {

      this.particleSizeRun = r;
      r.measurements.shift();
      this.source.localData = r.measurements;
      console.log(r.measurements);
      this.dataAdapter = new jqx.dataAdapter(this.source);
      console.log(this.particleSizeRun);
      this.fetchContainer();

    });


  }
  
  
  fetchContainer(){

    this.http.get(environment.apiUrl + '/material/lot/container/' + this.particleSizeRun.container_id).subscribe((r:any) => {

        this.container = r;
       
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
