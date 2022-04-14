import { Component, OnInit, Input, EventEmitter, Output, OnDestroy } from '@angular/core';
import { SelectPermissionService } from './select-permission.service';

@Component({
  selector: 'app-select-permission',
  templateUrl: './select-permission.component.html',
  styleUrls: ['./select-permission.component.css']
})
export class SelectPermissionComponent implements OnInit, OnDestroy {

  list$: any;
  items: any = [];
  allItems: any = [];
  itemsBuffer: any = [];
  virtualScroll = false;
  dropdownWidth = 500; // in pixels

  loading;

  // Inputs
  @Input() selectedValue: any = null; // default value, object or ID
  @Input() multiple: any = false; // multi version
  @Input() placeholder = 'Select Permission'; 
  @Input() user; 
  

  // Outputs
  @Output() change = new EventEmitter<any>();
  @Output() add = new EventEmitter<any>();
  @Output() remove = new EventEmitter<any>();
 
  constructor(private selectPermissionService: SelectPermissionService) { }

  ngOnInit() {
    const params: any = {};
    if(this.user){ params.user_does_not_possess = this.user.id; }
    this.selectPermissionService.list(params); // Make sure the service is initialized.
    this.list$ = this.selectPermissionService.list$.subscribe((r) => {
         this.itemsBuffer = r;
        
      });
  }

   onOpen() {

    // setTimeout((x) => {
  
    //   const dropdown = document.querySelector('.total-padding');
    //   dropdown.setAttribute('style', 'width:' + this.dropdownWidth + 'px !important;height: 1800px;'); // this changes the dropdown to be as wide as it's contents
    //   dropdown.setAttribute('style',''); //workaround
  
    // }, 100);
  
    }

    onChange(event) { this.change.emit(event); }
    onAdd(event) { }
    onRemove(event) { }
    onClear() {  }

  ngOnDestroy() {
    if (this.list$) { this.list$.unsubscribe(); }
   }

}
