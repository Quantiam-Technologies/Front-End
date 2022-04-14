import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient,  } from '@angular/common/http';
import { catchError, map, tap,  } from 'rxjs/operators';
import { Observable,  BehaviorSubject,  } from 'rxjs';
import { NotificationsService } from 'angular2-notifications';


@Injectable({
  providedIn: 'root'
})
export class SelectMaterialContainerService {

  storage = {
    data: [] as any,
    total: 0,
  };

  constructor() { 

     // this.storage.data = [];

  }

  appendList(items){


    items.forEach((element:any) => {
        this.storage.data.push(element);
    });

      return this.storage.data;

  }

  update(obj)
  {
    this.storage = obj;
    return this.storage;
  }

  get()
  {
    return this.storage;
  }

  getList()
  {
    return this.storage.data;
  }

  getTotal()
  {
    return this.storage.total;
  }

  isEmpty()
  {
    //console.log(this.storage);
    if(this.storage.data.length > 0){ return false;}
    return true;
  }


}
