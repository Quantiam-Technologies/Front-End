import { Component, OnInit } from '@angular/core';

import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { catchError, map, tap, delay,shareReplay, publishReplay,refCount } from 'rxjs/operators';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-tools-scalebar',
  templateUrl: './tools-scalebar.component.html',
  styleUrls: ['./tools-scalebar.component.css']
})
export class ToolsScalebarComponent implements OnInit {

   toolOptions: any = {};
   enableLoadingGraphic: boolean = false;
   processResponse: any = []; 

   forceMagnification = 'none';

  constructor(public http: HttpClient, 
		public notification: NotificationsService,) { 

        this.toolOptions.path = "";


    }

  ngOnInit() {
  }




  processDirectory(){

    if(confirm('Are you sure you want to process this directory? '+this.toolOptions.path) && this.toolOptions.path.length > 5)
    {
        this.enableLoadingGraphic = true;
        this.processResponse = [];

        if(this.forceMagnification !== 'none')
        {
          // certain query params
          this.toolOptions.forcedMagnification = this.forceMagnification;

        }

        return  this.http.post<any>(environment.apiUrl+`/scalebars?filterSpinner&creator=true`,this.toolOptions)
        .pipe( 
        map( res => {  
            // this.notification.success('Delete','Sample Deleted',{showProgressBar:false,timeOut:3000,clickToClose: true});        
          return res; 			
        })
      )
      .subscribe(
        (r:any) => {
                  this.enableLoadingGraphic = false;
                  this.notification.success('Success','We processed '+r.length+' images.',{showProgressBar:false,timeOut:4000,clickToClose: true});
                 // this.processResponse = r;
                // this.toolOptions.path.length = '';
      },
      (e:any)=>{
        this.enableLoadingGraphic = false;
        this.notification.error('Error','Something went wrong.',{showProgressBar:false,timeOut:4000,clickToClose: true});
      }
      );
   }
   return null;
  }

}
