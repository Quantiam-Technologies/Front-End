import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { NotificationsService } from 'angular2-notifications';



export interface WhimsHazardSymbol {
  id: number;
  url: string;
  name: string;

}
export interface MaterialObj {
  id: number;
  name: string;
  grade: string;
  whmis_hazard_symbols: Array<WhimsHazardSymbol>;
}


@Component({
  selector: 'app-material-hazard-symbol-selector',
  templateUrl: './material-hazard-symbol-selector.component.html',
  styleUrls: ['./material-hazard-symbol-selector.component.css']
})
export class MaterialHazardSymbolSelectorComponent implements OnInit {

  hazardSymbols;

  constructor(
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public material: any,
    private http: HttpClient,
    private notification: NotificationsService, ) {}

  ngOnInit() {
    console.log(this.material);
    this.fetchWhmisHazardList();
  }


  fetchWhmisHazardList() {
    this.http.get<any>(environment.apiUrl + '/whmis-hazard-symbols')
    .subscribe(r => {

      this.hazardSymbols = r;
      console.log(this.hazardSymbols);

    });

  }


  updateMaterialHazardSymbols(event, hazard) {
    console.log(event);

  }

  materialHasHazard(id) {
   // console.log(id, this.material.whmis_hazard_symbols);
      // return true;

        const check = this.material.whmis_hazard_symbols.filter((obj) => obj.id === id);
        if (check[0]) {
           return true;
        }

        return false;

  }

  updateMaterialHazard(event, hazard) {
    console.log(event, hazard.id);

    // true add to the material array
    if (event.checked) {

      // const hazard = this.hazardSymbols.find((obj) => obj.id === hazard.id);
      this.http.post(environment.apiUrl + '/material/' + this.material.id + '/whmis-hazard-symbol',  hazard).subscribe((response) => {

        this.material.whmis_hazard_symbols.push(hazard);
        this.notification.success('Hazard Symbol Added', 'We added ' + hazard.name + '.', {showProgressBar: false, timeOut: 5000, clickToClose: true});

      });


    }

    // false substract from material array
    if (!event.checked) {

      this.http.delete(environment.apiUrl + '/material/' + this.material.id + '/whmis-hazard-symbol/' + hazard.id).subscribe((response) => {

        this.material.whmis_hazard_symbols = this.material.whmis_hazard_symbols.filter((obj) => obj.id !== hazard.id);
        this.notification.success('Hazard Symbol Deleted', 'We deleted ' + hazard.name + '.', {showProgressBar: false, timeOut: 5000, clickToClose: true});

      });
    }

  }

}
