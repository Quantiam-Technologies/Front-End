
import { Component, OnInit, Input, EventEmitter, Output  } from '@angular/core';

@Component({
  selector: 'app-select-experiment-type',
  templateUrl: './select-experiment-type.component.html',
  styleUrls: ['./select-experiment-type.component.css']
})
export class SelectExperimentTypeComponent implements OnInit {

  itemsBuffer;

  virtualScroll = true;
  loading = false;

  // Inputs

  @Input() selectedValue: any = null; // default value, object or ID
  @Input() multiple: any = false; // multi version
  @Input() selectableGroup: any = false; // multi version
  @Input() placeholder = 'Select Experiment'; // multi version

  // Outputs
  @Output() change = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }


  onChange(event) { this.change.emit(event); }
  onAdd(event) {}
  onRemove(event) {}
  onScrollToEnd() {}
  onScroll(event) {}

}
