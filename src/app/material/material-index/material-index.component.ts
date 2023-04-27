import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatLegacyDialog as MatDialog, MatLegacyDialogConfig as MatDialogConfig, MatLegacyDialogRef as MatDialogRef } from '@angular/material/legacy-dialog';
import { MaterialCreationDialogComponent } from '../material-creation-dialog/material-creation-dialog.component';
import { MaterialService } from '../../services/material/material.service';
import { MaterialLotContainerService } from '../../services/material-lot-container/material-lot-container.service';
import { Router  } from '@angular/router';
import { Subject } from 'rxjs';
import { UserService } from '../../services/user/user.service';


@Component({
  selector: 'app-material-index',
  templateUrl: './material-index.component.html',
  styleUrls: ['./material-index.component.css']
})
export class MaterialIndexComponent implements OnInit, OnDestroy {

  selectedMaterialId;
  selectedContainerId;
  selectedLotId;
  _material:any;
  _container:any;
  _lot:any;




  constructor(
    private dialog: MatDialog, private materialService: MaterialService, 
    private materialLotContainerService: MaterialLotContainerService, 
    public router: Router, public userService: UserService) { }

  ngOnInit() {

    // What material have we been looking at?
    this._material = this.materialService.material$.subscribe(res => {

       if (typeof res !== 'undefined') {  this.selectedMaterialId = res.id; }

      });

      //// Container register thingy
     this._container = this.materialLotContainerService.materialLotContainer$.subscribe( res => {

        if (typeof res !== 'undefined') {  this.selectedContainerId = res.id; }
       });

      // Default Nav Pane
      //this.router.navigate(['material/container/database']);



      // Scanner thingy here


  }

  ngOnDestroy() {
    this._material.unsubscribe();
    this._container.unsubscribe();

  }

  openDialog() {

          const dialogConfig = new MatDialogConfig();

          dialogConfig.disableClose = true;
          dialogConfig.autoFocus = true;
          dialogConfig.width = '1000px';
         // dialogConfig.height = '0vh';
          dialogConfig.position = {'top': '50px'};
          this.dialog.open(MaterialCreationDialogComponent, dialogConfig);
      }
}
