import { Component, OnInit,Inject } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { environment} from '../../../environments/environment';
import { MAT_DIALOG_DATA} from '@angular/material/dialog';
import { NotificationsService } from 'angular2-notifications';

import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-steel-creation-dialog',
  templateUrl: './steel-creation-dialog.component.html',
  styleUrls: ['./steel-creation-dialog.component.css']
})
export class SteelCreationDialogComponent implements OnInit {

  steelObject;


  constructor(
    public dialogRef: MatDialogRef<SteelCreationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any, private http: HttpClient,  private notification: NotificationsService
  ) {


  }

  ngOnInit() {
  }

}
