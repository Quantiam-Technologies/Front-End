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
export class MaterialLotListService {

  public _Source = new BehaviorSubject({});
  public materialLotContainer$: Observable<any> = this._Source.asObservable();
  
  private last_id: string;  
  private endpoint = '/material/lot/list';

  constructor(public http: HttpClient, public notification: NotificationsService) { }
 
  get(material_id){
  
        
              
             this.http.get<any>(environment.apiUrl+`${this.endpoint}/${material_id}`)
             .pipe(
                tap( r => r), //set id to be last_id
                map( res => res), // return results without transformation
              
              )
              .subscribe(
                (r) => this._Source.next(r) //broadcast the material to all subscribers       
              );
            
            
    
    
    }
 
}
