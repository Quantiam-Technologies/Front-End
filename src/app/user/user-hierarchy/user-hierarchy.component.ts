import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

import * as Highcharts from 'highcharts';



import HighchartsSankey from 'highcharts/modules/sankey';
import HighchartsOrganization from 'highcharts/modules/organization';
import HighchartsExporting from 'highcharts/modules/exporting';

HighchartsSankey(Highcharts);
HighchartsOrganization(Highcharts);
HighchartsExporting(Highcharts);

@Component({
    selector: 'app-user-hierarchy',
    templateUrl: './user-hierarchy.component.html',
    styleUrls: ['./user-hierarchy.component.css']
})
export class UserHierarchyComponent implements OnInit {

    hierarchyData;

    renderOrg = false;

    Highcharts = Highcharts;
    updateHierarchyFlag = false;

    hierarchyChartOPtions = {
        chart: {
            height: 700,
            width: 1500,
            inverted: true
        },
        credits: {
            text: 'Quantiam Technologies Inc.',
        },
        title: {
            text:'Administrative Hierarchy',
        },
        series: [{
            type: 'organization',
            name: 'Quantiam Technologies ',
            keys: ['from', 'to'],
            data: [
            ],
            levels: [{
                level: 0,
                color: '#34597a',
                dataLabels: {
                    color: 'white',
                },
                height: 20
            }, {
                level: 1,
                
                color: '#980104',
                
                dataLabels: {
                    color: 'white',
                },
                height: 20,
            }],
            nodePadding: 10,
            nodeWidth: 40,
            nodes: [],
            colorByPoint: false,
            color: '#dadada',
            dataLabels: {
                color: 'black',
                nodeFormatter: function(this:any){
                  //  console.log(this);
                    return '<div><p>'+this.point.employeeid+' - '+this.point.firstname+' '+this.point.lastname+'</p>\
                    <p>'+this.point.title.substring(0, 25)+'</p></div>';
                },
               
            style:{
                fontSize: "9px",
            },
            },
            label:{
                connectorNeighbourDistance: 10,
            },
            borderColor: 'white',
            point:{
                events:{
                    click: function(){
                        console.log(this);
                    }
                },
            }
        }],
        tooltip: {
            //outside: true
            enabled:false,
        },
        exporting: {
            allowHTML: true,
            sourceWidth: 800,
            sourceHeight: 600
        }

    };

    constructor(private http: HttpClient) {}

    ngOnInit(): void {
        this.fetchHierarchyData();
    }

    fetchHierarchyData() {
        this.http.get(environment.apiUrl + '/user/hierarchy').subscribe((r: any) => {

            this.renderOrg = true;
            this.hierarchyData = r;
            
            this.hierarchyChartOPtions.series[0].data = r.highcharts;
            this.hierarchyChartOPtions.series[0].nodes = r.list;

          /*   this.hierarchyChartOPtions.series[0].nodes.forEach((node)=>{
                    node.dataLabels.nodeFormatter = (x)=>{
                      //  console.log(x);
                        return 'test';
                    };
            }) */

      //      delete this.hierarchyChartOPtions.series[0].nodes[0].layout;

            this.updateHierarchyFlag = true;
            console.log(this.hierarchyChartOPtions);
        });


    }

}
