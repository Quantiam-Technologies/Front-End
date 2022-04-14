import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient,  } from '@angular/common/http';
import { catchError, map, tap,  } from 'rxjs/operators';
import { Observable,  BehaviorSubject,  } from 'rxjs';
import { NotificationsService } from 'angular2-notifications';

@Injectable({
  providedIn: 'root'
})
export class SelectPermissionService {

  private endpoint = '/permission';
  private modelName = 'permission';

  private listFetched = false;
  private previousParams = {};

  public _ListSource = new BehaviorSubject({});
  public list$: Observable<any> = this._ListSource.asObservable();


  constructor(public http: HttpClient, public notification: NotificationsService) { }

  list(params = {}) {

    if (!this.listFetched || this.previousParams !== params) {

       this.previousParams = params;
       console.log(params);
      // if(params.user.id){ params.user_does_not_possess =  };
       this.http.get<any>(environment.apiUrl + `${this.endpoint}` + '/list/select2', {'params': params})
       .pipe(
          tap( r => {    }), // set id to be last_id
          map( r =>  r), // return results without transformation
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
