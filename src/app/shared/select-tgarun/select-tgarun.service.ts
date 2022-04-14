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
export class SelectTgarunService {

  private endpoint = '/tgarun';
  private modelName = 'TgaRun';

  private listFetched = false;

  public _ListSource = new BehaviorSubject({});
  public list$: Observable<any> = this._ListSource.asObservable();


  constructor(public http: HttpClient, public notification: NotificationsService) { }


  list() {

         if (!this.listFetched) {
            this.http.get<any>(environment.apiUrl + `${this.endpoint}`)
            .pipe(
               tap( r => { }), // set id to be last_id
               map( r => r), // return results without transformation
           catchError((err) => {
             this.notification.error('Error', 'Does not exist.', {showProgressBar: false, timeOut: 3000, clickToClose: true});
             return err;
                }),
             )
             .subscribe(
               (r: any) => {
                 this.listFetched = true;
                 if (r) { this._ListSource.next(r); } // broadcast the material to all subscribers
              }
             );
         }
     }




}
