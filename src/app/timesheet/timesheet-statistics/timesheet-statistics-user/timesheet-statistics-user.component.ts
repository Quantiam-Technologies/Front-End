import { Component, OnInit } from '@angular/core';

import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';

import { Location } from '@angular/common';

import { ActivatedRoute, Router, } from '@angular/router';
import { HotTableRegisterer } from '@handsontable/angular';

import * as moment from 'moment';

import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';
HC_exporting(Highcharts);

import { UserService } from '../../../services/user/user.service';


@Component({
    selector: 'app-timesheet-statistics-user',
    templateUrl: './timesheet-statistics-user.component.html',
    styleUrls: ['./timesheet-statistics-user.component.css']
})
export class TimesheetStatisticsUserComponent implements OnInit {


    constructor(private http: HttpClient, public userService: UserService, private location: Location, private route: ActivatedRoute, ) {}

    endDate = moment().format('YYYY-MM-DD');
    startDate = moment().startOf('year').add(1, 'days').format('YYYY-MM-DD');
    user = this.userService.fetchAuthUserObj();

    reportObj;
    updateFlag;


    Highcharts = Highcharts;
    projectPieChartOptions;


    private hotRegisterer = new HotTableRegisterer();

    hotTableRawSettings: any = {
      width: '200px',
      height: '275px',
        // colHeaders: true,
        // colHeaders: false,
    };
    hotTableAggregateSettings: any = {
      width: '700px',
        // colHeaders: true,
        // colHeaders: false,
    };

    routeParams;



    ngOnInit() {



        this.route.paramMap.subscribe(params => {

           if (params.get('user')) {
            this.user.id = params.get('user');

          }

          this.fetchData();
      });
    }

    changeUser(user) {
        this.user = user;
    }

    fetchData() {
        const params = {
            startDate: moment(this.startDate).format('YYYY-MM-DD'),
            endDate: moment(this.endDate).format('YYYY-MM-DD')
        };

        this.http.get(environment.apiUrl + `/timesheet/statistics/${this.user.id}`, { params: params }).subscribe((r: any) => {

            this.location.go(`/timesheet/statistics/user/${this.user.id}`);

            this.reportObj = r;

            this.createProjectPieChart();

            this.projectPieChartOptions.series[0].data = r.aggregate;
            this.updateFlag = true;


            this.hotRegisterer.getInstance('raw').loadData(r.raw);
            this.hotRegisterer.getInstance('aggregate').loadData(r.aggregate);
        });
    }

    createProjectPieChart() {
        this.projectPieChartOptions = {
            credits: {
                text: 'Quantiam Technologies',
            },
            chart: {
                type: 'pie',
            },
            title: {
                text: this.reportObj.user.name,
            },
            subtitle: {
                text: this.reportObj.denomination + ' by Project, ' + this.startDate + ' to ' + this.endDate,
            },
            tooltip: {
                pointFormat: '{point.y} Hours, <b>{point.percentage:.1f}%</b>'
            },

            series: [{
                name: 'Projects',
                colorByPoint: true,
                data: [],
            }]

        };

    }



}
