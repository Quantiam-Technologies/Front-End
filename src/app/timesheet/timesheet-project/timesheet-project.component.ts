import { Component, OnInit } from '@angular/core';
import {  environment} from '../../../environments/environment';
import {  HttpClient} from '@angular/common/http';
import { HotTableRegisterer } from '@handsontable/angular';
import { UserService } from '../../services/user/user.service';

import { NotificationsService } from 'angular2-notifications';

import * as _moment from 'moment';


@Component({
  selector: 'app-timesheet-project',
  templateUrl: './timesheet-project.component.html',
  styleUrls: ['./timesheet-project.component.css']
})
export class TimesheetProjectComponent implements OnInit {


  constructor(private http: HttpClient, public userService: UserService, private notify: NotificationsService) { }

  private hotRegisterer = new HotTableRegisterer();
  id = 'id';
  projectSourceList = [];
  categoryListIdMap = {  //fetch from DB in the future
    'Corporate': 2,
    'Capital Projects': 9,
    'Research & Technology - HPMEEs Project': 5,
    'Research & Technology - Energy Materials': 6,
    'Speciality Surfaces / Coatings / Products - SSCPs': 7,
    'Sales, Marketing & Business Development': 11,
    'Consulting & Technical Services': 4,
    'Prototype Pilot Manufacturing': 3,
    'Wear and Ballistics Products': 8,
    'Absence': 10,

  }
  categoryHandsList = [
  'Corporate',
  'Capital Projects',
  'Research & Technology - HPMEEs Project',
  'Research & Technology - Energy Materials',
  'Speciality Surfaces / Coatings / Products - SSCPs',
  'Sales, Marketing & Business Development',
  'Consulting & Technical Services',
  'Prototype Pilot Manufacturing',
  'Wear and Ballistics Products',
  'Absence',
  ];
  hotTableSettings = {
    
    
    colHeaders: true,
    beforeChange: (changes, source) =>{
      console.log(changes);
      if((changes[0][1] === 'start_date' || changes[0][1] === 'retire_date') && changes[0][3] !== 'Invalid date'){ 
        changes[0][3] = _moment(changes[0][3]).format('YYYY-MM-DD');
      }

    },
    afterChange: (changes, source) => {
      console.log(changes);
      if(changes)
      {
        const rowProp: any = this.hotRegisterer.getInstance('id').getSourceDataAtRow(changes[0][0]);
        if(changes[0][1] === 'Category'){  changes[0][3] = this.categoryListIdMap[changes[0][3]]; changes[0][1] = 'category_id'; }
        if(changes[0][1] === 'start_date' || changes[0][1] === 'retire_date'){ 
        if(changes[0][3] === 'Invalid date') { changes[0][3] = null; }          
      
      }
        const payload:any = {};
        payload[changes[0][1]] = changes[0][3];        
        payload.id = rowProp.projectid;          
        if(changes[0][1] === 'projectid' && (changes[0][2] !== changes[0][3])){
        payload.id = changes[0][2];
      
      }

        if(changes[0][2] !== changes [0][3]){ // only trigger if different 
        this.updateProject(rowProp.id, payload);
        }
      }
    },
    columns:[
      {data:"projectid", title:"Project"},
      {data:"Description", title:"Name" },
      {data:"Category", title:"Category", type:"dropdown",  source:this.categoryHandsList},
      {data:"start_date", title:"Start Date", type:"date", dateFormat: 'YYYY-MM-DD'},
      {data:"retire_date", title:"Retire Date", type:"date", dateFormat: 'YYYY-MM-DD' },
      {
        title:"Actions",
        readOnly:true,
        renderer: function(instance, td, row, col, prop, value, cellProperties) {
          td.innerHTML = `<button id="deleteButton" class="btn btn-xs btn-danger" style="margin:2px;">Delete</button>`
          return td;
        }
      }
    ],
    afterOnCellMouseDown: (event, coords, TD) => {
      console.log(event,coords);
      
      if (event.target.innerHTML === 'Delete' && coords.col === 5) {
        this.deleteProjectFromRow(coords);
      }
    
    }

  }
  renderTable = false;


  ngOnInit() {

    
    this.fetchProjectList();
  }

  deleteProjectFromRow(coords)
  {
  
    const data: any = this.hotRegisterer.getInstance('id').getSourceDataAtRow(coords.row);
    if(confirm('Are you sure you want to delete this project?') && data.Category !== 'Absence'){

      this.deleteProject(data.projectid);
    }
    console.log(data,coords);
  }


  
  deleteProject (id)
	{
		  
      this.http.delete(environment.apiUrl +  `/project/${id}`).subscribe((response:any) => {

        if(this.userService.hasPermission(9))
        {

        this.notify.success('Deleted', 'You deleted project ' + id, { timeOut: 4000, showProgressBar: false, clickToClose: true }); /// Daily OT notificaton
  
          this.fetchProjectList();
        }
        else
        {
          
          this.notify.error('Error', 'You do not have permission to delete this.', { timeOut: 4000, showProgressBar: false, clickToClose: true }); /// Daily OT notificaton
  
        }
         
       
      }, (e)=>{

        this.notify.error('Error', 'Something went wrong here, let the developer know.', { timeOut: 4000, showProgressBar: false, clickToClose: true }); /// Daily OT notificaton
  
      });
  }


  fetchProjectList ()
	{
		  
      this.http.get(environment.apiUrl + '/project').subscribe((response:any) => {

        
          this.hotRegisterer.getInstance(this.id).loadData(response);
       
      }, (e)=>{

        this.notify.error('Error', 'Something went wrong here, let the developer know.', { timeOut: 4000, showProgressBar: false, clickToClose: true }); /// Daily OT notificaton
  
      });
  }
  
  updateProject(id,payload ){
    console.log(id,payload);
    if(!id && payload.id)
    {
      id = payload.id;
    }

    if(id)
      {
        console.log('test');
      this.http.put(environment.apiUrl + `/project/${id}`,payload).subscribe((r)=>{
        this.notify.success('Success', 'You updated project ' + id + '.', { timeOut: 4000, showProgressBar: false, clickToClose: true }); /// Daily OT notificaton
      }, (e)=>{

        this.notify.error('Error', 'Something went wrong here, let the developer know.', { timeOut: 4000, showProgressBar: false, clickToClose: true }); /// Daily OT notificaton

      });
   }
  }

  addTableRow(){

    if(confirm('Are you sure you want to create a new project?'))
    {

      this.http.post(environment.apiUrl + `/project`,null).subscribe((r:any)=>{
        this.hotRegisterer.getInstance('id').alter('insert_row_above',0);
        this.hotRegisterer.getInstance('id').setDataAtCell(0,0, r.projectid );
        this.notify.success('Success', 'You created a project ' + r.projectid + ' at the top of the spreadsheet.', { timeOut: 4000, showProgressBar: false, clickToClose: true }); /// Daily OT notificaton
  
      })
    }

  }

}
