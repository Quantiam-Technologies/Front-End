
import { Component,OnInit } from '@angular/core';

import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router, } from '@angular/router';

@Component({
  selector: 'app-holds',
  templateUrl: './holds.component.html',
  styleUrls: ['./holds.component.css']
})
export class HoldsComponent {

  constructor(private http: HttpClient, private route: ActivatedRoute, ) {}

  campaignId = 29;
  displayCampaignHolds;
  campaignHolds;
  campaignActiveHolds = [];
  renderCampaignHolds = false;

  
  ngOnInit(){

    this.fetchHolds();
  }

  fetchHolds(){

    params:null; 

    this.http.get(environment.apiUrl + `/campaign/`+this.campaignId+`/hold`).subscribe((r: any) => {

      this.campaignHolds = r;

      this.campaignHolds.forEach(hold => {


        if(hold.active == 1)  this.campaignActiveHolds.push(hold);        
      });

      this.displayCampaignHolds = this.campaignActiveHolds;

      this.renderCampaignHolds = true;

    })


  }

  toggleHoldActive(){


  }

}
