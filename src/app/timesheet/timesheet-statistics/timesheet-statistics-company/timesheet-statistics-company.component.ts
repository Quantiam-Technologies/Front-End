import { Component, OnInit } from '@angular/core';
import { RouterModule, Routes, Router,NavigationEnd } from '@angular/router';


@Component({
    selector: 'app-timesheet-statistics-company',
    templateUrl: './timesheet-statistics-company.component.html',
    styleUrls: ['./timesheet-statistics-company.component.css']
})
export class TimesheetStatisticsCompanyComponent implements OnInit {

    selectedInsight;

    constructor (private router: Router) {
        
        router.events.subscribe((val) => {
           // console.log(val);
            if(val instanceof NavigationEnd){
              const parse = this.router.parseUrl(router.url.toString());
              this.selectedInsight = parse.root.children['primary'].segments[3].path;
            }
           // console.log('current route: ', );
        
               
        })
    }
    ngOnInit(){}

    onNavigate(location){ console.log(location); this.router.navigate(['/timesheet/insights/company/'+location]); }
}
