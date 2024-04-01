import { Component, OnInit, OnChanges,ElementRef,ChangeDetectorRef, AfterViewInit, Input  } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-quality-campaign-powder-characterization-check',
  templateUrl: './quality-campaign-powder-characterization-check.component.html',
  styleUrls: ['./quality-campaign-powder-characterization-check.component.css']
})
export class QualityCampaignPowderCharacterizationCheckComponent {


  @Input() campaignID: any = 35;
  powderCheckArray = null;

  constructor(
    private http: HttpClient,
    private notification: NotificationsService,
    private route: ActivatedRoute,
    ) { 


    }



    
    ngOnInit(): void {

        this.getData();

    }

    
  ngOnChanges(changes)
  {
    this.getData();
  }




  getData(){


    this.http.get<any>(environment.apiUrl + '/campaign/'+this.campaignID+'/quality/powder-characterization').subscribe(r => {  

      console.log(r);

      this.powderCheckArray = r;

    })
  }



  exportCSV()
    {
     // console.log(row);

     let fileName = " powder characterization";
     let rows = this.powderCheckArray;

  
  
      

          const separator = ',';
          const keys = Object.keys(rows[0]);
          const csvContent =
            keys.join(separator) +
            '\n' +
            rows.map(row => {
              return keys.map(k => {
                let cell = row[k] === null || row[k] === undefined ? '' : row[k];
                cell = cell instanceof Date
                  ? cell.toLocaleString()
                  : cell.toString().replace(/"/g, '""');
                if (cell.search(/("|,|\n)/g) >= 0) {
                  cell = `"${cell}"`;
                }
                return cell;
              }).join(separator);
            }).join('\n');
  
          const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
       /*    if (navigator.msSaveBlob) { // IE 10+
            navigator.msSaveBlob(blob, row.name);
          } else { */
            const link = document.createElement('a');
            if (link.download !== undefined) {
              // Browsers that support HTML5 download attribute
              const url = URL.createObjectURL(blob);
              link.setAttribute('href', url);
              link.setAttribute('download', 'Campaign '+this.campaignID+' - '+fileName+'.csv');
              link.style.visibility = 'hidden';
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
           // }
           // }
          }
        
  
  
    }

}
