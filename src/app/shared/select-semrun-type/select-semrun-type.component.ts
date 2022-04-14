
import { environment } from '../../../environments/environment';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, tap, delay, shareReplay, publishReplay, refCount } from 'rxjs/operators';

import { SemrunTypeService } from './semrun-type.service';

@Component({
  selector: 'app-select-semrun-type',
  templateUrl: './select-semrun-type.component.html',
  styleUrls: ['./select-semrun-type.component.css']
})
export class SelectSemrunTypeComponent implements OnInit {
  // Inputs
  @Input() selectedValue: any = null; // default value, object or ID
  @Input() multiple: any = false; // multi version
  @Input() selectableGroup: any = false; // multi version
  @Input() placeholder = 'Select Experiment'; // multi version
  @Input() appendTo = 'body'; // multi version

  // Outputs
  @Output() change = new EventEmitter<any>();
  @Output() clear = new EventEmitter<any>();

  private endpoint = '/instrument/sem/run/type/list';
  // private modelName = 'User';
  listSource$:any;

  items = [];
  itemsBuffer;
  bufferSize = 50;
  loading = false;
  dropdownWidth = 300;

  showActive = true;
  showInactive = false;

  constructor(public http: HttpClient, private service: SemrunTypeService ) { }

  ngOnInit() {

    this.listSource$ = this.service.list$.subscribe((r) => {

      console.log(r);
      this.items = r;

    });

  }

  onChange(event) { this.change.emit(event); }
  onClear() { this.clear.emit(event); }
  onAdd(event) {}
  onRemove(event) {}

  customSearchFn(term: string, item) {  // good for lists we store in their entirety
   console.log(term,item);
    term = term.toLocaleLowerCase();
    const id = item.type_id + ''; 

    return item.type.toLocaleLowerCase().indexOf(term) > -1
    || id === term ;

}

 onOpen() {  }

}
