import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SelectSteelService {

 
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
