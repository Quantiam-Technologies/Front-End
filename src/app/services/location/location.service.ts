import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable,BehaviorSubject } from 'rxjs'
import { NotificationsService } from 'angular2-notifications';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  public _ListSource = new BehaviorSubject({});
  public list$: Observable<any> = this._ListSource.asObservable();
  
  private endpoint = '/location';
  private listFetched = false;

  constructor(public http: HttpClient, public notification: NotificationsService) { }
  
  getList(params = {}, forceFetch = false)
  {
  //  console.log('test');
    if(!this.listFetched || forceFetch)
		{
			
			this.listFetched = true;
		  
		   return  this.http.get<any>(environment.apiUrl+`${this.endpoint}/list?filterSpinner&creator=true`,params)
			   .pipe( 
					map( res => {  
             
					  return res; 			
					})
				)
			  .subscribe(
			  	(r:any) => {
					this._ListSource.next(r); //broadcast the material to all subscribers 					
				}
			  );
	  
		}    
  
  }
  
  
}
