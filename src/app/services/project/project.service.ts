import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient,  } from '@angular/common/http';
import { catchError, map, tap, } from 'rxjs/operators';
import { Observable, of, BehaviorSubject, throwError } from 'rxjs';
import { NotificationsService } from 'angular2-notifications';



@Injectable({
  providedIn: 'root'
})
export class ProjectService {

   private endpoint = '/project';
   private modelName = 'Project';

   private listFetched = false;

   public _ProjectListSource = new BehaviorSubject({});
   public list$: Observable<any> = this._ProjectListSource.asObservable();



  constructor(public http: HttpClient, public notification: NotificationsService) { }

  list() {
   //  console.log(id,this.last_id);

     //   console.log('thing');

        if (!this.listFetched) {
           this.http.get<any>(environment.apiUrl + `${this.endpoint}`)
           .pipe(
              tap( r => {


                          }), // set id to be last_id
              map( r => r), // return results without transformation
          catchError((err) => {

            this.notification.error('Error', 'Does not exist.', {showProgressBar: false, timeOut: 3000, clickToClose: true});
            return err;
               }),
            )
            .subscribe(
              (r: any) => {
                this.listFetched = true;
                if (r) { this._ProjectListSource.next(r); } // broadcast the material to all subscribers

          }
            );

        }



  }


}
