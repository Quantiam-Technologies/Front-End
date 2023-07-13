import {AfterViewInit, Component, ViewChild, ViewContainerRef} from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import {ICellEditorAngularComp} from '@ag-grid-community/angular';
import { faFilePdf } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-ag-grid-particle-pdf',
  templateUrl: './ag-grid-particle-pdf.component.html',
  styleUrls: ['./ag-grid-particle-pdf.component.css']
})
export class AgGridParticlePdfComponent implements ICellEditorAngularComp {

  params: any;

  public selectedValue: any;
  public previousValue: any;

  faFilePdf = faFilePdf;

  private input: any;

  constructor() { }

  
  isPopup(): boolean {
    return false;
  }


  agInit(params: any): void {
    
    this.params = params;
    this.previousValue = params.value;
   console.log(params.data);
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


}
