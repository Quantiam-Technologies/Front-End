
import { environment } from '../../../environments/environment';
import { Component, OnInit, Input, EventEmitter, Output, ElementRef  } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, map, tap, delay, debounceTime, distinctUntilChanged, switchMap, shareReplay, publishReplay, refCount } from 'rxjs/operators';
import { Subject, Observable, of, concat, BehaviorSubject } from 'rxjs';
import { SelectMaterialService } from './select-material.service';

@Component({
  selector: 'app-select-material',
  templateUrl: './select-material.component.html',
  styleUrls: ['./select-material.component.css']
})


export class SelectMaterialComponent implements OnInit {


  selectedPersons = [{ name: 'Karyn Wright' }, { name: 'Other' }];

  public _people3input = new BehaviorSubject({});
  public people3$: Observable<any> = this._people3input.asObservable();

  input$ = new Subject<string>();


    // Inputs
  @Input() selectedValue: any = null; // default value, object or ID
  @Input() multiple: any = false; // multi version
  @Input() selectableGroup: any = false; // multi version
  @Input() placeholder = 'Select Material'; // multi version

  // Outputs
  @Output() change = new EventEmitter<any>();

  private endpoint = '/material';
  // private modelName = 'User';

  items = [];
  itemsBuffer = [];
  allRetrievedItemsList = [];
  dropdownWidth = 600; // in pixels
  bufferSize = 150;
  virtualScroll = true;
  numberOfItemsFromEndBeforeFetchingMore = 50;
  totalResults;
  loading = false;
  page = 1;
  searchingTerm = false;
  firstLoad = true;

  lastPage = 9999999;

  justCleared = false;
  showActive = true;
  showInactive = false;

  supressScrollEnd = false;

  constructor(public http: HttpClient, private _elementRef: ElementRef,private service: SelectMaterialService) {}



  ngOnInit() {

    this.loadItems(this.page);
    this.onSearch();

    // this._people3input.next(this.selectedPersons);
  }

  onChange(event) {  this.change.emit(event);  this.loading = false;}
  onAdd(event) { 
     this.loading = false; 
    this.searchingTerm = false;    
    this.itemsBuffer = this.service.getList();
  }
  onRemove(event) {  
    this.loading = false; 
    this.itemsBuffer = this.service.getList();
  }
  onClear(event) {
    this.justCleared = true;
    this.searchingTerm = false;
    this.loading = false;
    this.itemsBuffer = this.service.getList();
  }

  onSearch() {

    this.input$.pipe(
         debounceTime(500),
        distinctUntilChanged(),
        switchMap((term) => {

          
          this.supressScrollEnd = true;
          this.searchingTerm = true;

          if (this.justCleared) { 
            this.justCleared = false;
            this.itemsBuffer = this.allRetrievedItemsList;
            return []; }

          if (!term) {

            this.itemsBuffer = this.allRetrievedItemsList;
            this.supressScrollEnd = false;
            this.searchingTerm = false;
            return [];
          }
          this.loading = true;
          const params  = new HttpParams().set('like', term).set('limit', '' + this.bufferSize + '').set('active', '1').set('filterSpinner', 'true');
          
          return this.http.get<any>(environment.apiUrl + `${this.endpoint}`, { 'params': params } );

        })
    )
    .subscribe((data) => {     
 
      this.allRetrievedItemsList = this.itemsBuffer;
      this.itemsBuffer = data.data;
      this.searchingTerm = false;
      this.loading = false;


    },(error)=>{this.loading = false;});

  }


  loadItems(page) {

// use a service

if (!this.service.isEmpty() && this.firstLoad) {
  this.itemsBuffer = this.service.getList();
  this.totalResults = this.service.getTotal();
  this.firstLoad = false;
  this.loading = false;
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
                  this.loading = false;
          });

        }
  }

  onScrollToEnd() {
    if(!this.supressScrollEnd) {
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


  private fetchMore() {

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
    //dropdown.setAttribute('style', 'width:' + this.dropdownWidth + 'px !important;height: 1800px;'); // this changes the dropdown to be as wide as it's contents
    // dropdown.setAttribute('style',''); //workaround

  }, 100);

  }





}
