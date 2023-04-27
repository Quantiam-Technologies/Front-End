
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {Component, ElementRef, ViewChild,OnInit} from '@angular/core';
import {FormBuilder, UntypedFormControl, UntypedFormGroup,Validators} from '@angular/forms';
import {MatLegacyChipInputEvent as MatChipInputEvent} from '@angular/material/legacy-chips';
import {MatLegacyAutocompleteSelectedEvent as MatAutocompleteSelectedEvent, MatLegacyAutocomplete as MatAutocomplete} from '@angular/material/legacy-autocomplete';
import { UserService } from '../../services/user/user.service';
import { ProjectService } from '../../services/project/project.service';
import { SelectUserService } from '../../shared/select-user/select-user.service';
import {Observable} from 'rxjs';
import {map, startWith,tap} from 'rxjs/operators';
import * as moment from 'moment';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { NotificationsService } from 'angular2-notifications';
import {MatLegacyDialog as MatDialog, MatLegacyDialogRef as MatDialogRef, MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA} from '@angular/material/legacy-dialog';
import { CarDialogComponent } from '../car-dialog/car-dialog.component';
import { CarComponent } from '../car/car.component';

export interface Fruit {
  name: string;
}

@Component({
  selector: 'app-ncr',
  templateUrl: './ncr.component.html',
  styleUrls: ['./ncr.component.css']
})
export class NcrComponent implements OnInit {

  
  @ViewChild('responsibleInput') responsibleInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  ncrName;
  ncrOptions;
  ncrObject:any = {
    id:null, status: null, name: null, requirement_violated:null,completion_notes: null,completed_by:null, completed_at: null,created_by:{name:null},
    type:null,severity:null,description:null,buisness_unit:null,project_id:null,occurred:null, media: null, cars: []
  };
  ncrLoading = false;

  showNcrDocumentUpload = false;
  showCarDocumentUpload = false; 

  projectList;
  filteredProjects: Observable<any[]>;

  userList;
  filteredUsers: Observable<any[]>;

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  selectedResponsible = [{id:65,name:'Tyson Boyce',title:'QA/QC Supervisor', clearable: false}
  ];

  allUsers;  
  allFruits: string[] = ['Apple', 'Lemon', 'Lime', 'Orange', 'Strawberry'];


  constructor(
    private userService:SelectUserService,
    private route: ActivatedRoute, 
    private http: HttpClient,
    private notification: NotificationsService,
    private projectService: ProjectService,
    public carDialog: MatDialog,
    private router: Router,
    ) {
      

   }

