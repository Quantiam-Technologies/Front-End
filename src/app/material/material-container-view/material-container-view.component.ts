import { Component, OnInit, OnDestroy } from '@angular/core';
import { MaterialLotContainerService } from '../../services/material-lot-container/material-lot-container.service';
import { MaterialLotService } from '../../services/material-lot/material-lot.service';
import { MaterialService } from '../../services/material/material.service';
import { MaterialSupplierService } from '../../services/material-supplier/material-supplier.service';
import { LocationService } from '../../services/location/location.service';
import * as moment from 'moment';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user/user.service';
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import { NotificationsService } from 'angular2-notifications';

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { MatDialog } from '@angular/material/dialog'; 

import { FileSaverService } from 'ngx-filesaver';

import { MaterialHazardSymbolSelectorComponent } from '../material-hazard-symbol-selector/material-hazard-symbol-selector.component';

@Component({
  selector: 'app-material-container-view',
  templateUrl: './material-container-view.component.html',
  styleUrls: ['./material-container-view.component.css']
})



export class MaterialContainerViewComponent implements OnInit, OnDestroy {

  _container = null;
	container: any;
	canEdit = false;
  editMaterial = false;
  editLot = false;
  editContainer = false;
  test_selector = null;
  newLotCreated = false;
  scannerNavigation: any;
  showSDSError = false;
  showUploadZone = false;
  historicalSDSList = <any>[];
	fetched = false;
	sdsSearch = [];
	searchingPossibleSDS = false;
	sdsBlob;
	showSDS = false;
	SDSurl;
	firstLoad = true;

	matButtonToggleState = 'container';

	public files: NgxFileDropEntry[] = [];
	
	MsdsSearch = {

		action: 'search',
		hostName: 'chemicalsafety.com',
		isContains: 1,
		p1: 'MSMSDS.COMMON|',  // Chemical name lowercase
		p2: 'MSMSDS.MANUFACT|', // Manufactuer
		p3: 'MSCHEM.CAS|',  // CAS
	};


  locationList: any;

  constructor(
	private materialLotCotainerService: MaterialLotContainerService,
	private materialService: MaterialService,
	private materialLotService: MaterialLotService,
	private materialSupplierService: MaterialSupplierService,
	private route: ActivatedRoute,
	private locationService: LocationService,
	private router: Router,
	private userService: UserService,
	private http: HttpClient,
	private notification: NotificationsService,
	public dialog: MatDialog,
	private _FileSaverService: FileSaverService,
	) { }

  ngOnInit() {

		if (this.userService.hasPermission([40, 41])) { this.canEdit = true; }


		const id  = this.route.snapshot.params['id'];  // obtain ID from route

		

			this.route.params.subscribe((p) =>{

					
				 	this.materialLotCotainerService.getMaterialLotContainer(p['id']).subscribe(res => {});

			})

			this.route.queryParams.subscribe((p: any) => {

					
					this.scannerNavigation = p['scannerNavigation'];


			});

      this._container = this.materialLotCotainerService.materialLotContainer$.subscribe(res => { // subscribe to the material service for updates

			this.container = {};
			this.firstLoad = false;
			this.fetched = true;
			if (typeof res !== 'undefined') {

			this.container = res;
			if(typeof res.lot !== 'undefined'){

				if(!this.container.lot.material.sds) { this.fetchPotentialMSDS(); }
				if(this.container.lot.material.sds) { this.fetchSDS(); }
			}

			if (this.scannerNavigation && this.container.id && !this.container.active) { this.materialLotCotainerService.update({active: 1}, this.container.id).subscribe((r) => { this.container.active = true; }); }


			// console.log(moment(this.container.container_opened).format("YYYY-MM-DDTHH:mm:ss.SSS")+'Z');

			// Need to find a better way of translating this
			if (this.container.container_received) { this.container.container_received = moment(this.container.container_received).format('YYYY-MM-DDTHH:mm:ss.SSS') + 'Z'; }
			if (this.container.container_opened) { this.container.container_opened = moment(this.container.container_opened).format('YYYY-MM-DDTHH:mm:ss.SSS') + 'Z'; }



			  this.editMaterial = false;
			  this.editLot = false;
			  this.editContainer = false;
		}
	  }, (error: any) => {
	  this.fetched = false;
		this.container = {};

	  });


		this.locationService.getList();
		this.fetchLocationList();

	}

  ngOnDestroy() {
    this._container.unsubscribe();
  }

	fetchLocationList() {
		this.locationService.list$.subscribe((r) => {



				this.locationList = r;




		});


	}

