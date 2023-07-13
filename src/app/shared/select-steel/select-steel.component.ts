import { environment } from '../../../environments/environment';
import { Component, OnInit, Input, EventEmitter, Output, ElementRef  } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, map, tap, delay, debounceTime, distinctUntilChanged, switchMap, shareReplay, publishReplay, refCount } from 'rxjs/operators';
import { Subject, Observable, of, concat, BehaviorSubject } from 'rxjs';



import { SelectSteelService } from './select-steel.service';

@Component({
  selector: 'app-select-steel',
  templateUrl: './select-steel.component.html',
  styleUrls: ['./select-steel.component.css']
})
export class SelectSteelComponent implements OnInit {

  constructor(public http: HttpClient, 
    private _elementRef: ElementRef, private service: SelectSteelService) {}

  input$ = new Subject<string>();


    // Inputs
    @Input() selectedValue: any = null; // default value, object or ID
    @Input() multiple: any = false; // multi version
    @Input() selectableGroup: any = false; // multi version
    @Input() placeholder = 'Select Steel'; // multi version
    @Input() appendTo; // multi version

    // Outputs
    @Output() change = new EventEmitter<any>();
    @Output() clear = new EventEmitter<any>();

  private endpoint = '/steel';
  // private modelName = 'User';

  items = [];
  itemsBuffer = [];
  allRetrievedItemsList = [];
  dropdownWidth = 380; // in pixels
  bufferSize = 100;
  virtualScroll = true;
  numberOfItemsFromEndBeforeFetchingMore = 20;
  totalResults;
  loading = false;
  page = 1;

  showActive = true;
  showInactive = false;

  supressScrollEnd = false;
  searchingTerm = false;
  justCleared = false;
  lastPage = 9999999;

  firstLoad = true;

 

  ngOnInit() {

    this.loadItems();
    this.onSearch();

    // this._people3input.next(this.selectedPersons);
  }

  onChange(event) { this.change.emit(event); this.loading = false;}
  onAdd(event) { }
  onRemove(event) { }
  onClear() {
    this.loading = false;
    this.justCleared = true;
    this.clear.emit();
  }

  onSearch() {

    this.input$.pipe(
         debounceTime(500),
        distinctUntilChanged(),
        switchMap((term) => {


          this.supressScrollEnd = true;
          this.searchingTerm = true;

          if (this.justCleared) { this.justCleared = false;

            this.itemsBuffer = this.allRetrievedItemsList;
            return []; }

          if (!term) {

            this.itemsBuffer = this.allRetrievedItemsList;
            this.supressScrollEnd = false;
            this.searchingTerm = false;
            return [];
          }

          const params  = new HttpParams().set('like', term).set('limit', '' + this.bufferSize + '').set('active', '1').set('filterSpinner', 'true');
          this.loading = true;
          return this.http.get<any>(environment.apiUrl + `${this.endpoint}`, { 'params': params } );
        })
    )
    .subscribe((data) => {

      this.allRetrievedItemsList = this.itemsBuffer;
      this.itemsBuffer = data.data;
      this.searchingTerm = false;
      this.loading = false;

    });

  }


  loadItems() {


    // use a service

    if (!this.service.isEmpty() && this.firstLoad) {
      this.itemsBuffer = this.service.getList();
      this.totalResults = this.service.getTotal();
      this.firstLoad = false;
      return;
    }

    if (this.page <=  this.lastPage) {

    const params  = new HttpParams().set('page', this.page.toString());



    this.http.get<any>(environment.apiUrl + `${this.endpoint}`, { 'params': params } )
    .subscribe(items => {

           // this.items = items.data;
            this.totalResults = items.total;
            this.itemsBuffer = items.data;
            this.lastPage = items.last_page;

           // this.service.appendList(this.itemsBuffer);
            this.service.update(items);
        });
    }

  }

  onScrollToEnd() {
    if (!this.supressScrollEnd) {
      this.fetchMore();
      }
  }

  onScroll({ end }) {
  //  console.log(end);
    if (this.loading || this.totalResults === this.itemsBuffer.length || this.supressScrollEnd) {
        return;
    }

    if (end + this.numberOfItemsFromEndBeforeFetchingMore >= this.itemsBuffer.length) {
        this.fetchMore();
    }
  }

  customSearchFn(term: string, item) {  // good for lists we store in their entirety
    // console.log(term,item);
    term = term.toLocaleLowerCase();

    return item.heat_id.toLocaleLowerCase().indexOf(term) > -1
    || item.steel_type.part_name.toLocaleLowerCase().indexOf(term) > -1;

}


   fetchMore() {

      // use a service as well
    if (this.page <= this.lastPage) {
    this.loading = true;
    this.page = this.page + 1;

    const params = new HttpParams().set('page', this.page.toString()).set('filterSpinner', 'true');

    this.http.get<any>(environment.apiUrl + `${this.endpoint}`, { params: params } )
    .subscribe(items => {
            this.page = items.current_page;
            this.loading = false;

            this.itemsBuffer = this.itemsBuffer.concat(items.data);
        });
    }

  }


   onOpen() {

  setTimeout((x) => {

    const dropdown = document.querySelector('.total-padding');
    dropdown.setAttribute('style', 'width:' + this.dropdownWidth + 'px !important;height: 1800px;'); // this changes the dropdown to be as wide as it's contents
    // dropdown.setAttribute('style',''); //workaround

  }, 100);

  }

}
