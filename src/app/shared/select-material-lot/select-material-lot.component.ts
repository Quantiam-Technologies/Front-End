import { Component, OnInit, Input,Output,EventEmitter } from '@angular/core';
import { concat, Observable, of, Subject } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, switchMap, tap } from 'rxjs/operators';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-select-material-lot',
  templateUrl: './select-material-lot.component.html',
  styleUrls: ['./select-material-lot.component.css']
})
export class SelectMaterialLotComponent implements OnInit {

    list$: Observable<any>;
    Loading = false;
    Input$ = new Subject<string>();
    
    @Input() style; // multi version
   // selectedPersons: Person[] = <any>[{ name: 'Karyn Wright' }, { name: 'Other' }];


   @Input() selectedValue: any = null; // default value, object or ID
   @Input() multiple: any = false; // multi version
   @Input() placeholder = 'Select Lot'; // multi version
   @Input() appendTo; // multi version
   @Input() materialID; // multi version


   
  @Output() change = new EventEmitter<any>();

    constructor(
      public http: HttpClient, ) {
    }

    ngOnInit() {
        this.loadLotList();
    }

    onChange(event) { this.change.emit(event); }

    trackByFn(item) {
        return item.id;
    }

    private loadLotList()
    {
      const params  = new HttpParams().set('slip_material_id', this.materialID).set('filterSpinner', 'true');
      this.list$ = concat(
        of([]),
        this.http.get(environment.apiUrl+'/material/lot/list', { 'params': params })
      );

    }

    private loadPeople() {
        this.list$ = concat(
            of([]), // default items
            this.Input$.pipe(
                distinctUntilChanged(),
                tap(() => this.Loading = true),
                switchMap((term) => {

                  const params  = new HttpParams().set('slip_material_id', this.materialID).set('filterSpinner', 'true');
                  return this.http.get(environment.apiUrl+'/material/lot/list', { 'params': params });
                })
                ).pipe(
                    catchError(() => of([])), // empty list on error
                    tap(() => this.Loading = false)
                ));
    }
}
