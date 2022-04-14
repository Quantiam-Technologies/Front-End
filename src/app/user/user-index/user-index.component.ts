import { Component, OnInit } from '@angular/core';
import { Router  } from '@angular/router';

@Component({
  selector: 'app-user-index',
  templateUrl: './user-index.component.html',
  styleUrls: ['./user-index.component.css']
})
export class UserIndexComponent implements OnInit {

  selectedUser;

  constructor( public router: Router, ) { }

  

  ngOnInit() {

   // this.router.navigate(['user/database']);

  }

}
