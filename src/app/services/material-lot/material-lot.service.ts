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
export class MaterialLotService {

	public _lotSource = new BehaviorSubject({});
  public materialLot$: Observable<any> = this._lotSource.asObservable();
  
  private last_id: string;  
  private endpoint = '/material/lot';


  constructor(public http: HttpClient, public notification: NotificationsService) { }
  
  get(){}
  
  update(){}
  
  create(params)
  { 	 
    return this.http.post<any>(environment.apiUrl+`${this.endpoint}`, params)
     .pipe(
        tap( r => {	}), 
        map( res => {
			
			  this.notification.success(' Lot','Created lot '+res.id,{showProgressBar:false,timeOut:3000,clickToClose: true});
			  return res;
		
		
		}), // return results without transformation
         //catchError( (e) => this.notification.error('Error','Problem updating material.',{showProgressBar:false,timeOut:3000,clickToClose: true})),
       
      );
     /*  .subscribe(
        (lot) => 
        {
			if(lot) this._lotSource.next(lot);
        //  this._materialSource.next(material); //broadcast the material to all subscribers 
          this.notification.success('Updated','Lot created.',{showProgressBar:false,timeOut:3000,clickToClose: true});
        }
      ); */
  
  }
  
  
  
  
}
