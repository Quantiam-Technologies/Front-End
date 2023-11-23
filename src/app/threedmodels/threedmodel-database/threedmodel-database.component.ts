import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable, of , forkJoin } from 'rxjs';
//import { debounce } from 'lodash';
import { debounce } from 'lodash-es';
import { map, tap } from 'rxjs/operators';
import { NotificationsService } from 'angular2-notifications';


@Component({
    selector: 'app-threedmodel-database',
    templateUrl: './threedmodel-database.component.html',
    styleUrls: ['./threedmodel-database.component.css']
})
export class ThreedmodelDatabaseComponent implements OnInit {

    constructor(private http: HttpClient, private notification: NotificationsService) {
        this.searchContentsOfAllProjects = debounce(this.searchContentsOfAllProjects, 700);
    }

    private gridApi;
    private gridColumnApi;
    tokenResponse;
    quantiamhub;
    projectID;
    projectFolderId;
    projectList;
    filteredTextFilterName;
    topLevelresults;
    allSearchResults;
    quantiamDrawingsToggle = false;
    private loading: boolean = false;

    searchResults$: Observable < any > ;

    columnDefs:any = [

        {
            field: 'type',
            headerName: '',
            width: 60,
            cellRenderer: (item) => {

                if (item.data.type === 'folders') {
                    return '<svg class="bi bi-folder" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">\
                <path d="M9.828 4a3 3 0 0 1-2.12-.879l-.83-.828A1 1 0 0 0 6.173 2H2.5a1 1 0 0 0-1 .981L1.546 4h-1L.5 3a2 2 0 0 1 2-2h3.672a2 2 0 0 1 1.414.586l.828.828A2 2 0 0 0 9.828 3v1z"/>\
                <path fill-rule="evenodd" d="M13.81 4H2.19a1 1 0 0 0-.996 1.09l.637 7a1 1 0 0 0 .995.91h10.348a1 1 0 0 0 .995-.91l.637-7A1 1 0 0 0 13.81 4zM2.19 3A2 2 0 0 0 .198 5.181l.637 7A2 2 0 0 0 2.826 14h10.348a2 2 0 0 0 1.991-1.819l.637-7A2 2 0 0 0 13.81 3H2.19z"/>\
              </svg>';

                }

                if (item.data.type === 'items') {

                    if (item.data.attributes.extension.type.includes('Design')) {
                        return '<svg class="bi bi-pencil" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">\
                                <path fill-rule="evenodd" d="M11.293 1.293a1 1 0 0 1 1.414 0l2 2a1 1 0 0 1 0 1.414l-9 9a1 1 0 0 1-.39.242l-3 1a1 1 0 0 1-1.266-1.265l1-3a1 1 0 0 1 .242-.391l9-9zM12 2l2 2-9 9-3 1 1-3 9-9z"/>\
                                <path fill-rule="evenodd" d="M12.146 6.354l-2.5-2.5.708-.708 2.5 2.5-.707.708zM3 10v.5a.5.5 0 0 0 .5.5H4v.5a.5.5 0 0 0 .5.5H5v.5a.5.5 0 0 0 .5.5H6v-1.5a.5.5 0 0 0-.5-.5H5v-.5a.5.5 0 0 0-.5-.5H3z"/>\
                            </svg>';

                    } else {
                        return '<svg class="bi bi-file-text" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">\
                            <path fill-rule="evenodd" d="M4 1h8a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2zm0 1a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1H4z"/>\
                            <path fill-rule="evenodd" d="M4.5 10.5A.5.5 0 0 1 5 10h3a.5.5 0 0 1 0 1H5a.5.5 0 0 1-.5-.5zm0-2A.5.5 0 0 1 5 8h6a.5.5 0 0 1 0 1H5a.5.5 0 0 1-.5-.5zm0-2A.5.5 0 0 1 5 6h6a.5.5 0 0 1 0 1H5a.5.5 0 0 1-.5-.5zm0-2A.5.5 0 0 1 5 4h6a.5.5 0 0 1 0 1H5a.5.5 0 0 1-.5-.5z"/>\
                            </svg>';
                    }
                }
                return null;
            }

        },
        {
            field: 'attributes.displayName',
            headerName: 'Q#',
            width: 100,
            cellStyle: { 'font-weight': 600, },
            cellRenderer: (value) => {

                //            console.log(value);

                if (value.value.includes('Q-')) {
                    const split = value.value.split(' ');
                    console.log(split);
                    return split[0];
                }
                return '';
            }
        },
        {
            field: 'attributes.displayName',
            headerName: 'Name',
            width: 300,
            cellRenderer: (value) => {

                if (value.value.includes('Q-')) {
                    let split = value.value.split(' ');
                    split.splice(0, 1);
                    split = split.join(' ');
                    return split;
                }
                return value.value;
            }
        },

        {
            headerName: 'Ver.',
            width: 60,
            field: 'relationships.tip.data.id',
            cellRenderer: function(item) {

                if (item.value) {
                    const items = item.value.split('version=');
                    return items[1];
                }

                return null;
            }
        },

        { field: 'project.attributes.name', headerName: 'Project', width: 200 },
        {
            field: 'attributes.lastModifiedTime',
            headerName: "Modified",
        },
        {
            field: 'attributes.createUserName',
            headerName: "User",
        },
        {
            field: '',
            headerName: "Actions",

            cellRenderer: (item,thing) => {

                 console.log(item,thing);
                console.log(item.data.project.id);
                let hash = item.data.project.id.split('.');

                let urlInfo = atob(hash[1]);
                console.log(urlInfo);

                let myhubSplit = urlInfo.split(':');
                let secondSplit = myhubSplit[1].split('#');
                
                
                let type = myhubSplit[0];
                let hub = secondSplit[0];
                let project = secondSplit[1];







                
                // get array item.rowIndex  grab from item list

                // fetch item object from the response. 

                if (item.data.type === 'items') {



                //let url = 'myhub.autodesk360.com/abcd/g/projects/1234/data/Base64Encode(FolderURN)/Base64Encode(ItemUrn)/viewer';

                let url = type+'.autodesk360.com/'+hub+'/g/projects/'+project+'/data/btoa(FolderURN)/atob(ItemUrn)/viewer';


                    var bim360Url = 'https://docs.b360' + (item.data.relationships.parent.data.id.indexOf('emea') > 0 ? '.eu' : '') + //folder urn
                        '.autodesk.com/projects/' + item.data.project.id.replace("b.", '') +
                        '/folders/' + item.data.relationships.parent.data.id +
                        '/detail/viewer/items/' + item.data.id;

                    console.log(item);

                    return '<a target="_blank" class="btn btn-xs btn-primary">Broken Link</a>';
                }


                return '';
            },

        },


    ];

