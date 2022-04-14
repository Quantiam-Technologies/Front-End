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
export class SampleCommentService {

  private endpoint = '/sample/comment';
	private modelName = 'Sample Comment';

  constructor(
  public http: HttpClient, 
  public notification: NotificationsService,) { }
  
  
  
    
  delete(id:string)
  {
  
    return  this.http.delete<any>(environment.apiUrl+`${this.endpoint}/${id}?filterSpinner`)
         .pipe(
            map( res => {
        
            this.notification.success('Delete',this.modelName+' Deleted.',{showProgressBar:false,timeOut:3000,clickToClose: true});        
            return res; 			
        })
      );
  
  
  }
  
  create(params:Object)
  {
  
   return  this.http.post<any>(environment.apiUrl+`${this.endpoint}?filterSpinner`, params)
       .pipe(
          map( res => {
      
          this.notification.success('Created',this.modelName+' '+res.id+' created.',{showProgressBar:false,timeOut:3000,clickToClose: true});        
          return res; 			
      })
    );
  
  }
  
  update(id:string = null, params:Object)
  {
  
    return  this.http.put<any>(environment.apiUrl+`${this.endpoint}/${id}?filterSpinner`, params)
       .pipe(
          map( res => {
      
          this.notification.success('Updated',this.modelName+' '+res.id+' updated.',{showProgressBar:false,timeOut:3000,clickToClose: true});        
          return res; 			
      })
    );
  
  
  }
  
}
