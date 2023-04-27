import { Component, ElementRef, OnInit,ViewChild } from '@angular/core';
import {Observable} from 'rxjs';
import {map, startWith,tap} from 'rxjs/operators';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { MatAutocomplete} from '@angular/material/autocomplete';
import { SelectUserService } from '../../shared/select-user/select-user.service';
import {FormBuilder, UntypedFormControl, UntypedFormGroup,Validators} from '@angular/forms';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-tapecast',
  templateUrl: './tapecast.component.html',
  styleUrls: ['./tapecast.component.css']
})
export class TapecastComponent implements OnInit {

  @ViewChild('responsibleInput') responsibleInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;
  
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  userList;
  tapecastObject:any = {profile: {} as any};
  tapecastFormObject:any;
  castedFlag = false;
  
  showAfterCastSlipFields;
  
  filteredUsers: Observable<any[]>;

  selectedOperators = [{id:65,name:'Tyson Boyce',title:'QA/QC Supervisor', clearable: false}];

  operatorsControl = new UntypedFormControl();

  constructor(
    private userService:SelectUserService,
    private http: HttpClient,
    private route: ActivatedRoute,     
  	private notification: NotificationsService,
    public router: Router,
    ) { }

  

  ngOnInit(): void {

    this.tapecastFormObject = new UntypedFormGroup({
      operators: new UntypedFormControl({ value:this.selectedOperators},[Validators.required]),
      
    });
    //get ID and fetch object
    this.route.params.subscribe((route) =>{
      this.getTapecast(route['id']);
    })

    //// User Service thing
    this.userService.list();
    this.userService.list$.subscribe((r) => {
         this.userList = r;
         this.filteredUsers = this.operatorsControl.valueChanges  //when the value changes on this control, it will filter the list
       .pipe(
         startWith(''),
         map(value => {
             if(value)
             {
             const filteredArray = this.userList.filter((item)=>{
               if((item.name.toLowerCase().includes(value) || item.name.includes(value)) && item.active) { return item; }
             })               
             return filteredArray;
            }
           return this.userList;
         })
       );

     });

  }

  




  
  getTapecast(id){

    this.http.get(environment.apiUrl + '/tapecast/' + id).subscribe((r:any)=>{

        this.tapecastObject = r;

        //// format for Angular Material Datetime thing
       
        if( this.tapecastObject.time_removed_from_table) this.tapecastObject.time_removed_from_table = this.tapecastObject.time_removed_from_table.replace(/ /g,"T");
        if( this.tapecastObject.airflow_start_time) this.tapecastObject.airflow_start_time = this.tapecastObject.airflow_start_time.replace(/ /g,"T");
        if( this.tapecastObject.created_at) this.tapecastObject.created_at = this.tapecastObject.created_at.replace(/ /g,"T");


        //this.tapecastFormObject.patchValue(r);
        this.selectedOperators = [];
        r.operators.forEach(element => {
            this.selectedOperators.push(element.employee);
        }); 


    })

  }

  updateTapecast(event?)
  {

      if(event) //campaign ID thing 
      {
        this.tapecastObject.campaign_id = event.id;
      }
        //// I'm sure this could be done server side....
        if( this.tapecastObject.time_removed_from_table)  this.tapecastObject.time_removed_from_table = this.tapecastObject.time_removed_from_table.replace(/T/g," ");
        if( this.tapecastObject.airflow_start_time) this.tapecastObject.airflow_start_time = this.tapecastObject.airflow_start_time.replace(/T/g," ");
        if( this.tapecastObject.created_at) this.tapecastObject.created_at = this.tapecastObject.created_at.replace(/T/g," ");

        this.http.put<any>(environment.apiUrl + `/tapecast/${this.tapecastObject.id}`, this.tapecastObject)
          .subscribe( res => {        
                    

                    
                    //// format for Angular Material Datetime thing
                    if( res.time_removed_from_table)   res.time_removed_from_table = res.time_removed_from_table.replace(/ /g,"T");
                    if( res.airflow_start_time) res.airflow_start_time = res.airflow_start_time.replace(/ /g,"T");
                    if( res.created_at) res.created_at = res.created_at.replace(/ /g,"T");
                    this.tapecastObject = res;

                    this.notification.success('Updated', 'Tapecast updated.', {showProgressBar: false, timeOut: 3000, clickToClose: true});

                })
       
        
  }

  deleteTapecast()
  {
    if(confirm('Are you sure you want to delete this NCR?'))
    {

      this.http.delete(environment.apiUrl + '/tapecast/' + this.tapecastObject.id).subscribe((r)=>{
        //redirect to 
        this.router.navigate(['/tapecast/database'], {queryParams: { refreshTable: true}});
      });
    }

  }

  selectOperators(event)
  {
   
    this.selectedOperators.push(event.option.value);   
    this.tapecastObject.operators.push(event.option.value); 
    this.responsibleInput.nativeElement.value = '';
    this.http.put<any>(environment.apiUrl + `/tapecast/${this.tapecastObject.id}/operators`, this.tapecastObject.operators)
    .subscribe( res => {        
      this.notification.success('Updated', 'Operators updated.', {showProgressBar: false, timeOut: 3000, clickToClose: true});

    })
   // console.log(this.selectedOperators);
  }

  removeOperator(event,index): void {
    // console.log(event,index);
     if (index >= 0) {
       this.tapecastObject.operators.splice(index, 1);
       this.http.put<any>(environment.apiUrl + `/tapecast/${this.tapecastObject.id}/operators`, this.tapecastObject.operators)
       .subscribe( res => {        
            this.notification.success('Updated', 'Operators updated.', {showProgressBar: false, timeOut: 3000, clickToClose: true});

       })
     }
   }

  

}