  updateContainerField(field, specific_field?) {

        const params = {};
        if (specific_field) {
			params[specific_field] = field;

		} else { params[field.name] =  field.value; }
        this.materialLotCotainerService.update(params).subscribe((r) => {console.log(r); });
  }

  changeContainerStatus() {
		const params = {};
        params['active'] =  this.container.active;
        params['empty'] =  this.container.empty;
        this.materialLotCotainerService.update(params).subscribe();
  }

  changeContainerEmptyStatus ()
  {
	// call are you sure popup, asking them to scribble on bottle, place item back on the shelf where it lives

	// use route to update status and notify immediate supervisor & notification list. 

  }

  changeContainerActiveStatus()
  {
	// notiication isn't required here pretty sure.
  }

  updateMaterial(field) {

    const params = {};
    params[field.name] =  field.value;
	params['supplier'] = true;
    this.materialService.updateMaterial(params, this.container.lot.material.id).subscribe((r) => {  this.container.lot.material = r;   });

  }

  changedLot(obj) {
	const lot_obj = obj.data[0];

	//console.log(lot_obj);
	if (lot_obj.isNew) {
				// trigger some sort of confirm popup
				if (window.confirm('Are you sure you want to create \'' + lot_obj.text + '\' ?')) {

						const params = {'lot_name': lot_obj.text, 'material_id': this.container.lot.material.id};
						this.createMaterialLot(params);

					  }

			return;
		}

	const payload = {'lot_id': lot_obj.id, 'lot': true};
	//console.log(payload);
	this.materialLotCotainerService.update(payload).subscribe();


  }

  createMaterialLot(obj) {

	this.materialLotService.create(obj).subscribe((r) => {


			this.newLotCreated = true;
			const payload = {'lot_id': r.id, 'lot': true};
			this.materialLotCotainerService.update(payload).subscribe();


		});

  }

  changedSupplier(obj) {
	const supplier_obj = obj;

	console.log(supplier_obj);
	if (supplier_obj.isNew) {
				// trigger some sort of confirm popup
				if (window.confirm('Are you sure you want to create \'' + supplier_obj.text + '\' ?')) {

						const params = {'supplier_name': supplier_obj.text};
						this.createMaterialSupplier(params);

					  }

			return;
		}

	const payload = {'supplier_id': supplier_obj.id, 'supplier': true};
	 this.materialService.updateMaterial(payload, this.container.lot.material.id).subscribe((r) => {  this.container.lot.material = r;   });


  }

  createMaterialSupplier(obj) {
	console.log(obj);
	this.materialSupplierService.create(obj).subscribe((r) => {

			console.log(r);
			const payload = {'supplier_id': r.id, 'supplier': true};
			this.materialService.updateMaterial(payload, this.container.lot.material.id).subscribe((r2) => {  this.container.lot.material = r2;   });


		});

	}


	deleteContainer() {


		if(confirm('Are you sure you want to delete this container?')) {
			this.materialLotCotainerService.delete(this.container.id).subscribe(r => {

							this.router.navigate(['/material/container/database'], {queryParams: { refreshTable: true}});

			});

		}

	}

	fetchPotentialMSDS() {

		const params = this.MsdsSearch;

		if(this.searchingPossibleSDS === false && this.container.lot.material && this.container.lot.material.cas && !this.container.lot.material.sds)
		{
		this.searchingPossibleSDS = true;
		params.p1 = 'MSMSDS.COMMON|' + this.container.lot.material.name.toLowerCase();
		params.p2 = 'MSMSDS.MANUFACT|' + this.container.lot.material.supplier.supplier_name.toLowerCase();
		params.p3 = 'MSCHEM.CAS|' + this.container.lot.material.cas;


		this.http.post<any>('https://chemicalsafety.com/sds1/retriever.php?filterSpinner', params).subscribe(r => {

		//	console.log(r);
			this.sdsSearch = r.rows;

		//	console.log(this.sdsSearch);

			if (this.sdsSearch[0]) { this.searchingPossibleSDS = false; }


			if (r.rows.length === 0) {
				const splitstring = params.p1.split(' ');
				params.p2 = null;
				params.p1 = splitstring[0];
				this.http.post<any>('https://chemicalsafety.com/sds1/retriever.php?filterSpinner', params).subscribe(r2 => {

				//	console.log(r2);

						this.sdsSearch = r2.rows;

						if (this.sdsSearch[0]) {
					//		console.log(this.sdsSearch);


						}
						this.searchingPossibleSDS = false;
					});

			}

		});
		} else {

			this.notification.info('Missing', 'If possible, please add a CAS number for this material.', {showProgressBar: false, timeOut: 5000, clickToClose: true});

		}
	}

