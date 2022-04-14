import { Injectable, Output, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PopUpSteelCardServiceService {

  constructor() { }
  
  @Output() showEvent: EventEmitter<any> = new EventEmitter();
  @Output() hideEvent: EventEmitter<any> = new EventEmitter();


  show(steelObj)
  {
      this.showEvent.emit(steelObj);
  }

  hide()
  {
 
    this.hideEvent.emit({});
  }

}
