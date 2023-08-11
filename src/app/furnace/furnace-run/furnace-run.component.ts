import { Component } from '@angular/core';

import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

import { ActivatedRoute, Router, } from '@angular/router';

import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-furnace-run',
  templateUrl: './furnace-run.component.html',
  styleUrls: ['./furnace-run.component.css']
})
export class FurnaceRunComponent {

  renderFurnaceRun:boolean = false;
  editable:boolean = true;
  furnaceRunId;
  furnaceRunObject:any = {
    files: { directory:null }
  };
  renderImages = false;
  positions = [
    { id: null,text: 'Missing' },
    { id: '1',text: '1' },
    { id: '2',text: '2' },
    { id: '3',text: '3' },
    { id: '4',text: '4' },
    { id: '5',text: '5' },
    { id: '6',text: '6' },
    { id: '7',text: '7' },
    { id: '8',text: '8' },
    { id: '9',text: '9' },
  ]
  orientations = [
    {id:'0',text:"Normal"},
    {id:'1',text:"Reversed"}
  ];
  processTypes = [
    {id:'2',text:"Debind"},
    {id:'3',text:"Consolidation"},
    {id:'10',text:"Recovery"},
    {id:'23',text:"Oxidation"},
  ];
  furnaces = [
    {id:'1',text:"HP16"},
    {id:'2',text:"HP20"},
    {id:'3',text:"HP15"},
    {id:'4',text:"HP19"},
    {id:'5',text:"HP18"},
    {id:'6',text:"HP17"},
    {id:'7',text:"HP11"},
  ]

  constructor(private route:ActivatedRoute,private http: HttpClient, 
    private notification: NotificationsService,) { }


  ngOnInit() {
    this.furnaceRunId = this.route.snapshot.paramMap.get('id');  
    this.fetchFurnaceRun(this.furnaceRunId);
  }



  fetchFurnaceRun(furnaceRunId){


    this.http.get(environment.apiUrl + `/furnacerun/`+furnaceRunId).subscribe((r: any) => {
     // console.log(r);
     this.furnaceRunObject = r;
     this.renderFurnaceRun = true;
      this.fetchFurnaceRunFiles(furnaceRunId);
  })

  }

  fetchFurnaceRunFiles(furnaceRunId)
  {

    this.http.get(environment.apiUrl + `/furnacerun/`+furnaceRunId+`/files`).subscribe((r: any) => {
      this.furnaceRunObject.files = r;
      this.renderImages = true;
      console.log(this.furnaceRunObject);//

  })

  }

  encodeUriFixes(string)
    {
      let str = encodeURIComponent(string);
      return str;
    }

    openFullPictureInNewTab(img)
    {
      window.open("http://api.edm.quantiam.com/file?server_path="+this.encodeUriFixes(this.furnaceRunObject.files.directory+'\\'+img), "_blank")
    }

    downloadExcelFile(img)
    {
      //href="http://api.edm.quantiam.com/file?server_path={{encodeUriFixes(selectedSubImage.fullpath)}}" [download]="selectedSubImage.filename 
      this.http.get("http://api.edm.quantiam.com/file?server_path="+this.encodeUriFixes(this.furnaceRunObject.files.directory+'\\'+img), { responseType: 'blob', observe: 'response' })
      .subscribe(r => {

          // file-type
         let fileName = this.furnaceRunObject.furnace_run_name + ' - ' + img;             

          var link = document.createElement('a');
          link.href = window.URL.createObjectURL(r.body);
          link.download = fileName;
          link.click();
      });    

    }



    updateFurnaceRunSteel(steel)
    {
      this.http.put(environment.apiUrl + `/furnacerun/`+this.furnaceRunId+`/steel/`+steel.inventory_id,steel).subscribe((r: any) => {
        this.notification.success('Saved', 'This steel was successfully updated.',{timeOut: 2000, showProgressBar: false, clickToClose: true}); /// Daily OT notificaton
      })
    }

    deleteFurnaceRunSteel(steel,index)
    {
      if(confirm('Are you sure you want to remove this steel?'))
        {
        this.http.delete(environment.apiUrl + `/furnacerun/`+this.furnaceRunId+`/steel/`+steel.inventory_id).subscribe((r: any) => {
          this.furnaceRunObject.steel.splice(index,1);
          this.notification.success('Saved', 'This steel was successfully deleted.',{timeOut: 2000, showProgressBar: false, clickToClose: true}); /// Daily OT notificaton
        })
     }
    }

    addFurnaceRunSteel(steel)
    {
      console.log(steel);
      this.http.post(environment.apiUrl + `/furnacerun/`+this.furnaceRunId+`/steel/`+steel.id,steel).subscribe((r: any) => {
        steel.inventory_id = steel.id;
        this.furnaceRunObject.steel.push(steel);
        this.notification.success('Saved', 'This steel was successfully updated.',{timeOut: 2000, showProgressBar: false, clickToClose: true}); /// Daily OT notificaton
      })
    }

    updateFurnaceRun(furnaceRun)
    {
      this.http.put(environment.apiUrl + `/furnacerun/`+this.furnaceRunId,furnaceRun).subscribe((r: any) => {
        this.notification.success('Saved', 'This furnace run was successfully updated.',{timeOut: 2000, showProgressBar: false, clickToClose: true}); /// Daily OT notificaton
      })

    }

    addFurnaceRunOperator(operator)
    {

    }

    deleteFurnaceRunOperator(operator,index)
    {
      if(confirm('Are you sure you want to remove this person?'))
      {

        this.http.delete(environment.apiUrl + `/furnacerun/`+this.furnaceRunId+`/operator/`+operator.operator_id).subscribe((r: any) => {

          this.furnaceRunObject.operators.splice(index,1);
       //   console.log(this.furnaceRunObject.operators, index);

          this.notification.success('Saved', 'This operator was successfully deleted.',{timeOut: 2000, showProgressBar: false, clickToClose: true}); /// Daily OT notificaton
        })
      }


    }

}
