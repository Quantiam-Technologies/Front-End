import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NotificationsService } from 'angular2-notifications';
import { UserService } from '../../services/user/user.service';
// Base 64 IMage display issues with unsafe image
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-sem-run',
  templateUrl: './sem-run.component.html',
  styleUrls: ['./sem-run.component.css']
})
export class SemRunComponent implements OnInit {

  private semrunID;

  slideConfig = {'slidesToShow': 8, 'dots': true, 'arrows': true, 'autoplay': true,'responsive': [
    {
      'breakpoint': 900,
      'settings': {
        'slidesToShow': 3
              }
      },

      {
        'breakpoint': 1400,
        'settings': {
          'slidesToShow': 5
                }
        },
    
  ] };
  Semrun;
  selectedImage: any;
  selectedSubImage: any;

  constructor(
    private http: HttpClient,
    private notification: NotificationsService,
    private route: ActivatedRoute,
    private userService: UserService,
 //   private domSanitizer: DomSanitizer,
    private sanitizer: DomSanitizer
) {}

ngOnInit() {



  this.route.paramMap.subscribe(params => {
    console.log(params);

    this.semrunID = params.get('id');

    this.fetchSemrunData();
   // this.showTimeOffRequestForm = false;

  });

}

    clearView() {

      this.Semrun = null;
      this.selectedImage = null;
      this.selectedSubImage = null;

    }

    fetchSemrunData() {

          this.clearView();

          this.http.get(environment.apiUrl + '/instrument/sem/run/' + this.semrunID).subscribe((r) => {

              console.log(r);
              this.Semrun = r;

          },
          (error) => {

            this.notification.error('Error', 'This Semrun failed to load.', {timeOut: 2000, showProgressBar: false, clickToClose: true}); /// Daily OT notificaton


          });

    }


    selectImage(img) {
      this.selectedImage = img;
      this.selectedSubImage = null;

      this.selectedImage.assoc_files.every(element => {

        if (element.type === 'image') { this.selectedSubImage = element; return false;}

        return true;
      });

    }

    textUrl(selectedImage) {
      return this.sanitizer.bypassSecurityTrustResourceUrl('http://api.edm.quantiam.com/file?server_path=' + selectedImage.fullpath);
    }


    encodeUriFixes(string)
    {
      let str = string.replace('+', "%2B");
       str = str.replace('+', "%2B");
       str = str.replace('#', "%23");
      return str; 
    }


    downloadExcelFile(selectedSubImage)
    {
      //href="http://api.edm.quantiam.com/file?server_path={{encodeUriFixes(selectedSubImage.fullpath)}}" [download]="selectedSubImage.filename 
      this.http.get("http://api.edm.quantiam.com/file?server_path="+this.encodeUriFixes(selectedSubImage.fullpath), { responseType: 'blob', observe: 'response' })
      .subscribe(r => {

          // file-type
          let fileName = this.Semrun.semrun_id + ' - ' + this.Semrun.samplename + ' - ' +selectedSubImage.filename;             

          var link = document.createElement('a');
          link.href = window.URL.createObjectURL(r.body);
          link.download = fileName;
          link.click();
      });    

    }
}
