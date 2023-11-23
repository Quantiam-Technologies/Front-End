import { Component, OnInit,Inject } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { environment} from '../../../environments/environment';
import { MAT_DIALOG_DATA} from '@angular/material/dialog';
import { NotificationsService } from 'angular2-notifications';

import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { T } from '@angular/cdk/keycodes';


@Component({
  selector: 'app-steel-rework-dialog',
  templateUrl: './steel-rework-dialog.component.html',
  styleUrls: ['./steel-rework-dialog.component.css']
})
export class SteelReworkDialogComponent implements OnInit {

  reworkReasonList;
  processList;
  processReworkDestinationList;
  reworkObject:any = {next_process_id: null, process_id:null, rework_reason_id:null, comment:null};
  steelObject;


  constructor(
    public dialogRef: MatDialogRef<SteelReworkDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any, private http: HttpClient,  private notification: NotificationsService
  ) {

    this.steelObject = data;
    this.reworkObject.steel_id = data.id; 
    this.fetchProcessList();
    this.fetchReworkReasonList();

  }

     //   console.log(data);


  fetchReworkReasonList(){

    this.http.get(environment.apiUrl + `/steel/rework/reason/list`, { params: null }).subscribe((r: any) => { 

      this.reworkReasonList = r;

     })
 
   
    ///http://api.edm.quantiam.com/steel/rework/reason/list?like=&page=1
  }

  fetchProcessList()
  {

    this.http.get(environment.apiUrl + `/process/list`, { params: null }).subscribe((r: any) => { 

       this.processList = r;


     })
    

  }


  createRework(){

     // console.log(this.reworkObject);

       this.http.post(environment.apiUrl + `/steel/`+this.reworkObject.steel_id+`/rework`, this.reworkObject).subscribe((r: any) => {   

          this.printTraveller(this.reworkObject.steel_id);
          
          this.notification.success('Saved', 'The rework was created successfully.',{timeOut: 2000, showProgressBar: false, clickToClose: true}); /// Daily OT notificaton
          this.dialogRef.close();

      }) 


  }

  checkReworkRediness(){

    if(this.reworkObject.next_process_id && this.reworkObject.process_id  && this.reworkObject.rework_reason_id ) return true;    


    return false;

  }


  printTraveller(steel_id){
    this.http.get(environment.apiUrl + '/steel/'+steel_id+'/traveller',).subscribe((r:any) => {
      window.location.assign(r.url);    
    });
    

}


     
     

  ngOnInit() {

    //console.log(this.data);
  }

}
