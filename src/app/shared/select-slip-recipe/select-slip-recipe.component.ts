import { environment } from '../../../environments/environment';
import { Component, OnInit, Input, EventEmitter, Output, ElementRef  } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-select-slip-recipe',
  templateUrl: './select-slip-recipe.component.html',
  styleUrls: ['./select-slip-recipe.component.css']
})
export class SelectSlipRecipeComponent implements OnInit {

  items: [];
  multiple: false;
  placeholder = 'Slip Recipe';
  selectedValue;
  showActive: true;
  showInactive: true;


  
  // Outputs
  @Output() change = new EventEmitter<any>();
  @Output() clear = new EventEmitter<any>();
  
  private endpoint = '/slip/recipe/list';

  constructor(
    public http: HttpClient, 
    private _elementRef: ElementRef, ) { }

  



  
  ngOnInit() {

    this.http.get<any>(environment.apiUrl + `${this.endpoint}`)
    .subscribe(items => {
            console.log(items);
            this.items = items;
        });

  }

  loadItems(){


  }

  onAdd(event) { }
  onRemove(event) { }
  onClear(event) {  this.clear.emit(event); }
  onChange(event) {  this.change.emit(event);  }
  onOpen() {  }

  showItems(){}

}
