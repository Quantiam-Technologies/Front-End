import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { ActivatedRoute } from '@angular/router';
import {Location} from '@angular/common';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
 


import { NotificationsService } from 'angular2-notifications';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { UntypedFormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.css']
})
export class UserViewComponent implements OnInit, OnDestroy {


  constructor(
  private fb: UntypedFormBuilder,
  public userService: UserService,
  private route: ActivatedRoute,
  private location: Location,
  public http: HttpClient,
  private notification: NotificationsService,
 ) {

  this.renderUser = false;
  this.editUser = false;
 }

  @ViewChild(MatPaginator) paginator: MatPaginator;
   @ViewChild(MatSort) sort: MatSort;

  id: any;
  user: any = {rto_allotment:[{}]};
  user$: any;
  userID: number;
  editUser = false;
   
  displayedColumnsSupervisors: string[] = ['id', 'name', 'title'];
  displayedColumnsPermissions: string[] = ['permission_id', 'permission_name', 'permission_description', 'derived_from_group', 'customColumn1'];
  displayedColumnsMachines: string[] = ['id', 'machine_name', 'machine_purpose'];
  displayedColumnsRfid: string[] = ['id', 'string', 'customColumn1'];
  displayedColumnsGroups: string[] = ['id', 'string', 'customColumn1'];
  pageSizeOptions: number[] = [5, 10, 25, 100];
  selectedTable = 'supervisors';
  permissionTableSource: any;
  supervisorTableSource: any;
  machineTableSource: any;
  rfidTableSource: any;
  renderUser = false;
  authedUser: any;

  private cellOldValue: any;

  private gridApi;
  private gridColumnApi;

  private groupGridColumnApi;
  private groupGridApi;

   groupColumnDefs = [

    {headerName: 'ID', field: 'group_id',  width: 80, },
    {headerName: 'Name', field: 'group_name', width: 250,   },
    {
      headerName: 'Managed By',
      field: 'ldap',
      cellRenderer: function (params) {

      if (params.data.ldap) { return 'LDAP'; }
      return 'Web App';

    },
   },
    // {headerName: 'Name', field: 'group_name',  width: 80, },
  ];


   rtoColumnDefs = [

    {headerName: 'Year', field: 'year',  width: 80, cellRenderer: function (params) {  if(params) { return '<b>'+params.data.year+'</b>';}}},
    {headerName: 'Vacation', field: 'vacation', editable: false, width: 120,  },
    {headerName: 'PTO', field: 'pto',  editable: false, width: 120,  },
    {headerName: 'PPL', field: 'ppl', hide: true,  },
    {

    hide: !(this.userService.hasPermission(39)),
    field: 'created_at',
    headerName: 'Delete',
    editable: false,
    width: 100,
    cellStyle: function (params) {
      return {
        cursor: 'pointer'
      };
    },
    cellRenderer: function (params) {
      return '<button class="btn btn-sm btn-danger">Delete</button>';


    },
    onCellClicked: (params) => {

      this.deleteRtoAllotment(params);

    }  },

    
    {headerName: 'Updated', field: 'updated_at',   },

  ];

   rtoDefaultColDef = {

  // maxWidth:120,
    cellStyle: function (params) {
      return {
        cursor: 'pointer',
      };
    },
    sortable: false,
    dragable: false,
    resizable: false,
    suppressMovable: true,
  };

   groupDefaultColDef = {

  // maxWidth:120,
    cellStyle: function (params) {
      return {
        cursor: 'pointer',
      };
    },
    sortable: true,
    dragable: false,
    resizable: false,
    suppressMovable: true,
  };

  ngOnInit() {




    this.route.params.subscribe(params => {

    this.id  = params['id'];  // obtain ID from route
	  // console.log(this.id);


     // get user data and store in user Variable
     this.userService.getAuthedUser().subscribe(res => {


          this.authedUser = res;

      //    if ( this.userService.hasPermission(27) || res.id === this.id ) {
          if ( true ) {
            this.renderUser = true;

            //check user ID

            if(this.id > 10040)
            {   
              console.log('test, database ID');
             /*  this.http.get(environment.apiUrl + `/user/${this.id}/databaseid`).subscribe((r) => {
         
                this.user = r;   
                this.supervisorTableSource = [];                
                this.permissionTableSource = [];  
                this.rfidTableSource = [];
          
              }); */

            }
            else
            {

              this.userService.getUser(this.id, true, true);
              this.user$ = this.userService.user$.subscribe(r => {
  
                this.user = r;
  
                this.permissionTableSource = new MatTableDataSource<any>(r.permissions);
                this.permissionTableSource.paginator = this.paginator;
                this.permissionTableSource.sort = this.sort;

                this.supervisorTableSource = new MatTableDataSource<any>(r.supervisors);
                this.supervisorTableSource.paginator = this.paginator;
                this.supervisorTableSource.sort = this.sort;

                
                this.machineTableSource = new MatTableDataSource<any>(r.machines);
                this.machineTableSource.paginator = this.paginator;
                this.machineTableSource.sort = this.sort;
  
               // this.rfidTableSource = new MatTableDataSource<any>(r.rfid);
              //  this.rfidTableSource = this.paginator;
              });

            }





          }


        });


      });


      this.permissionChanges();

  }