    defaultColDef = {
        sortable: true,
        resizable: true,
        filter: false,
        cellStyle: function(params) {
            return {
                cursor: 'pointer',
            };
        },

    };


    detailColumnDefs = [

        {
            field: 'type',
            headerName: '',
            width: 80,
            cellRenderer: (item) => {

                if (item.data.type === 'folders') {
                    return '<svg class="bi bi-folder" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">\
                <path d="M9.828 4a3 3 0 0 1-2.12-.879l-.83-.828A1 1 0 0 0 6.173 2H2.5a1 1 0 0 0-1 .981L1.546 4h-1L.5 3a2 2 0 0 1 2-2h3.672a2 2 0 0 1 1.414.586l.828.828A2 2 0 0 0 9.828 3v1z"/>\
                <path fill-rule="evenodd" d="M13.81 4H2.19a1 1 0 0 0-.996 1.09l.637 7a1 1 0 0 0 .995.91h10.348a1 1 0 0 0 .995-.91l.637-7A1 1 0 0 0 13.81 4zM2.19 3A2 2 0 0 0 .198 5.181l.637 7A2 2 0 0 0 2.826 14h10.348a2 2 0 0 0 1.991-1.819l.637-7A2 2 0 0 0 13.81 3H2.19z"/>\
              </svg>';

                }

                if (item.data.type === 'items') {
                    return '<svg class="bi bi-pencil" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">\
                <path fill-rule="evenodd" d="M11.293 1.293a1 1 0 0 1 1.414 0l2 2a1 1 0 0 1 0 1.414l-9 9a1 1 0 0 1-.39.242l-3 1a1 1 0 0 1-1.266-1.265l1-3a1 1 0 0 1 .242-.391l9-9zM12 2l2 2-9 9-3 1 1-3 9-9z"/>\
                <path fill-rule="evenodd" d="M12.146 6.354l-2.5-2.5.708-.708 2.5 2.5-.707.708zM3 10v.5a.5.5 0 0 0 .5.5H4v.5a.5.5 0 0 0 .5.5H5v.5a.5.5 0 0 0 .5.5H6v-1.5a.5.5 0 0 0-.5-.5H5v-.5a.5.5 0 0 0-.5-.5H3z"/>\
              </svg>';
                }
                return null;
            }
        },
        { field: 'attributes.displayName', headerName: 'Name', width: 400 },

        {
            headerName: 'Ver.',
            width: 60,
            field: 'relationships.tip.data.id',
            cellRenderer: function(item) {

                if (item.value) {
                    const items = item.value.split('version=');
                    return items[1];
                }

                return null;
            }
        },
        {
            field: 'attributes.lastModifiedTime',
            headerName: "Modified",
        },
        {
            field: 'attributes.createUserName',
            headerName: "User",
        },
        {
            field: '',
            onCellClicked: (cell) => {

                if (cell.data) {
                    //this.router.navigate(['/sem/run/' + cell.data.semrun_id]);
                }
                //  console.log('worked');

            },
            cellRenderer: function(item) {

                //   console.log(item);

                if (item.data.attributes.type === 'items') {

                    //myhub.autodesk360.com/abcd/g/projects/1234/data/Base64Encode(FolderURN)/Base64Encode(ItemUrn)/viewer

                    /* 
                        1. project id
                    */

                    var test = atob(item._source.projectId);
                    console.log(test);

                    var bim360Url = 'https://docs.b360' + (item.data.relationships.parent.data.id.indexOf('emea') > 0 ? '.eu' : '') +
                        '.autodesk.com/projects/' + item._source.projectId.replace("b.", '') +
                        '/folders/' + item._source.folderUrn +
                        '/detail/viewer/items/' + item._source.itemUrn;

                    console.log(bim360Url);
                    if (item.value) {
                    //   return bim360Url;
                    }
                }


                return '';
            },

        },


    ];
    detailCellRendererParams = {
        detailGridOptions: {
            columnDefs: this.detailColumnDefs,
            defaultColDef: { flex: 1 },
            onRowClicked: this.onRowClicked,
        },
        getDetailRowData: (params) => {
            console.log(params);

            this.fetchFolderContents(params.data.project.id, params.data.id).subscribe((r: any) => {

                params.successCallback(r.data);
                console.log(r);
            });
            //
        },
    };

