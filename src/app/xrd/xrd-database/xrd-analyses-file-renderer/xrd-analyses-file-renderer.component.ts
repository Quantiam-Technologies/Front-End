import { Component } from '@angular/core';

import {ICellRendererAngularComp,} from '@ag-grid-community/angular';

import { PickXrdAnalysesDialogComponent } from '../pick-xrd-analyses-dialog/pick-xrd-analyses-dialog.component';


import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-xrd-analyses-file-renderer',
  templateUrl: './xrd-analyses-file-renderer.component.html',
  styleUrls: ['./xrd-analyses-file-renderer.component.css']
})
export class XrdAnalysesFileRendererComponent implements ICellRendererAngularComp  {

  public params: any;
  string;

  constructor(private router: Router,private dialog: MatDialog,){}
 


   // Optional - Params for rendering. The same params that are passed to the cellRenderer function.
   agInit(cell: any): void {
    this.params = cell;
    

    if(cell.data.xrd_analysis.length === 1){ this.string = cell.data.xrd_analysis.length + ' File'; }
    else { this.string = cell.data.xrd_analysis.length + ' Files'; }

}



   // Mandatory - Get the cell to refresh. Return true if the refresh succeeded, otherwise return false.
   // If you return false, the grid will remove the component from the DOM and create
   // a new component in it's place with the new values.
   refresh(): boolean {
        return false;
    }


    analysisNavigation()
    {
     // console.log(this.params);
      if(this.params.data.xrd_analysis.length === 1)
      {
          //navigate to that specific Analysis
          console.log(this.params.data.xrd_analysis[0].id);
          this.router.navigate(['/xrd/analysis/' + this.params.data.xrd_analysis[0].id]);
      }
      else{
          // give the user a choice with a popup
        this.openXrdAnalysesDialog();
      }

    }


    openXrdAnalysesDialog()
    {
         const dialogRef = this.dialog.open(PickXrdAnalysesDialogComponent, {
       
          // disableClose: true,
            width: 'auto',
            autoFocus: true,
            position: {'top': '50px'},
            data: this.params.data.xrd_analysis
          });
      
          dialogRef.afterClosed().subscribe(result => {
    
    
    
            console.log('The dialog was closed',result);
            //navigate to selected result

            if(result) { this.router.navigate(['/xrd/analysis/' + result]); }
      
          });
    }

}
