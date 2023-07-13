import { Component } from '@angular/core';

import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Chart } from 'angular-highcharts';
// import { UserService } from '../../services/user/user.service';
// import { NotificationsService } from 'angular2-notifications';


@Component({
  selector: 'app-silt2023',
  templateUrl: './silt2023.component.html',
  styleUrls: ['./silt2023.component.css']
})
export class Silt2023Component {


  chart = new Chart({
    chart: {
      type: 'line'
    },
    title: {
      text: 'Linechart'
    },
    credits: {
      enabled: false
    },
    series: [
      {
        name: 'Line 1',
        data: [1, 2, 3]
      }
    ]
  });


}
