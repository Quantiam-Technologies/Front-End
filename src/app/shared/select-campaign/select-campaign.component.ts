import { Component, OnInit, Input, EventEmitter, Output, OnDestroy } from '@angular/core';
import { CampaignListService } from './campaign-list.service';
@Component({
  selector: 'app-select-campaign',
  templateUrl: './select-campaign.component.html',
  styleUrls: ['./select-campaign.component.css']
})
export class SelectCampaignComponent implements OnInit {

  list$: any;
  items: any = [];
  allItems: any = [];
  showActive = true;
  showInactive = false;
  virtualScroll = true;
  
  dropdownWidth = 500; // in pixels


  // Inputs
  @Input() placeholder = 'Select Campaign'; // default value, object or ID
  @Input() selectedValue; // default value, object or ID
  @Input() multiple = false; // multi version
  @Input() clearable = false; // can this be cleared
  @Input() selectableGroup = false; // multi version
  @Input() style = 'min-width: 200px'; // multi version

  // Outputs
  @Output() change = new EventEmitter<any>();
  @Output() clear = new EventEmitter<any>();

  constructor(private campaignService: CampaignListService) { }

  ngOnInit() {

    this.campaignService.getList();
    this.list$ = this.campaignService.list$.subscribe((r) => {
              this.allItems = r;
      });

  }

  onChange(event) { this.change.emit(event); }
  onClear(event) { this.change.emit(event); }


  ngOnDestroy() {
    this.list$.unsubscribe();
  }

}
