
import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap, delay,shareReplay, publishReplay,refCount } from 'rxjs/operators';
import { Observable,of, BehaviorSubject,throwError } from 'rxjs'
import { NotificationsService } from 'angular2-notifications';


@Injectable({
  providedIn: 'root'
})
export class XpsService {

  public _Subject = new BehaviorSubject({});
  public xpsRun$: Observable<any> = this._Subject.asObservable();
  
  private last_id: string;  
  private endpoint = '/xps/run';

  constructor(public http: HttpClient, public notification: NotificationsService) { }
  
     
  get(id :string)
  {
   //  console.log(id,this.last_id);
    if(id != this.last_id) // fetch if id is different
    {
      
     this.http.get<any>(environment.apiUrl+`${this.endpoint}/${id}`)
     .pipe(
        tap( r => {                    
                    
                    }), //set id to be last_id
        map( res => res), // return results without transformation
		catchError((err) => {
			
          this.notification.error(id,'Does not exist.',{showProgressBar:false,timeOut:3000,clickToClose: true});
          return err;
         }),
      )
      .subscribe(
        (r:any) => {
        this._Subject.next(r); //broadcast the material to all subscribers 
			 this.last_id = r.id;
      }
      );
    }
  }
  
  
  
  
}