  ngOnInit(): void {

    this.ncrOptions = new UntypedFormGroup({
      name: new UntypedFormControl({ value:this.ncrObject.name, disable: true}, [Validators.required]),
      requirement_violated: new UntypedFormControl({ value:this.ncrObject.requirement_violated, disable: true}, [Validators.required]),
      type: new UntypedFormControl({ value:this.ncrObject.type, disable: true}, [Validators.required]),
      severity: new UntypedFormControl({ value:this.ncrObject.severity, disable: true}, [Validators.required]),
      description: new UntypedFormControl({ value:this.ncrObject.description, disable: true}, [Validators.required]),
      immediate_containment_action: new UntypedFormControl({ value:null, disable: true},null),
      buisness_unit: new UntypedFormControl({ value:this.ncrObject.buisness_unit, disable: true}, [Validators.required]),
      status: new UntypedFormControl({ value:this.ncrObject.status, disable: true},null),
      project_id: new UntypedFormControl({ value:this.ncrObject.project_id, disable: true},null),
      occurred: new UntypedFormControl({ value:this.ncrObject.occurred, disable: true},[Validators.required]),
      responsible: new UntypedFormControl({ value:this.selectedResponsible, disable: true},[Validators.required]),
      completion_notes: new UntypedFormControl({ value: this.ncrObject.completion_notes, disable: false}),
     });

     this.ncrOptions.controls['responsible'].setValue({id:65,name:'Tyson Boyce',title:'QA/QC Supervisor', clearable: false});


  
    this.ncrLoading = true;

        this.route.params.subscribe((route) =>{
            this.fetchNCR(route['id']);
    })
  
     this.projectService.list();
     this.projectService.list$.subscribe((r) => {
          this.projectList = r;
          this.filteredProjects = this.ncrOptions.controls['project_id'].valueChanges
        .pipe(
          startWith(''),
          map(value => {
              if(value)
              {
              const filteredArray = this.projectList.filter((item)=>{
              
                if(item.id.toString().toLowerCase().includes(value) && item.active) { return item; }
              });
              return filteredArray;
            }
            return this.projectList;
          })
        );

      });

      this.userService.list();
      this.userService.list$.subscribe((r) => {
           this.userList = r;
           this.filteredUsers = this.ncrOptions.controls['responsible'].valueChanges
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


  fetchNCR(id){

    this.http.get(environment.apiUrl + '/ncr/' + id).subscribe((r:any)=>{

        this.ncrObject = r;
        this.ncrOptions.patchValue(r);
        this.selectedResponsible = [];
        r.responsible.forEach(element => {
            this.selectedResponsible.push(element.employee);
        });

        this.ncrOptions.updateValueAndValidity();
        this.ncrLoading = false;
        this.canEditCheck();

    })

  }

  canEditCheck()
  {
    if(this.ncrObject.status === 'draft') { this.ncrOptions.enable(); }
    if(this.ncrObject.status === 'ongoing' || this.ncrObject.status == 'completed') {
       
      this.ncrOptions.disable();
      
      }

  }

  updateNCR(status?)
  {     
      
      let params =  this.ncrOptions.getRawValue();
      if(status){ params.status = status; }
      params.responsible = this.selectedResponsible;
      this.http.put(environment.apiUrl + '/ncr/' + this.ncrObject.id, params).subscribe((r:any)=>{
        this.ncrObject = r;
        this.notification.success('Success',  'NCR Details Saved', {timeOut: 4000, showProgressBar: false, clickToClose: true}); /// Daily OT notificaton
        this.canEditCheck();
      }) 
  }

  selectResponsible(event)
  {
   
    this.selectedResponsible.push(event.option.value);    
    this.responsibleInput.nativeElement.value = '';
    console.log(this.selectedResponsible);
  }

  add(event: MatChipInputEvent): void {
    console.log(event);
    this.ncrOptions.controls['responsible'].setValue(null);    
    this.responsibleInput.nativeElement.value = '';
  }

  remove(event,index): void {
    console.log(event,index);
    if (index >= 0) {
      this.selectedResponsible.splice(index, 1);
    }
  }


  checkEditPrivledges()
  {


  }


  openCarDialog(car, index)
  {
    car.arrayLength = this.ncrObject.cars.length;
    car.index = index;
    const dialogRef = this.carDialog.open(CarDialogComponent, {
      width: '700px',
      position: {'top':'10px'},
      data: car,
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);


      //this.ncrObject.cars[index] = result;

      this.fetchNCR(this.ncrObject.id);

      if(result.hasOwnProperty('next'))
      {
        this.openCarDialog(this.ncrObject.cars[index+1],index+1);
      }
      else if(result.hasOwnProperty('previous'))
      {
        this.openCarDialog(this.ncrObject.cars[index-1],index-1);
      }
      else if(result.hasOwnProperty('deleted') && result.deleted)
      {
        this.ncrObject.cars = this.ncrObject.cars.filter(car => car.id !== result.id);
      }

    });
  

  }


  createCar(ncrObject)
  {
    this.http.post(environment.apiUrl + '/ncr/' + this.ncrObject.id + '/car', ncrObject).subscribe((r:any)=>{

      this.ncrObject.cars.push(r);
      this.openCarDialog(r,null);

      this.notification.success('Success',  'Created Corrective Action Report', {timeOut: 4000, showProgressBar: false, clickToClose: true}); /// Daily OT notificaton
    }) 


  }

  canCompleteNcr()
  {

    if(this.ncrObject.cars.length > 0)
    {
      const unfinishedCar = this.ncrObject.cars.filter((car)=>{
          return car.completed === 0 ;
      })

      if(unfinishedCar.length > 0) { return false; }
      return true;

    }
    return false;
  }

  markNcrAsComplete()
  {
    this.updateNCR('completed');
  }

  deleteNCR()
  {
    if(confirm('Are you sure you want to delete this NCR?'))
    {

      this.http.delete(environment.apiUrl + '/ncr/' + this.ncrObject.id).subscribe((r)=>{
        //redirect to 
        this.router.navigate(['/quality/ncr/database'], {queryParams: { refreshTable: true}});
      });
    }

  }

}
