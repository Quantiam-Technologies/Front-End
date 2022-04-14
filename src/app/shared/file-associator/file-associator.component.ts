import { Component, OnInit, Input } from '@angular/core';
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { FileSaverService } from 'ngx-filesaver';
import {MatTableDataSource} from '@angular/material/table';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-file-associator',
  templateUrl: './file-associator.component.html',
  styleUrls: ['./file-associator.component.css'],
})
export class FileAssociatorComponent implements OnInit {

  showDocumentUpload = false;
  loadDataSourceTable = false;
  dataSource;
  displayedColumns =
  ['id','name','description','actions'];

  

  files: NgxFileDropEntry[] = [];
  
  @Input() title = 'Placeholder Title';

  @Input() object:any = {
    media: null
  };

  @Input() objectType = 'ncr'; //ncr, car -- determines file storage location. 

  constructor(private http:HttpClient, 
    private _FileSaverService: FileSaverService,
    private notification: NotificationsService,) { }

  ngOnInit(): void {

    this.dataSource = new MatTableDataSource(this.object.media);
  }


  
  droppedfile(files: NgxFileDropEntry[]){
    this.files = files;
    console.log(files);
    for (const droppedFile of files) {

      // Is it a file?
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {

          // Here you can access the real file
          console.log(droppedFile.relativePath, file);

          /**
          // You could upload it like this:
           **/
          const formData = new FormData()
          formData.append('media', file, droppedFile.relativePath)
  
          this.http.post(environment.apiUrl + '/'+this.objectType+'/' + this.object.id + '/files', formData)  // only does car right now --- change to more universal format 
          .subscribe((data:any) => {

              console.log(data);
             // this.object.media = data.media;
             this.dataSource = new MatTableDataSource(data.media);
              // this.dataSource.data.push(data.media);
              this.dataSource._updateChangeSubscription();
            // Sanitized logo returned from backend
          })
         

        });
      } else {
        // It was a directory (empty directories are added, otherwise only files)
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
        console.log(droppedFile.relativePath, fileEntry);
      }
    }}
  fileOver(event){ console.log(event);}
  fileLeave(event){ console.log(event);}


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  deleteFile(media,index)
  {
      //confirm box
      if(confirm('Are you sure you want to delete this file?'))
      {
      this.http.delete(environment.apiUrl+'/media', {params:media}).subscribe((r)=>{
          //update table
          this.dataSource.data.splice(index,1);
          this.dataSource._updateChangeSubscription();

          //notification

      })
    }
  }

  downloadFile(media)
  {
    this.http.get(environment.apiUrl+'/media', {responseType: 'blob', params:media}).subscribe((res)=>{      
      this._FileSaverService.save(<any>res, media.file_name);
    })
  }

  updateFileDescription(file)
  {
    console.log(file);
    this.http.put(environment.apiUrl+'/media/'+file.id, file).subscribe((r)=>{
      
      this.notification.success('Success',  'Updated the file description', {timeOut: 4000, showProgressBar: false, clickToClose: true}); /// Daily OT notificaton
  
  })
   

  }

}
