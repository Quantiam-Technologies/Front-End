import { Component, OnInit, OnChanges,ElementRef  } from '@angular/core';
import { environment } from '../../../environments/environment';
import { NotificationsService } from 'angular2-notifications';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../../services/user/user.service';


@Component({
  selector: 'app-particle-size-view',
  templateUrl: './particle-size-view.component.html',
  styleUrls: ['./particle-size-view.component.css']
})
export class ParticleSizeViewComponent implements OnInit {

  runID;
  particleSizeRun:any;

  margin:any;
  width;
  height;
   

  constructor(private http: HttpClient,
    private notification: NotificationsService,
    private route: ActivatedRoute,
    private userService: UserService,
    public chartElem: ElementRef) { }

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
      console.log(this.particleSizeRun);

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
