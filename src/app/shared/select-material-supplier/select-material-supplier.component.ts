import { Component, OnInit, Input, EventEmitter, Output, OnDestroy } from '@angular/core';
import { SelectMaterialSupplierService } from './select-material-supplier.service';

import { environment } from '../../../environments/environment';

import {  HttpClient} from '@angular/common/http';


@Component({
  selector: 'app-select-material-supplier',
  templateUrl: './select-material-supplier.component.html',
  styleUrls: ['./select-material-supplier.component.css']
})
export class SelectMaterialSupplierComponent implements OnInit, OnDestroy {

  list$: any;
  items: any = [];

  virtualScroll = "true";

  dropdownWidth = 250; // in pixels


  // Inputs
  @Input() selectedValue: any = null; // default value, object or ID
  @Input() multiple = false; // multi version
  @Input() selectableGroup = false; // multi version
  @Input() addTag = false; // multi version

  // Outputs
  @Output() change = new EventEmitter<any>();
  @Output() clear = new EventEmitter<any>();

  constructor(private service: SelectMaterialSupplierService, private http: HttpClient) { }

  ngOnInit() {

    // retrieve from project service
    // this.items = ['true', 'Two', 3,'test'];

   // this.service.list();
    this.list$ = this.service.list$.subscribe((r) => {

        this.items = r;

      });

  }



  onChange(event) {

    if (typeof(event) !== 'undefined' && this.addTag && !event.hasOwnProperty('supplier_id')) {
     // console.log(event);
      this.createSupplier(event);
    } else {
      this.change.emit(event);
    }



  }
  onClear(event) {  this.clear.emit(event); }

  customSearchFn(term: string, item) {  // good for lists we store in their entirety
  //  console.log(term,item);
    term = term.toLocaleLowerCase();

    item.id = String(item.id);
    return item.id.toLocaleLowerCase().indexOf(term) > -1
    || item.Description.toLocaleLowerCase().indexOf(term) > -1;

  }

  createSupplier(obj) {
    if (confirm('Do you want to create this supplier?')) {
      return this.http.post(environment.apiUrl + '/material/supplier', obj).subscribe((r) => {

         // console.log(r);
          this.change.emit(r);

      });
    } else {

     

      this.selectedValue = null;
     
    }

    return null;

  }



 onOpen() {

    

  }


  ngOnDestroy() {
    this.list$ .unsubscribe();
  }
}