    ngOnInit(): void {
        this.authenticateFusion();
    }

    onGridReady(params) {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;

    }

    onRowClicked(params) {
        console.log(params);
        if (params.data.type === 'folders') {
            params.node.setExpanded(!params.node.expanded);
            console.log('expand row');
        }
    }



    authenticateFusion() {


        // probalby should request this from our api server; store issued token
        this.http.get(environment.apiUrl + '/fusion/token').subscribe((r: any) => {

            this.tokenResponse = r;
            if (r.hasOwnProperty('errorCode')) {
                this.notification.error('Error', 'The fusion api token is invalid or expired.', { showProgressBar: false, timeOut: 5000, clickToClose: true });

            } else {
                this.fetchProjectList();
            }
            // this.fetchHubList();


        });

    }


    fetchHubList() {

        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.tokenResponse.access_token
            })
        };
        this.http.get('https://developer.api.autodesk.com/project/v1/hubs', httpOptions).subscribe((r: any) => {

            this.quantiamhub = r.data[0];




            this.fetchProjectList();

            console.log(r);

        });


    }

    fetchProjectList() {
        //// Fetch projects only from QHUB. 
        //this.quantiamhub.id = ;
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.tokenResponse.access_token
            })
        };
        this.http.get('https://developer.api.autodesk.com/project/v1/hubs/a.YnVzaW5lc3M6cXVhbnRpYW0/projects', httpOptions).subscribe((r: any) => {


            ///this.fetchFolderContents(r.data[0].id, r.data[0].relationships.rootFolder.data.id);
            //this.searchFolderContents(r.data[0].id, r.data[0].relationships.rootFolder.data.id, 'calendar');
            this.projectList = r.data;
            this.projectID = r.data[0].id;
            this.projectFolderId = r.data[0].relationships.rootFolder.data.id;
            console.log(r);
            this.toggleQuantiamDrawings();
            //this.getContentsOfAllProjects();
            //this.fetchProject(this.quantiamhub.id, this.projectID);
            //  console.log(r);


        });


    }

    fetchProject(hub_id, project_id) {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.tokenResponse.access_token
            })
        };
        this.http.get('https://developer.api.autodesk.com/project/v1/hubs/' + hub_id + '/projects/' + project_id, httpOptions).subscribe((r: any) => {

            console.log(r);



            //this.fetchFolderContents(project_id, r.data.relationships.rootFolder.data.id);


        });




    }


    fetchFolderContents(project_id, folder_id) {

        console.log(project_id, folder_id);

        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.tokenResponse.access_token
            })
        };
        return this.http.get('https://developer.api.autodesk.com/data/v1/projects/' + project_id + '/folders/' + folder_id + '/contents', httpOptions);


    }



    fetchItem(href) {

        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.tokenResponse.access_token
            })
        };

        //href = href.replace('versions','items');
        this.http.get(href, httpOptions).subscribe((r) => { console.log(r); });


    }

    fetch(href) {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.tokenResponse.access_token
            })
        };
        //href = href.replace('versions','items');
        this.http.get(href, httpOptions).subscribe((r) => { console.log(r); });
    }


    searchFolderContents(string) {
        console.log(string.target.value);
        string = encodeURI(string.target.value);
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.tokenResponse.access_token
            })
        };


        this.searchResults$ = this.http.get('	https://developer.api.autodesk.com/data/v1/projects/' + this.projectID + '/folders/' + this.projectFolderId + '/search?filter[displayName]-contains=' + string, httpOptions)
            .pipe(map((r: any) => r.included));

    }


    getContentsOfAllProjects() {

        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.tokenResponse.access_token
            })
        };

        const requestArray: any = [];

        this.projectList.forEach(project => {
            //console.log(project);
            const temp = this.http.get('	https://developer.api.autodesk.com/data/v1/projects/' + project.id + '/folders/' + project.relationships.rootFolder.data.id + '/contents', httpOptions)
                .pipe(tap((res: any) => {

                    if (res.data[0]) {

                        res.data.forEach((data: any) => { data.project = project; })
                    }
                    if (res.hasOwnProperty('included') && res.included[0]) {
                        res.included.forEach((data: any) => { data.project = project; })
                    }
                }));
            requestArray.push(temp);
        });

        //console.log(requestArray);

        forkJoin(requestArray).pipe(map((resp: any) => resp.map(res => res.data))).subscribe(results => {

            //  console.log(results);
            this.topLevelresults = [];
            results.forEach(element => {
                console.log(element);
                if (element.length > 0) {
                    this.topLevelresults = this.topLevelresults.concat(element);
                }
            });
            this.searchResults$ = of (this.topLevelresults);
            this.gridApi.sizeColumnsToFit();
            // this.gridApi.autoSizeColumns();
            // setTimeout((x)=>{this.gridApi.sizeColumnsToFit();},200) ;
            console.log(this.topLevelresults);

        });



    }

    searchContentsOfAllProjects(event) {
        //   console.log(event);
        //  console.log(event.target.value);
        let string = null;

        if (event && !this.quantiamDrawingsToggle && event.target.value === '') {
            this.getContentsOfAllProjects();
            return;
        } else if (event && event.target.value !== '') {
            string = 'filter[displayName]-contains=' + encodeURI(event.target.value);
        }

        if (this.quantiamDrawingsToggle) {
            string = string + '&filter[displayName]-starts=' + encodeURI('Q-');
        }


        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.tokenResponse.access_token
            })
        };



        const requestArray: any = [];

        this.projectList.forEach(project => {
            //console.log(project);
            const temp = this.http.get('	https://developer.api.autodesk.com/data/v1/projects/' + project.id + '/folders/' + project.relationships.rootFolder.data.id +
                '/search?' + string, httpOptions).pipe(
                tap((res: any) => {

                    if (res.data[0]) {
                        res.data.forEach((data: any) => { data.project = project; })
                    }
                    if (res.hasOwnProperty('included') && res.included[0]) {
                        res.included.forEach((data: any) => { data.project = project; })
                    }
                })
            );
            requestArray.push(temp);
        });

        //console.log(requestArray);

        forkJoin(requestArray).pipe(map((resp: any) => { console.log(resp); return resp.map(res => res.included); })).subscribe(results => {

            console.log(results);
            this.allSearchResults = [];
            results.forEach(element => {
                //console.log(element);
                if (typeof element !== 'undefined' && element.length > 0) {
                    this.allSearchResults = this.allSearchResults.concat(element);
                }
            });
            this.searchResults$ = of (this.allSearchResults);
            // this.gridApi.autoSizeColumns();

            this.gridApi.sizeColumnsToFit();
            // setTimeout((x)=>{this.gridApi.sizeColumnsToFit();},200) ;
            console.log(this.allSearchResults);

        });

    }


    toggleQuantiamDrawings() {
        this.quantiamDrawingsToggle = !this.quantiamDrawingsToggle;
        if (this.quantiamDrawingsToggle) {
            this.searchContentsOfAllProjects(null);

        } else {
            this.getContentsOfAllProjects();
        }

    }










    /// a way to display this --- a methiod to associate things in our DB with projects 

}