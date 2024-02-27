import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  selectedCampaignId= 36;

  constructor() { }

  ngOnInit() {
  }


  changeCampaign(event)
  {
    this.selectedCampaignId = event.campaign_id;
    console.log(event);
  }

}
