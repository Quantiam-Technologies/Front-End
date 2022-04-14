import { environment } from '../../../environments/environment';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, tap, delay, shareReplay, publishReplay, refCount } from 'rxjs/operators';

@Component({
  selector: 'app-select-experiment',
  templateUrl: './select-experiment.component.html',
  styleUrls: ['./select-experiment.component.css']
})
export class SelectExperimentComponent implements OnInit {
  // Inputs
  @Input() selectedValue: any = null; // default value, object or ID
  @Input() multiple: any = false; // multi version
  @Input() selectableGroup: any = false; // multi version
  @Input() placeholder = 'Select Experiment'; // multi version

  // Outputs
  @Output() change = new EventEmitter<any>();

  private endpoint = '/experiment';
  // private modelName = 'User';

  items = [];
  itemsBuffer;
  bufferSize = 50;
  virtualScroll = true;
  numberOfItemsFromEndBeforeFetchingMore = 10;
  totalResults;
  loading = false;

  showActive = true;
  showInactive = false;

  constructor(public http: HttpClient, ) { }

  ngOnInit() {

    this.http.get<any>(environment.apiUrl + `${this.endpoint}`)
    .subscribe(items => {
            console.log(items);
            this.items = items.data;
            this.totalResults = items.total;
            this.itemsBuffer = this.items.slice(0, this.itemsBuffer);
        });

  }

  onChange(event) { this.change.emit(event); }
  onAdd(event) {}
  onRemove(event) {}

  onScrollToEnd() {
    this.fetchMore();
  }

  onScroll({ end }) {
    if (this.loading || this.items.length === this.itemsBuffer.length) {
        return;
    }

    if (end + this.numberOfItemsFromEndBeforeFetchingMore >= this.itemsBuffer.length) {
        this.fetchMore();
    }
  }

  private fetchMore() {
    const len = this.itemsBuffer.length;
    const more = this.items.slice(len, this.bufferSize + len);
    this.loading = true;
    // query the next page of results, and add them here
    setTimeout(() => {
        this.loading = false;
        this.itemsBuffer = this.itemsBuffer.concat(more);
    }, 200);
  }



}
