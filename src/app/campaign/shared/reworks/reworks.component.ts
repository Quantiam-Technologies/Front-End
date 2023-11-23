import { Component,OnInit } from '@angular/core';

import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import * as Highcharts from 'highcharts';
import { ActivatedRoute, Router, } from '@angular/router';
import * as moment from 'moment';


@Component({
  selector: 'app-reworks',
  templateUrl: './reworks.component.html',
  styleUrls: ['./reworks.component.css']
})
export class ReworksComponent {

  constructor(private http: HttpClient, private route: ActivatedRoute, ) {}

  campaignId = 29;
  campaignReworks;
  renderCampaignReworks = false;

  
  ngOnInit(){

    this.fetchReworks();
  }

  fetchReworks(){

    params:null; 

    this.http.get(environment.apiUrl + `/campaign/`+this.campaignId+`/rework`).subscribe((r: any) => {

      this.campaignReworks = r;
      this.renderCampaignReworks = true;

    })


  }

}
