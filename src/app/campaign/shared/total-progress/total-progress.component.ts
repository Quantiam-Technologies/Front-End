import { Component,OnInit } from '@angular/core';

import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import * as Highcharts from 'highcharts';
import { ActivatedRoute, Router, } from '@angular/router';

@Component({
  selector: 'app-total-progress',
  templateUrl: './total-progress.component.html',
  styleUrls: ['./total-progress.component.css']
})
export class TotalProgressComponent  implements OnInit {

  constructor(private http: HttpClient, private route: ActivatedRoute, ) {}
  
  Highcharts: typeof Highcharts = Highcharts; // required
  chartConstructor: string = 'chart'; // optional string, defaults to 'chart'
  chartCallback: Highcharts.ChartCallbackFunction = function (chart) { } // optional function, defaults to null
  updateFlag: boolean = false; // optional boolean
  oneToOneFlag: boolean = true; // optional boolean, defaults to false
  runOutsideAngular: boolean = false; // optional boolean, defaults to false

  chartOptions: Highcharts.Options = {

    series: [{
      data: [1, 2, 3],
      type: 'line'
    }]

  };

  ngOnInit(){}

}
