import { Component, OnInit } from '@angular/core';


import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import * as Highcharts from 'highcharts';
import { ActivatedRoute, Router, } from '@angular/router';

@Component({
  selector: 'app-steel-view',
  templateUrl: './steel-view.component.html',
  styleUrls: ['./steel-view.component.css']
})
export class SteelViewComponent implements OnInit {

  steelId;
  steelObject;
  steelProcessHistory;

  urlProcessViewMap = {
    slipcast: "http://old.edm.quantiam.com/#!/slipcast/",
    furnace_run: "http://apps.edm.quantiam.com/furnace/run/"
  };

  constructor(private route:ActivatedRoute,private http: HttpClient, ) { }

  ngOnInit() {
    this.steelId = this.route.snapshot.paramMap.get('id');  
    this.fetchSteelProcessHistory(this.steelId);
    this.fetchSteelProperties(this.steelId);
  }


  fetchSteelProcessHistory(steelId)
  {
    this.http.get(environment.apiUrl + `/steel/`+steelId+`/processHistory`).subscribe((r: any) => {
        console.log(r);
        this.steelProcessHistory = r;
    })
      console.log(steelId); 
  }

  fetchSteelProperties(steelId)
  {

    var params = {'reworks':true,'steel_type':true};
    this.http.get(environment.apiUrl + `/steel/`+steelId,{ params: params }).subscribe((r: any) => {
      console.log(r);
      this.steelObject = r;
  })

  }


  navigateToProcess(navigateToProcess)
  {
    if(this.urlProcessViewMap.hasOwnProperty(navigateToProcess.view_type)) window.open(this.urlProcessViewMap[navigateToProcess.view_type]+navigateToProcess.process_id, "_blank");

  }

}
