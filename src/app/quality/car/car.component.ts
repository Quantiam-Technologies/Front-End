import {Component, ElementRef, ViewChild,OnInit, Input, EventEmitter, Output} from '@angular/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {FormBuilder, FormControl, FormGroup,Validators} from '@angular/forms';
import {MatChipInputEvent} from '@angular/material/chips';
import { SelectUserService } from '../../shared/select-user/select-user.service';
import {Observable} from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import {map, startWith,tap} from 'rxjs/operators';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { NotificationsService } from 'angular2-notifications';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {

 
  carFormObject:any;
  carFormObjectOptions;
  selectedResponsible = [] as any;
  userList;
  isPopUp = false;
  filteredUsers;  
 // MAT_DIALOG_DATA = {};
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  addOnBlur = true;
  data;  //CAR OBJECT
  formRender = false;
  
  @ViewChild('responsibleInput') responsibleInput: ElementRef<HTMLInputElement>;

  @Input() carObject:any = { id: null, name:null, description: null, type: null,index: null, arrayLength:null, saved: false, deleted: false, ncr_id: null,
     project_id: null, occurred: null, responsible:null, disposition_comment:null, effective:null, status: null, completed: null, target_completion: null, completed_at: null};

    // Outputs
  @Output() removed = new EventEmitter<any>();

  constructor(
    
    private http: HttpClient,
    private userService:SelectUserService,
    //public dialogRef: MatDialogRef<any>,
    //@Inject(MAT_DIALOG_DATA) public data:any,    
    private notification: NotificationsService,
    private route: ActivatedRoute,
    ) { }

  ngOnInit(): void {
  

    if(this.carObject.id){ 
      console.log(this.carObject);
     // this.carObject = this.data;
     // this.isPopUp = true;
     
      console.log('not route trigger', this.carObject);
      this.isPopUp = true;
      this.createForm();
  
     };

     if(!this.carObject.id)
     {
       console.log('route_form');
        this.fetchCar();
      
     }
  }

  createForm()
  {

     
    if(this.carObject.responsible)
    {
      this.selectedResponsible = [];
      this.carObject.responsible.forEach(element => {
            this.selectedResponsible.push(element.employee);
        });
    }

    this.carFormObjectOptions = new FormGroup({
      name: new FormControl(this.carObject.name, [Validators.required]),
      description: new FormControl(this.carObject.description, [Validators.required]),
      completed: new FormControl(this.carObject.completed,[Validators.required]),  //ongoing, resolved
      effective: new FormControl(String(this.carObject.effective),null),  //ongoing, resolved
     // type: new FormControl(this.carObject.type,null),  //temporary, permanent
      target_completion: new FormControl(this.carObject.target_completion,[Validators.required]),
      responsible: new FormControl(this.carObject,[Validators.required]),  //who is responsible for this action 
      disposition_comment: new FormControl(this.carObject.disposition_comment,),  //who is responsible for this action 
     });

     this.userService.list();
     this.userService.list$.subscribe((r) => {
          this.userList = r;
          this.filteredUsers = this.carFormObjectOptions.controls['responsible'].valueChanges
        .pipe(
          startWith(''),
          map(value => {
           // console.log(value);
              if(value)
              {
              const filteredArray = this.userList.filter((item)=>{
               //  console.log(item.name.includes(value));
                if((item.name.toLowerCase().includes(value) || item.name.includes(value)) && item.active) { return item; }
              })               
              return filteredArray;
             }
            return this.userList;
          })
        );

      });

      this.formRender = true;


  }

  updateCar()
  {
    //  this.http.put()
    let params =  this.carFormObjectOptions.getRawValue();
    if(status){ params.status = status; }
    if(params.effective === 'null'){  params.effective = null;}
    params.responsible = this.selectedResponsible;
    this.http.put(environment.apiUrl + '/car/' + this.carObject.id, params).subscribe((r:any)=>{
      this.carObject = Object.assign({}, r, this.carObject);
      this.carObject.saved = true;
      
     // this.data = r;
      this.notification.success('Success',  'Car Details Saved', {timeOut: 4000, showProgressBar: false, clickToClose: true}); /// Daily OT notificaton
      // this.canEditCheck();
    }) 

  }


  deleteCar()
  {
    if(confirm('Do you really want to delete this CAR'))
    {
    this.http.delete(environment.apiUrl + '/car/' + this.carObject.id).subscribe((r:any)=>{
            this.notification.success('Success',  'Car Deleted', {timeOut: 4000, showProgressBar: false, clickToClose: true}); /// Daily OT notificaton
            this.carObject.deleted = true;
          
            this.removed.emit(this.carObject);
           // this.dialogRef.close(this.data);
      // this.canEditCheck();
    }) 
   }
  }

  fetchCar()
  {

    //fetch from URL
    
    const id = this.route.snapshot.paramMap.get('id');
    this.http.get(environment.apiUrl + '/car/' + id).subscribe((r:any)=>{
      this.carObject = r;
      this.createForm();
      console.log(this.carObject);
    });

  }

  selectResponsible(event)
  {
   
    this.selectedResponsible.push(event.option.value);    
    this.responsibleInput.nativeElement.value = '';
    console.log(this.selectedResponsible);
  }

  add(event: MatChipInputEvent): void {
    console.log(event);
    this.carFormObjectOptions.controls['responsible'].setValue(null);    
    this.responsibleInput.nativeElement.value = '';
  }

  remove(event,index): void {
    console.log(event,index);
    if (index >= 0) {
      this.selectedResponsible.splice(index, 1);
    }    
  }





}
