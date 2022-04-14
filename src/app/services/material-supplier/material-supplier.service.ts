
import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap, delay, shareReplay, publishReplay, refCount } from 'rxjs/operators';
import { Observable, of, BehaviorSubject, throwError } from 'rxjs';
import { NotificationsService } from 'angular2-notifications';


@Injectable({
  providedIn: 'root'
})
export class MaterialSupplierService {

  private endpoint = '/material/supplier';

  // public _materialLotContainerDatatableSource = new BehaviorSubject({});
  // public materialLotContainerDatatable$: Observable<any> = this._materialLotContainerDatatableSource.asObservable();

  constructor(public http: HttpClient, public notification: NotificationsService) { }


  getList() {



  }


  create(params) {


    return this.http.post<any>(environment.apiUrl + `${this.endpoint}`, params)
     .pipe(
        tap( r => {	}),
        map( res => {
			  this.notification.success('Supplier', 'Created Supplier ' + res.id, {showProgressBar: false, timeOut: 3000, clickToClose: true});
			  return res;
		}), // return results without transformation
         // catchError( (e) => this.notification.error('Error','Problem updating material.',{showProgressBar:false,timeOut:3000,clickToClose: true})),
      );

  }
}
