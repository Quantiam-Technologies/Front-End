import { Component, OnInit,Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

import { Router } from '@angular/router';

@Component({
  selector: 'app-pick-xrd-analyses-dialog',
  templateUrl: './pick-xrd-analyses-dialog.component.html',
  styleUrls: ['./pick-xrd-analyses-dialog.component.css']
})
export class PickXrdAnalysesDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data,
    private router: Router) {}

  ngOnInit() {

      console.log(this.data);
  }

  close()
  {
    this.dialogRef.close();
  }

  selectFile(file)
  {
   // console.log(file);
  
    this.router.navigate(['/xrd/analysis/' + file.id]);
    this.dialogRef.close();
  }
}
