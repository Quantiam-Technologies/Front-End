import { Component, OnInit, Inject } from '@angular/core';


import {MatLegacyDialog as MatDialog, MatLegacyDialogRef as MatDialogRef, MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA} from '@angular/material/legacy-dialog';

@Component({
  selector: 'app-car-dialog',
  templateUrl: './car-dialog.component.html',
  styleUrls: ['./car-dialog.component.css']
})
export class CarDialogComponent implements OnInit {

  carObject;

  constructor(  
    @Inject(MAT_DIALOG_DATA) public data:any,
    public dialogRef: MatDialogRef<any>,
  
  ) { }

  ngOnInit(): void {
    this.carObject = this.data;
    console.log(this.data);
  }




  nextCar()
  {
    this.data.next = true;
    this.dialogRef.close(this.data);
    console.log(this.data);
  }

  previousCar()
  {
    this.data.previous = true;
    this.dialogRef.close(this.data);
  }

  onRemove()
  {
    this.dialogRef.close(this.data);
  }


}