  updateSupervisor(selectedSupervisorObj) {
    if ( confirm('are you sure?')) {
      console.log(selectedSupervisorObj);
      this.userService.changeSupervisor(this.user.id, selectedSupervisorObj.id).subscribe((r) => {


          this.user = r;
          this.notification.success(
            'Success', 'Added Supervisor',
            {timeOut: 2000, showProgressBar: false, clickToClose: true}); /// Daily OT notificaton
    
    

      }, (e)=>{

        this.notification.success(
          'Success', 'Added Supervisor',
          {timeOut: 2000, showProgressBar: false, clickToClose: true}); /// Daily OT notificaton
  
  
      });

    }

  }



  updateUser (obj) {

    if(obj.startdate){
        var split = obj.startdate.split("T");
        obj.startDate = split[0];
    }

       this.userService.update(this.user.employeeid, this.user).subscribe((r) => {

         this.location.replaceState('/user/' + r.employeeid);
         this.user.id = r.employeeid;
         this.user.employeeid = r.employeeid;

         this.notification.success(
          'Success', 'Updated this user.',
          {timeOut: 2000, showProgressBar: false, clickToClose: true}); /// Daily OT notificaton
  
  
      });

  }

  deleteMachine(obj) {
    if (confirm('Are you sure to delete this permission?')) {

      // deletes machine association


    }
  }

  addPermission(event) {

    this.http.post<any>(environment.apiUrl + `/permission/${event.id}/user/${this.user.id}`, null).subscribe((r) => {

      console.log(r);
      this.permissionTableSource.data.push(r);
      this.permissionTableSource.paginator = this.paginator;
      this.notification.success(
        'Success', 'Added permission',
        {timeOut: 2000, showProgressBar: false, clickToClose: true}); /// Daily OT notificaton


    });



  }

  deletePermission(obj) {
    // Find index


    const index = this.permissionTableSource.data.findIndex(x => x.permission_id === obj.permission_id);
    console.log(this.permissionTableSource.data, obj, index, );
    // updated DB
    if (confirm('Are you sure to delete this permission?')) {
      this.http.delete<any>(environment.apiUrl + `/permission/${this.permissionTableSource.data[index].permission_id}/user/${this.user.id}`).subscribe((x) => {

        this.notification.success(
          'Success', 'Deleted permission',
          {timeOut: 2000, showProgressBar: false, clickToClose: true}); /// Daily OT notificaton



      // Fix Table
      this.permissionTableSource.data.splice(index, 1);
      this.permissionTableSource.paginator = this.paginator;

      });
    }
  }



  deleteRfid(index) {
   // console.log(index);
   if (confirm('Are you sure to delete this card?')) {
    this.userService.deleteRfid(this.user.rfid[index].id).subscribe((x) => {

      this.rfidTableSource.data.splice(index, 1);
      this.rfidTableSource.paginator = this.paginator;

      console.log(this.rfidTableSource);

      });

    }
  }


  onRtoGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
	//  setTimeout(() => {  this.gridApi.sizeColumnsToFit(); }, 200);

  }


  onRtoCellEditingStarted(event) {
    console.log(event);
    this.cellOldValue = event.value;
  }


  onRtoCellEditingStopped(event) {

      const params = {};
    if (this.cellOldValue !== event.value) {
      params[event.colDef.field] = event.value;
      this.userService.updateRtoAllotment(event.data.entry_id, params).subscribe();
    }
  }


  permissionChanges() {


    // console.log('permission pass');
    if (this.userService.hasPermission(37)) {

     // this.rtoColumnDefs[1].type = "numericColumn";
      this.rtoColumnDefs[1].editable = true;

    // this.rtoColumnDefs[2].type = "numericColumn";
      this.rtoColumnDefs[2].editable = true;
    }
  }

  createRtoAllotment()  {

    const params = {
      employee_id: this.user.id,
    };

    this.http.post<any>(environment.apiUrl + '/rto/allocation', params)
    .subscribe(response => {
      console.log(response);

      this.user.rto_allotment.unshift(response);
      this.gridApi.setRowData(this.user.rto_allotment);

    });

  }

  deleteRtoAllotment(row) {


    if (confirm('Do you want to delete this Allocation?')) {
      this.http.delete<any>(environment.apiUrl + '/rto/allocation/' + row.data.entry_id).subscribe((r) => {

          const index = this.user.rto_allotment.findIndex(obj => obj.entry_id === row.data.entry_id);
          console.log(index);
          this.user.rto_allotment.splice(index, 1);

          this.gridApi.setRowData(this.user.rto_allotment);
      });
   }
  }

  ////  Group Grid ////

  onGroupGridReady(params) {
    this.groupGridApi = params.api;
    this.groupGridColumnApi = params.columnApi;
	  setTimeout(() => {  this.groupGridApi.sizeColumnsToFit(); }, 200);

  }

  editUserClick()
  {
      this.editUser = !this.editUser;
      if(!this.user.employeeid)
      {
        this.notification.info(
          'Action Required', 'Please update the users employee ID first. All other editable options will unlock after that. ',
          {timeOut: 4000, showProgressBar: false, clickToClose: true}); /// Daily OT notificaton
  
  
     
      }
  }




  ngOnDestroy() {
    if (this.user$) { this.user$.unsubscribe(); }


  }



}
