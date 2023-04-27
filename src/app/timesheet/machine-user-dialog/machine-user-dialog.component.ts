import { Component, OnInit, Inject } from '@angular/core';
import { MatLegacyDialogRef as MatDialogRef, MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA} from '@angular/material/legacy-dialog';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-machine-user-dialog',
  templateUrl: './machine-user-dialog.component.html',
  styleUrls: ['./machine-user-dialog.component.css']
})
export class MachineUserDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data,
    private http: HttpClient) {}

  ngOnInit() {

    console.log(this.data);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  removeUser(user, index)
  {
    this.http.delete(environment.apiUrl + `/user/${user.id}/machine/${this.data.id}`).subscribe((r)=>{

     /// this.notify.success('Deleted', 'You deleted machine ' + id, { timeOut: 4000, showProgressBar: false, clickToClose: true }); /// Daily OT notificaton
        this.data.users.splice(index,1);
  
    });
    
  }

  addUser(user)
  {

    
    this.http.post(environment.apiUrl + `/user/${user.id}/machine/${this.data.id}`, user).subscribe((r)=>{

        this.data.users.push(user);
   //   this.notify.success('Deleted', 'You deleted machine ' + id, { timeOut: 4000, showProgressBar: false, clickToClose: true }); /// Daily OT notificaton
  
      
    });


  }

}
