import { Component, OnInit } from '@angular/core';

import {  HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-arbin',
  templateUrl: './arbin.component.html',
  styleUrls: ['./arbin.component.css']
})
export class ArbinComponent implements OnInit {

  constructor(private http: HttpClient) { }

  someData:any = [];

  ngOnInit() {
    this.fetchData();
  }

  

  fetchData ()
  {
    this.http.get('http://localhost:3001/arbin/test').subscribe(r => {

        this.someData = r;
    }, error => { 

      console.log(error);
    });
  }
}
