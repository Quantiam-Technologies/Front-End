import { environment } from '../../../environments/environment';
import { Component, OnInit, Input, EventEmitter, Output, ElementRef  } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, map, tap, delay, debounceTime, distinctUntilChanged, switchMap, shareReplay, publishReplay, refCount } from 'rxjs/operators';
import { Subject, Observable, of, concat, BehaviorSubject } from 'rxjs';


import { SteelTypeService } from './steel-type.service';

@Component({
  selector: 'app-select-steel-type',
  templateUrl: './select-steel-type.component.html',
  styleUrls: ['./select-steel-type.component.css']
})
export class SelectSteelTypeComponent implements OnInit {

  constructor(public http: HttpClient, 
    private _elementRef: ElementRef, private service: SteelTypeService) {}

  ngOnInit(): void {
  }

}
