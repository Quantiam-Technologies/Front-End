
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-select-arbin-test',
  templateUrl: './select-arbin-test.component.html',
  styleUrls: ['./select-arbin-test.component.css']
})
export class SelectArbinTestComponent implements OnInit {

  // Inputs
  @Input() selectedValue: any = null; // default value, object or ID
  @Input() multiple: any = false; // multi version
  @Input() clearable: any = true; //
  //@Input() selectableGroup: any = false; // multi version
  @Input() placeholder = 'Select Arbin Test'; // multi version

  // Outputs
  @Output() change = new EventEmitter<any>();
  @Output() add = new EventEmitter<any>();
  @Output() remove = new EventEmitter<any>();
  @Output() clear = new EventEmitter<any>();


  
  constructor( private http: HttpClient ) {}

  items:any = [];
  virtualScroll = true;
  totalResults;
  loading = false;

  showActive = true;
  showInactive = false;

  ngOnInit() {
   // console.log(this.selectedValue);
    this.fetchTestList();
  }

  fetchTestList()
  {
    this.http.get('http://api.edm.quantiam.com:3000/arbin/test').subscribe(r => {

        this.items = r;
    }, error => { 

      console.log(error);
    });
  }

  
  onChange(event) { this.change.emit(event); }
  onAdd(event) { this.add.emit(event);}
  onRemove(event) { this.remove.emit(event);}
  onClear(event) { this.clear.emit(event);}



}
