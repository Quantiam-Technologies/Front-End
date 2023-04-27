import { Component, OnInit,Inject } from '@angular/core';
import { MarkdownService } from 'ngx-markdown';
import { HttpClient } from '@angular/common/http';

import { MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA, MatLegacyDialogRef as MatDialogRef } from '@angular/material/legacy-dialog';

@Component({
  selector: 'app-patch-notes',
  templateUrl: './patch-notes.component.html',
  styleUrls: ['./patch-notes.component.css']
})
export class PatchNotesComponent implements OnInit {

  
  

  constructor(private markdownService: MarkdownService,
    public dialogRef: MatDialogRef<PatchNotesComponent>,
    private http: HttpClient,
  @Inject(MAT_DIALOG_DATA) public data:any,) { }

  ChangeLog;
  versionArray = [];
  selectedVersionButton = 1;
  selectedVersion;
  defaultVersionIndex = 1;

  ngOnInit() {

      
   this.fetchChangeLog(this.data);
    
  }

  fetchChangeLog(changeNotes = null)
  {

    if(!changeNotes)
    {
      this.http.get('CHANGELOG.md').subscribe((r:any)=>{

        //console.log(r,'');
        this.ChangeLog = r;
        this.processChangeLog(this.ChangeLog);
      },
      (e:any)=>{
        this.ChangeLog = ''+e.error.text;
        this.processChangeLog(this.ChangeLog);
         // console.log(this.ChangeLog,'error');
        //  this.ChangeLog = e.message;
         // console.log(this.ChangeLog);

      })
    }
    else
    {
      this.ChangeLog = changeNotes;
      this.processChangeLog(this.ChangeLog);
    }

    

  }

  processChangeLog(changenotes)
  {
    let splitNotes = changenotes.split('\r\n# ');
    console.log(splitNotes);
    
    splitNotes.forEach((versionNotes,index) => {
      const noteObj:any = {};
   //   console.log(versionNotes);
      const splitVersionNotes = versionNotes.split('\r\n#');

    //  console.log(splitVersionNotes[0].trim());

      noteObj.name = splitVersionNotes[0].trim();
   
      //noteObj.notes = '#'+splitVersionNotes[1];
      noteObj.notes = '# '+versionNotes;

      if(index === 1){ noteObj.name = 'Issues & Todo';  }

      this.versionArray.push(noteObj);

    });

    this.versionArray.shift();
    this.selectedVersion = this.versionArray[this.defaultVersionIndex];
    

    
    //this.versionArray

  }

  close()
  {
    this.dialogRef.close();

  }

}
