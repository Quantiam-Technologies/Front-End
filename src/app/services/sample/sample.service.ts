import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap, delay, refCount } from 'rxjs/operators';
import { Observable, of, BehaviorSubject, throwError } from 'rxjs';
import { NotificationsService } from 'angular2-notifications';

@Injectable({
  providedIn: 'root'
})
export class SampleService {




    public _SampleSource = new BehaviorSubject({});
    public sample$: Observable<any> = this._SampleSource.asObservable();

    public _SampleDatabaseSource = new BehaviorSubject({});
    public sampleDatabase$: Observable<any> = this._SampleDatabaseSource.asObservable();

    private last_params: string;
    private lastDbParams: any;
	  private alreadyLoadedDb = false;
    private last_id: string;
    private endpoint = '/sample';
  	private modelName = 'Sample';

  constructor(
  public http: HttpClient,
  public notification: NotificationsService,
  ) { }



  get(id: string, refresh = false) {   //  console.log(id,this.last_id);
    if ((id !== this.last_id) || refresh) {

     this.http.get<any>(environment.apiUrl + `${this.endpoint}/${id}`)
     .pipe(
        tap( r => {

                    }), // set id to be last_id
        map( res => res), // return results without transformation
        catchError((err) => {

                this.notification.error(id, 'Does not exist.', {showProgressBar: false, timeOut: 3000, clickToClose: true});
                return err;
        }),
      )
      .subscribe(
        (r: any) => {
        this._SampleSource.next(r); // broadcast the material to all subscribers
        this.last_id = r.id;
      });
    }
  }

  update(id: string = null, params: Object) {

    if (!id) {  id = this.last_id; } // if we fail to specify the ID, update last retrieved model

    console.log(params);
    return  this.http.put<any>(environment.apiUrl + `${this.endpoint}/${id}?filterSpinner`, params)
     .pipe(
        tap( r => {

			}),
        map( res => {

        this.notification.success('Updated', 'Sample ' + res.id + ' updated.', {showProgressBar: false, timeOut: 3000, clickToClose: true});
        return res;

		})
	);
 }

  create(params: Object) {

     return  this.http.post<any>(environment.apiUrl + `${this.endpoint}?filterSpinner`, params)
     .pipe(
        map( res => {

		console.log(this._SampleSource);
        this.notification.success('Updated', 'Sample ' + res.id + ' created.', {showProgressBar: false, timeOut: 3000, clickToClose: true});
        return res;

      })
      );

  }

  delete(id: string) {

    return  this.http.delete<any>(environment.apiUrl + `${this.endpoint}/${id}?filterSpinner`)
     .pipe(
        map( res => {

        this.notification.success('Delete', 'Sample Deleted', {showProgressBar: false, timeOut: 3000, clickToClose: true});
        return res;

      })
      );



    }

  getDatabase(params: Object) {


		if (!this.alreadyLoadedDb) {


			this.alreadyLoadedDb = true;

		   return  this.http.get<any>(environment.apiUrl + `${this.endpoint}?filterSpinner&creator=true`, params)
			   .pipe(
					map( res => {   // this.notification.success('Delete','Sample Deleted',{showProgressBar:false,timeOut:3000,clickToClose: true});
					return res;
					})
				)
			  .subscribe(
				(r: any) => {
					this._SampleDatabaseSource.next(r); // broadcast the material to all subscribers

				}
			  );
        
		}
	}


  addContainer(params) {

		   return  this.http.post<any>(environment.apiUrl + `${this.endpoint}/container?filterSpinner`, params)
			   .pipe(
					 tap( r => {

                    }),
					map( res => res),
					catchError((err) => {

							this.notification.error(err.id, 'Something went wrong.', {showProgressBar: false, timeOut: 3000, clickToClose: true});
							return err;
					}),
			  );



  }

  getList() {}


}
