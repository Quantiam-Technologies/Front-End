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


export class MaterialService {

  public _materialSource = new BehaviorSubject({});
  public material$: Observable<any> = this._materialSource.asObservable();

  private last_id: number;
  private endpoint = '/material';

  constructor(public http: HttpClient, public notification: NotificationsService) { }


  getMaterial(id: number) {
    if (id !== this.last_id) {

     this.http.get<any>(environment.apiUrl + `${this.endpoint}/${id}`)
     .pipe(
        tap( r => {
                    this.last_id = id;

                    }), // set id to be last_id
        map( res => res), // return results without transformation

      )
      .subscribe(
        (material) => this._materialSource.next(material) // broadcast the material to all subscribers
      );
    }
  }

  updateMaterial(params, id = null) {
		if (!id) {  id = this.last_id; }

     return this.http.put<any>(environment.apiUrl + `${this.endpoint}/${id}?filterSpinner`, params)
     .pipe(
        tap( r => {}),
        map( res => {


			 this.notification.success('Updated', 'Material updated', {showProgressBar: false, timeOut: 3000, clickToClose: true});
			 return res;
		}), // return results without transformation
         // catchError( (e) => this.notification.error('Error','Problem updating material.',{showProgressBar:false,timeOut:3000,clickToClose: true})),

      );

  }

 update(params, id = null) {
		if (!id) {  id = this.last_id; }

     return this.http.put<any>(environment.apiUrl + `${this.endpoint}/${id}?filterSpinner`, params)
     .pipe(
        tap( r => {}),
        map( res => {


			 this.notification.success('Updated', 'Material updated', {showProgressBar: false, timeOut: 3000, clickToClose: true});
			 return res;
		}), // return results without transformation
         // catchError( (e) => this.notification.error('Error','Problem updating material.',{showProgressBar:false,timeOut:3000,clickToClose: true})),

      );

  }


  create(params) {

	return this.http.post<any>(environment.apiUrl + `${this.endpoint}?filterSpinner`, params)
     .pipe(
        tap( r => {}),
        map( res => {

			this.notification.success('Material Created', null, {showProgressBar: false, timeOut: 3000, clickToClose: true});
			return res;
		}), // return results without transformation
         // catchError( (e) => this.notification.error('Error','Problem updating material.',{showProgressBar:false,timeOut:3000,clickToClose: true})),

      );
  }


}
