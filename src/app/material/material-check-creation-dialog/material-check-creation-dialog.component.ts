import { Component, OnInit,Inject } from '@angular/core';

import {MatLegacyDialog as MatDialog, MatLegacyDialogRef as MatDialogRef, MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA} from '@angular/material/legacy-dialog';

@Component({
  selector: 'app-material-check-creation-dialog',
  templateUrl: './material-check-creation-dialog.component.html',
  styleUrls: ['./material-check-creation-dialog.component.css']
})
export class MaterialCheckCreationDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit(): void {
  }


  onNoClick(): void {
    this.dialogRef.close();
  }

}
