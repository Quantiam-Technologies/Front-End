import { Component, OnInit, Input, EventEmitter, Output, OnDestroy } from '@angular/core';
import { LocationService } from '../../services/location/location.service';

@Component({
  selector: 'app-select-location',
  templateUrl: './select-location.component.html',
  styleUrls: ['./select-location.component.css']
})
export class SelectLocationComponent implements OnInit {

  list$: any;
  items: any = [];
  allItems: any = [];
  showActive = true;
  showInactive = false;
  virtualScroll = true;
  
  dropdownWidth = 400; // in pixels


  // Inputs
  @Input() placeholder = 'Select Location'; // default value, object or ID
  @Input() selectedValue: any = null; // default value, object or ID
  @Input() multiple = false; // multi version
  @Input() selectableGroup = false; // multi version
  @Input() style = 'min-width: 200px'; // multi version

  // Outputs
  @Output() change = new EventEmitter<any>();
  @Output() clear = new EventEmitter<any>();

  constructor(private locationService: LocationService) { }

  ngOnInit() {

    this.locationService.getList();
    this.list$ = this.locationService.list$.subscribe((r) => {
              this.allItems = r;
      });

  }

  onChange(event) { this.change.emit(event); }
  onClear(event) { this.change.emit(event); }


  ngOnDestroy() {
    this.list$.unsubscribe();
  }

}
