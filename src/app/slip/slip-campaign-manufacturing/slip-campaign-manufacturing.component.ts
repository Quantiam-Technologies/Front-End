import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-slip-campaign-manufacturing',
  templateUrl: './slip-campaign-manufacturing.component.html',
  styleUrls: ['./slip-campaign-manufacturing.component.css']
})
export class SlipCampaignManufacturingComponent {

  @Input() campaignID: any = 35;

}
