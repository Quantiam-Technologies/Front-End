import { Component, OnInit,Inject } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { environment} from '../../../environments/environment';
import { MAT_DIALOG_DATA} from '@angular/material/dialog';

import { MatLegacyDialog as MatDialog, MatLegacyDialogConfig as MatDialogConfig, MatLegacyDialogRef as MatDialogRef } from '@angular/material/legacy-dialog';


@Component({
  selector: 'app-steel-rework-dialog',
  templateUrl: './steel-rework-dialog.component.html',
  styleUrls: ['./steel-rework-dialog.component.css']
})
export class SteelReworkDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<SteelReworkDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any,
  ) {

    console.log(data);
  }

     //   console.log(data);

     

  ngOnInit() {

    //console.log(this.data);
  }

}
