import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient,  } from '@angular/common/http';
import { catchError, map, tap, } from 'rxjs/operators';
import { Observable, of, BehaviorSubject, throwError } from 'rxjs';
import { NotificationsService } from 'angular2-notifications';


@Injectable({
  providedIn: 'root'
})
export class SelectMaterialSupplierService {


  private endpoint = '/material/supplier'

  private listFetched = false;

  public _Source = new BehaviorSubject({});
  public list$: Observable<any> = this._Source.asObservable();


  constructor(private http: HttpClient) {
      
    this.getList();

   }


  getList() {
         if (!this.listFetched) {
            this.http.get<any>(environment.apiUrl + `${this.endpoint}`)
            .pipe(
               //tap( r => { }),
               map( r => r), // return results without transformation
           catchError((err) => err),
             )
             .subscribe(
               (r: any) => {
                 this.listFetched = true;
                 if (r) { this._Source.next(r.results); } // broadcast the supplier to all subscribers
           });
         }
   }
}