	navigateToSDS(item) {
		const win = window.open('https://chemicalsafety.com/sds1/sdsviewer.php?id=' + item[0], '_blank');
 		 win.focus();
	}

	public dropped(files: NgxFileDropEntry[]) {
   // this.files = event.files;
    for (const droppedFile of files) {

      if (droppedFile.fileEntry.isFile) { //is it a file?
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {

          // You could upload it like this:
          const formData = new FormData();
          formData.append('sds', file, 'test.pdf');

          // Headers
          const headers = new HttpHeaders({

          });

          this.http.post(environment.apiUrl + '/material/' + this.container.lot.material.id + '/sds', formData, { headers: headers })
          .subscribe(response => {

						this.container.lot.material = response;
						this.files = [];
						this.fetchSDS();
					},
					error => {
							this.notification.error('Error', error.error.error, {showProgressBar: false, timeOut: 5000, clickToClose: true});
							this.files = [];	});


        });
      } else {
				// It was a directory (empty directories are added, otherwise only files)
				this.notification.error('Error', 'You can only upload a pdf file.', {showProgressBar: false, timeOut: 3000, clickToClose: true});
				this.files = [];

      }
    }
  }

	public fileOver(event) {
	}
  public fileLeave(event) {
	}


	fetchSDS() {

		if(this.showSDS){ this.showSDS = false; }
		
		this.http.get(environment.apiUrl + '/material/' + this.container.lot.material.id + '/sds?filterSpinner',  {responseType: 'blob'}).subscribe((response) => {

				this.sdsBlob = response;
				this.showSDS = true;
				this.showSDSError = false;
				 this.SDSurl = window.URL.createObjectURL(response);
				  const ifr = document.getElementById('iframe') as HTMLIFrameElement;
				  
					if (ifr) {
						ifr.contentWindow.location.replace(this.SDSurl)
					}

		}, (error)=>{
			this.showSDS = false;
			this.showSDSError = true;
			this.notification.error('Problem', 'There was an issue trying to display the SDS.', {showProgressBar: false, timeOut: 5000, clickToClose: true});


		});

	}

	deleteSDS() {

		if (confirm('Are you sure you want to delete the SDS?')) {

			this.http.delete(environment.apiUrl + '/material/' + this.container.lot.material.id + '/sds?filterSpinner').subscribe((response) => {

					// console.log(respone)
					this.showSDS = false;
					this.container.lot.material.sds = 0;
					this.container.lot.material = response;
			});

		}

	}

	generateMaterialLargeLabelDownload() {
    const url = environment.apiUrl + '/material/lot/container/' + this.container.id + '/label';

    // this.notification.info('Processing... ',  'Generating this timesheet.', {timeOut: 4000, showProgressBar: false, clickToClose: true}); /// Daily OT notificaton

    this.http.get<any>(url)
    .subscribe(r => {
      console.log(r);
     window.location.assign(r.url);
      this.notification.success('Success',  'Label Generated', {timeOut: 4000, showProgressBar: false, clickToClose: true}); /// Daily OT notificaton

    });

  }

  fixButtonState(){
	  console.log('test');
	  this.matButtonToggleState = 'container';
  }

  
  openHazardDialog(): void {
    const dialogRef = this.dialog.open(MaterialHazardSymbolSelectorComponent, {
	  width: '80vw',
	  position: {top:'20px'},
	  disableClose: true,
      data: this.container.lot.material
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.container.lot.material = result;
    });
  }

  fetchSDSList() {

	this.http.get(environment.apiUrl + '/material/' + this.container.lot.material.id + '/sds/list?filterSpinner').subscribe((response) => {

			this.historicalSDSList = response;
			console.log(this.historicalSDSList);
	});

  } 
  
  fetchCofAList() {

	this.http.get(environment.apiUrl + '/lot/' + this.container.lot.material.lot.id + '/cofa?filterSpinner').subscribe((response) => {

			this.historicalSDSList = response;
			console.log(this.historicalSDSList);
	});

  }

  downloadSDS(obj){
	const params  = new HttpParams().set('fullpath', obj.pathname);
	this.http.get(environment.apiUrl + '/qdrive', {
		responseType: 'blob', // This must be a Blob type
		params: params
	  }).subscribe((res) => {
		this._FileSaverService.save(<any>res, obj.filename);
	  });

  }

  SDStabChanged(event){
	  console.log(event);
	  if(event.tab.textLabel === 'SDS')
	  {
		  this.fetchSDS();
	  }

	  if(event.tab.textLabel === 'Historical SDS')
	  {
		this.fetchSDSList();
	  } 
	  
	  if(event.tab.textLabel === 'Certificate of Analyses')
	  {
		//this.fetchCofAList();
	  }
  }

}
