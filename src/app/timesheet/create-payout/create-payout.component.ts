import { Component, OnInit,Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../../services/user/user.service';
import {environment} from '../../../environments/environment';


import { Router } from '@angular/router';

@Component({
  selector: 'app-create-payout',
  templateUrl: './create-payout.component.html',
  styleUrls: ['./create-payout.component.css']
})
export class CreatePayoutComponent implements OnInit {


  selectedType;
  hours;
  payoutDate;
  comment;

  constructor(
    public dialogRef: MatDialogRef<CreatePayoutComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private router: Router,
    private http: HttpClient,
    public userService: UserService,
    ) { }

  ngOnInit() {


  }


  createPayout()
  {
      if(confirm('Are you sure you want to add this payout?') && this.userService.hasPermission(23)){

        const params = {
          type: this.selectedType,
          hours: this.hours,
          date: this.payoutDate, 
          comment: this.comment
        };

        this.http.post(environment.apiUrl+ `/timesheet/${this.data.userId}/payout`, params).subscribe((r)=>{

            this.dialogRef.close(true);
        });

      }
      else{
        alert('You do not have permissions for this operation.');
      }

      

  }


 
}
