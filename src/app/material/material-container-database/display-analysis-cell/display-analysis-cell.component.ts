import {AfterViewInit, Component, ViewChild, ViewContainerRef} from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import {ICellEditorAngularComp} from '@ag-grid-community/angular';
import { faFilePdf,faMicroscope,faBraille,faSun,faXRay } from '@fortawesome/free-solid-svg-icons';
import {  environment} from '../../../../environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-display-analysis-cell',
  templateUrl: './display-analysis-cell.component.html',
  styleUrls: ['./display-analysis-cell.component.css']
})
export class DisplayAnalysisCellComponent implements ICellEditorAngularComp {

  params: any;

  public selectedValue: any;
  public previousValue: any;

  faFilePdf = faFilePdf;
  faBraille = faBraille;
  faSun = faSun;

  faMicroscope = faMicroscope;
  faXRay = faXRay;

  private input: any;

  constructor(private http: HttpClient, public router: Router,) { }

  
  isPopup(): boolean {
    return false;
  }


  agInit(params: any): void {
    
    this.params = params;
    this.previousValue = params.value;
   // console.log(params.data);
  }

  
  getValue(): any {

    if(typeof this.selectedValue === 'undefined'){ return this.previousValue; }

    return this.selectedValue;
  }

  openPdf()
  { 
    console.log(this.params.data.pdf);
    window.open('http://api.edm.quantiam.com/file?server_path='+this.encodeUriFixes(this.params.data.pdf)+'', '_blank');
    
  }

  encodeUriFixes(string)
    {
      let str = string.replace('+', "%2B");
      str = str.replace('+', "%2B");
      str = str.replace('#', "%23");
      return str; 
    }


    fetchSDS(id) {
      this.http.get(environment.apiUrl + '/material/' + id + '/sds?filterSpinner',  {responseType: 'blob'}).subscribe((response) => {
  
  
          const url = window.URL.createObjectURL(response);
          window.open(url);
  
      });
  
    }

    goToSem(id)
    {
      this.router.navigate(['/sem/run/'+id], {queryParams: { refreshTable: true}});
    }
  
    goToXrd(id)
    {
      this.router.navigate(['/xrd/analysis/'+id]);
      
    }

  

    goToParticleSizer(id)
    {
      this.router.navigate(['/particle-size/analysis/'+id]);
      
    }
}
