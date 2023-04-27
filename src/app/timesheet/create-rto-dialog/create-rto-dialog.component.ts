import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA, MatLegacyDialogRef as MatDialogRef } from '@angular/material/legacy-dialog';
import { Router } from '@angular/router';

import { UserService } from '../../services/user/user.service';

import {environment} from '../../../environments/environment';

import { HttpClient, HttpParams } from '@angular/common/http';



@Component({
  selector: 'app-create-rto-dialog',
  templateUrl: './create-rto-dialog.component.html',
  styleUrls: ['./create-rto-dialog.component.css']
})
export class CreateRtoDialogComponent implements OnInit {

  selectedUser;
  currentUser;


  constructor(
    public dialogRef: MatDialogRef<CreateRtoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data,
    private router: Router,
    private http: HttpClient,
    public userService: UserService,

  ) { }

  ngOnInit() {


    this.userService.getAuthedUser().subscribe(r => {



      this.currentUser = r;
      console.log('service fire');
    });

  }


  selectUser(event) {

      this.selectedUser = event;
  }

  createRtoForUser() {
    this.createRto(this.selectedUser.id);

  }


  createRto(userId) {

    const params = {
        user: userId

    };

    this.http.post(environment.apiUrl + '/rto', params).subscribe((response: any) => {

        this.dialogRef.close();
         this.router.navigate(['/timesheet/rto/', response.id]);

    });

  }

}
