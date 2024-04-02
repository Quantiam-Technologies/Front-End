import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { ErrorStateMatcher } from '@angular/material/core';
import {map, startWith} from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UntypedFormBuilder, UntypedFormGroup, Validators, FormControl } from '@angular/forms';
import { MaterialLotContainerService } from '../../services/material-lot-container/material-lot-container.service';
import { MaterialLotService } from '../../services/material-lot/material-lot.service';
import { MaterialService } from '../../services/material/material.service';
import { MaterialLotContainerDatatableService } from '../services/material-lot-container-datatable.service';
import { MatStepper } from '@angular/material/stepper';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';

import { LocationService } from '../../services/location/location.service';
import { WebsocketService } from '../../services/websocket/websocket.service';
import { Router } from '@angular/router';

import { environment } from '../../../environments/environment';
import { NotificationsService } from 'angular2-notifications';

import { MatDialog } from '@angular/material/dialog'; 

import { MaterialHazardSymbolSelectorComponent } from '../material-hazard-symbol-selector/material-hazard-symbol-selector.component';
import { MaterialCheckCreationDialogComponent } from '../material-check-creation-dialog/material-check-creation-dialog.component';

import * as _moment from 'moment';


@Component({
    selector: 'app-material-creation-dialog',
    templateUrl: './material-creation-dialog.component.html',
    styleUrls: ['./material-creation-dialog.component.css'],
    providers: [],
})

export class MaterialCreationDialogComponent implements OnInit, OnDestroy {

    isLinear = true;
    materialFormGroup: UntypedFormGroup;
    lotFormGroup: UntypedFormGroup;
    containerFormGroup: UntypedFormGroup;
    sdsFormGroup: UntypedFormGroup;
    qcidFormGroup: UntypedFormGroup;

    materialChecked = false;
    materialSupplierNameChecked = false;
    materialCheckedOkay = false;
    checkIfDirectMatch = false;
    hideMaterialCheckBox = false;
    previouslySelectedMaterialGrade;

    lookedForMaterial = true;
    form: UntypedFormGroup;
    description: string;
    newMaterial = false;
    selectedMaterial: any = {};
    selectedLot: any = {};
    materialStepComplete = false;
    codeRegistryStep = false;
    materialCreationStep = true;
    creatingMaterial = false;
    newLot: any = {};
    container: any = {savedQCID: false};
    material: any = {whmis_hazard_symbols: [] as any};
    lot: any = {};
    today = new Date();
    hideNewLot = false;
    isWeight = false;
    containersToMake = 0;
    createdContainers = [] as any;
    loadQcidTable = false;
	files = [] as any;
	stuffCreated = false;

    materialSearchFilterValue;
    selectedMaterialname; 
    supplierSelected = false;

    sdsBlob;
    showSDS = false;
    showSDSError = false;
    SDSurl;


    _ws;
    _wsk;


    myControl = new FormControl('');
    selectedSupplierMaterialOptions:any = [{
        "supplier_id": 4,
        "slip_material_id": 205,
        "id": 205,
        "name": "Agar",
        "grade": "fine",
        "cas": "9002-18-0",
        "formula_weight": null,
        "density": null,
        "powder": 0,
        "solvent": 0,
        "media": 0,
        "organic": 0,
        "supplier_name": "Aldrich",
        "particle_size": null,
        "purity": null,
        "formula": "(C12H18O9)n",
        "qcid": "7",
        "r": 1
    }];    
    filteredOptions: Observable<any[]>;

    // Temporary until we link to DB
    locationList: any;

    // @Output() refreshContainerTable = new EventEmitter();


    constructor(
        private fb: UntypedFormBuilder,
        public dialogRef: MatDialogRef < MaterialCreationDialogComponent > ,
        @Inject(MAT_DIALOG_DATA) data,
        private materialLotContainerService: MaterialLotContainerService,
        private materialService: MaterialService,
        private materialLotService: MaterialLotService,
        private websocket: WebsocketService,
        public router: Router,
        private materialLotContainerDatatable: MaterialLotContainerDatatableService,
        private locationService: LocationService,
        private _formBuilder: UntypedFormBuilder,
        private notification: NotificationsService,
		private http: HttpClient,
		public dialog: MatDialog,
    ) {}

    ngOnInit() {

        this.createMaterialAttrs();

        this.materialFormGroup = this._formBuilder.group({
            firstCtrl: ['', Validators.required]
        });
        this.lotFormGroup = this._formBuilder.group({
            secondCtrl: ['', Validators.required]
        });
        this.containerFormGroup = this._formBuilder.group({
            thirdCtrl: ['', ],
            thirdCtrl2: ['', Validators.required],
            thirdCtrl3: ['', Validators.required],
            thirdCtrl4: ['', Validators.required],
            thirdCtrl5: ['', ],
            thirdCtrl6: ['', Validators.required],
            thirdCtrl7: ['', ],
            thirdCtrl8: ['', ],
        });

        this.sdsFormGroup = this._formBuilder.group({
			fourthCrtl: ['', Validators.required],

        });

        this.form = this.fb.group({
            description: [this.description, []],

        });



        this.websocket.redirectOnScan = false;

        this._ws = this.websocket.observable.subscribe((r) => {

            // console.log('dialog');
            if (this.codeRegistryStep && r.type === 'Scanner') {
                // take scanned data and add it to the container.
                this.container.qcid = r.data;
            }

        });

        this._wsk = this.websocket.keyboardObservable.subscribe((r) => {

            // console.log('dialog');
            if (this.codeRegistryStep) {
                // take scanned data and add it to the container.
                this.container.qcid = r.data;
            }

        });

        this.locationService.getList();
        this.fetchLocationList();



    }


    private _filter(value:any) {
        const filterValue = value.toLowerCase();

        this.materialSearchFilterValue = filterValue;
    
        let test =  this.selectedSupplierMaterialOptions.filter(option => { 
            //console.log(filterValue,option.name, option.name.toLowerCase().includes(filterValue));

            if(option)
            {
            return option.name.toLowerCase().includes(filterValue) === true 
            || (option.grade !== null && option.grade.toLowerCase().includes(filterValue) === true) || option.id == filterValue;
            }
        });

        return test;
      }


      displayFn(material) {
      //  console.log(material);
        
        return material;
      //  return 'text';
    
      }
    



    fetchLocationList() {
        this.locationService.list$.subscribe((r) => {

            this.locationList = r;
        });

    }




    save() {
        this.dialogRef.close(this.form.value);
    }

    close() {

		if(!this.stuffCreated) {

            confirm("Are you sure?")
            {

				this.dialogRef.close();
                
            }
	/* 	Swal.fire({
            title: 'Are you sure?',
            text: 'This action will lose your container progress.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, this is okay',
        }).then((result) => {

				this.dialogRef.close();
		
		}); */
		} else {
			this.dialogRef.close();
		}
    }


    checkIfNewMaterial(){
        //console.log(event);
        if(this.previouslySelectedMaterialGrade !== this.material.grade){
            console.log('this is different then the selected',this.previouslySelectedMaterialGrade,this.material.grade);
            this.material.id = null;
            this.material.slip_material_id = null;
            this.newMaterial = false;
           // event.returnValue
         }else
         {
            console.log('this is the same',this.previouslySelectedMaterialGrade,this.material.grade);
           this.material.grade =  this.previouslySelectedMaterialGrade;
           this.newMaterial = true;

         }

    }


    selectMaterial(obj) {

      //  console.log(obj);


        this.selectedMaterial = obj;
          this.previouslySelectedMaterialGrade = obj.grade;
        
        this.lot = {};
        this.selectedLot = {};
       // this.materialStepComplete = false;

        if (this.selectedMaterial && this.selectedMaterial.id) {
            this.materialStepComplete = true;
            this.material = this.selectedMaterial;
        } else {
            this.materialStepComplete = false;
            this.material = {};
        }
		//  console.log(this.selectedMaterial);
		
		/* if(obj.hasOwnProperty('sds') && obj.sds) {
			console.log('triggered');
			this.fetchSDS();
		}  */

        this.materialFormGroup.setValue({
            firstCtrl: this.material.name,
         });




     //   console.log(this.material,this.lot,this.container);

    }


    selectSupplier(obj) {

        this.material = {};
        
        if (typeof(obj) !== 'undefined') {
            this.material.supplier_id = obj.supplier_id;
        }
        else
        {
            this.materialFormGroup.setValue({
                firstCtrl: '',
             });
        }


        //get list of materials from supplier --- populate material name
        this.fetchMaterialsFromSelectedSupplier();
      //  this.resetMaterialCheck();


    }

    fetchMaterialsFromSelectedSupplier(){


           this.http.get(environment.apiUrl + '/material/supplier/' + this.material.supplier_id + '/materials').subscribe((r:any) => {


            this.selectedSupplierMaterialOptions = r;
            this.supplierSelected = true;
         //   this.filteredOptions = new Observable(r);
            // this.filteredOptions.pipe(map(materials=>{

            //     console.log(materials);
            // }));
           

            
        this.filteredOptions = this.myControl.valueChanges.pipe(
             // startWith(r),
              map((value:any) => {
                const name = typeof value === 'string' ? value : value?.name;

                
               // console.log(value);
               // return value;
             //  console.log(this.selectedSupplierMaterialOptions.slice());
                return value ? this._filter(name as string) : this.selectedSupplierMaterialOptions.slice();
              }),
            );
  


        });
    }

    clearSupplier(){
    
        this.material.supplier_id = null;
        delete this.material.supplier;
        this.resetMaterialCheck();
    }

    createMaterialAttrs() {
        this.newMaterial = !this.newMaterial;
        this.material = {};
        this.lot = {};
        this.creatingMaterial = true;

    }

    selectingMaterialAttrs() {
        this.creatingMaterial = false;
        this.materialChecked = false;
        this.material = {};
        this.lot = {};
        this.newMaterial = false;
    }

    selectLot(obj) {

       // console.log(obj);
        try {
            this.selectedLot = obj;
            this.lot = this.selectedLot;
            this.newLot.lot_name = 'eee';
            this.hideNewLot = true;
            this.lot.isNew = false;

        } catch (e) {
            this.selectedLot = {};
            this.lot = {};
           // this.lot.isNew = true;
            this.newLot = {};
            this.hideNewLot = false;

        }

    }

    newLotname(event) {
        // console.log(event);

        this.lot = this.newLot;
        this.lot.isNew = true;

        if (!this.newLot.lot_name) { this.lot.isNew = false; }


        /// setTimeout(function() {$('#container_denomination').focus(); }, 300);

    }


    updateQCID(container) {
        const params = {};
        container.savedQCID = false;
      //  console.log(container);
        //check for QCID string
        if(container.qcid.includes('QCID'))
        {
            container.qcid = parseInt(container.qcid);
        }
        

        params['qcid'] = container.qcid;

        if (container.id) {
            this.materialLotContainerService.update(params, container.id).subscribe((r) => {


                container.savedQCID = true;
                this.notification.success('It worked!', 'The QCID was updated.', { showProgressBar: false, timeOut: 5000, clickToClose: true });

                // 	this.close();
                // this.router.navigate('/material/container/'+this.container.id);

            });
        }

    }

    updateContainer(field) {
        const params = {};
        params[field.name] = field.value;
        if (this.container.id) { this.materialLotContainerService.update(params, this.container.id).subscribe(); }
	}
	
	updateMaterialSDSRevision() {
	
		const params:any = {};
		//console.log(params);
        params.sds_revision_date = _moment(this.material.sds_revision_date).format('YYYY-MM-DD');
        if (this.material.id) { this.materialService.update(params, this.material.id).subscribe(); }
    }

    validateNewMaterial() {
        if (this.material.name) {
            this.materialStepComplete = true;
            this.lot.isNew = true;
        } else {

            this.materialStepComplete = false;
            this.lot.isNew = false;
        }
    }

    validateForm() {
        // if (!this.material.name) { return false; }
        // 	if (!this.lot.lot_name) { return false; }
        // 	if (!this.container.denomination  || !this.container.amount_ordered || !this.container.location_id) { return false; }
        // || !this.container.gross_weight
        // 	return true;
        return;

    }

    updateCalculatedTare() {
        setTimeout((x) => {

            const substrings = ['kg', 'KG'];

            if (new RegExp(substrings.join('|')).test(this.container.denomination) && this.container.amount_ordered < 10) {
                // At least one match
                this.isWeight = true;
                this.container.calculated_tare = this.container.gross_weight - (this.container.amount_ordered * 1000);
                return true;
            } else {
                this.container.calculated_tare = this.container.gross_weight - this.container.amount_ordered;
                return true;
            }
        }, 200);
    }


    createButton(stepper) {

        this.material.name = this.selectedMaterialname;
        if(confirm('This action will create ' + this.containersToMake + ' container(s) of ' + this.material.name))
        {

            this.createAllTheStuff();
           
			setTimeout(()=>{this.goForward(stepper)},1000);
			this.stuffCreated = true;

        }

     /*    Swal.fire({
            title: 'Creating Container',
            text: 'This action will create ' + this.containersToMake + ' container(s) of ' + this.material.name,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, I want this.'
        }).then((result) => {

            this.createAllTheStuff();
           
			this.goForward(stepper);
			this.stuffCreated = true;
        }); */

    }

    createAllTheStuff(createNewMaterial = true, onlyCreateContainer = false) {

        
        if (this.creatingMaterial && this.lot.isNew) {
            this.materialService.create(this.material).subscribe((material) => {
                this.material.id = material.id;
                this.lot.slip_material_id = material.id;

                this.materialLotService.create(this.lot).subscribe((lot_response) => {

                 //   console.log(lot_response);
                    this.container.lot_id = lot_response.id;
                    for (let index = 0; index < this.containersToMake; index++) {
                        this.materialLotContainerService.create(this.container).subscribe((container) => {
                            this.createdContainers.push(container);
                        //    console.log(this.createdContainers);
                            this.container = container;
                            this.codeRegistryStep = true;
                            this.materialCreationStep = false;
                            this.createdContainers = this.createdContainers;
                        });
                    }

                  
                });
            });
            return;

        }
        if ((!this.creatingMaterial && this.lot.isNew) ) {
            this.lot.slip_material_id = this.material.slip_material_id;
            this.material.id = this.material.slip_material_id;
            this.materialLotService.create(this.lot).subscribe((response) => {
                this.container.lot_id = response.id;
                if (this.container.container_received) { this.container.container_received = _moment(this.container.container_received).format('YYYY-MM-DD'); }
                for (let index = 0; index < this.containersToMake; index++) {
                this.materialLotContainerService.create(this.container).subscribe((container) => {
                    this.createdContainers.push(container);
                    this.createdContainers = this.createdContainers;
                 //   console.log(this.createdContainers);
                    this.container = container;
                    this.codeRegistryStep = true;
                    this.materialCreationStep = false;
                });
              }
            });
       
            return;

        }

        ///// Only new container.
        this.container.lot_id = this.lot.id;
        if (this.container.container_received ) { this.container.container_received = _moment(this.container.container_received).format('YYYY-MM-DD'); }
      //  console.log(this.container);
                for (let index = 0; index < this.containersToMake; index++) {
                this.materialLotContainerService.create(this.container).subscribe((response) => {
                    this.createdContainers.push(response);
                    this.createdContainers = this.createdContainers;
                //    console.log(this.createdContainers);
                    this.container = response;
                    this.codeRegistryStep = true;
                    this.materialCreationStep = false;


                });
            }
        return;

    }

    checkIfWeight() {
        this.isWeight = false;
        const substrings = ['g', 'kg', 'KG', 'ml', 'L', 'l'];

        if (new RegExp(substrings.join('|')).test(this.container.denomination)) {
            this.isWeight = true;

            return true;
        }
        return false;
    }

    goForward(stepper: MatStepper) {
        stepper.next();
    }

    goBack(stepper: MatStepper) {
        stepper.previous();
    }




    /*** File Drop ***/

    public dropped(files: NgxFileDropEntry[]) {
        // this.files = event.files;
        for (const droppedFile of files) {

            if (droppedFile.fileEntry.isFile) { // is it a file?
                const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
                fileEntry.file((file: File) => {

                    // You could upload it like this:
                    const formData = new FormData();
                    formData.append('sds', file);

                    // Headers
                    const headers = new HttpHeaders({

                    });

                    this.http.post(environment.apiUrl + '/material/' + this.material.id + '/sds', formData, { headers: headers })
                        .subscribe(response => {

                                this.material = response;
                                this.files = [];
                                this.fetchSDS();
                            },
                            error => {
                                this.notification.error('Error', error.error.error, { showProgressBar: false, timeOut: 5000, clickToClose: true });
                                this.files = [];
                            });


                });
            } else {
                // It was a directory (empty directories are added, otherwise only files)
                this.notification.error('Error', 'You can only upload a pdf file.', { showProgressBar: false, timeOut: 3000, clickToClose: true });
                this.files = [];

            }
        }
    }

    public fileOver(event) {
        console.log(event);
    }

    public fileLeave(event) {
        console.log(event);
    }


    fetchSDS() {

        if (this.showSDS) { this.showSDS = false; }

        this.http.get(environment.apiUrl + '/material/' + this.material.id + '/sds', { responseType: 'blob' }).subscribe((response) => {

            this.sdsBlob = response;
            this.showSDS = true;
            this.showSDSError = false;
            this.SDSurl = window.URL.createObjectURL(response);
            const ifr = document.getElementById('iframe') as HTMLIFrameElement;

            if (ifr) {
                ifr.contentWindow.location.replace(this.SDSurl);
            }

        }, (error) => {
            this.showSDS = false;
            this.showSDSError = true;
            this.notification.error('Problem', 'There was an issue trying to display the SDS.', { showProgressBar: false, timeOut: 5000, clickToClose: true });


        });

    }

	openHazardDialog(): void {
		const dialogRef = this.dialog.open(MaterialHazardSymbolSelectorComponent, {
		  width: '80vw',
		  position: {bottom:'50px'},
		  data: this.material
		});
	
		dialogRef.afterClosed().subscribe(result => {
		  console.log('The dialog was closed');
		  this.material = result;
		});
      }
      
      checkMaterialExistence(stepper:MatStepper){

        console.log('test');
        console.log(this.material);
        const requestParams: HttpParams = new HttpParams()
        .append('name', `${this.material.name}`)
        .append('grade', `${this.material.grade}`)
        .append('limit', `10`)
        .append('supplier_id', this.material.supplier_id);

        this.http.get(environment.apiUrl + '/material', { params: requestParams })
        .subscribe((response:any) => {

                this.checkIfDirectMatch = false;

                if(response.data.length > 0)
                {
                    this.materialCheckedOkay = false;
                    // check if name, grade and supplier_id match; set material, move on
                    response.data.forEach(materialChecked => {
                            if(this.material.name === materialChecked.name 
                                && this.material.grade === materialChecked.grade
                                 && this.material.supplier_id === materialChecked.supplier_id )
                                 {
                                     this.material = materialChecked;
                                     this.checkIfDirectMatch = true;
                                     this.creatingMaterial = false;
                                     this.materialChecked = true;
                                     this.newMaterial = false;
                                     this.lot.isNew = false;
                                     this.goForward(stepper);
                                     //go to lot step
                                 }
                    });

                    
                    // trigger some sort of material selection dialog. give it the data, return a selection.
                    
                    if(!this.checkIfDirectMatch)
                    {
                    const dialogRef = this.dialog.open(MaterialCheckCreationDialogComponent, {

                        // disableClose: true,
                          width: 'auto',
                          autoFocus: true,
                          position: {'top': '50px'},
                           data: response.data,
                        });
                  
                        dialogRef.afterClosed().subscribe((result) => {
                            
                            if (result) {
                                this.material = result;
                                this.newMaterial = false;
                                this.lot.isNew = false;
                            }

                            this.materialChecked = true;
                  
                        });
                    }



                }
                else
                {
                    this.materialCheckedOkay = true;
                    this.materialChecked = true;
                    this.hideMaterialCheckBox = true;
                }
                

        });

      
    }

    resetMaterialCheck()
    {
        this.materialChecked = false;
        this.materialCheckedOkay = false;
        this.hideMaterialCheckBox = false;
    }


    ngOnDestroy() {

        //  this.materialLotContainerDatatable.getMaterialLotContainerDatatable({draw:1,length:20, start:0},true);
        this.websocket.redirectOnScan = true;
        this._ws.unsubscribe();
        this._wsk.unsubscribe();

    }


    shouldHighlight(text)
    {
       


        if(!text) return false;
        if(text.length > 1){
        let compare = text.toLowerCase();
        if(compare.startsWith(this.materialSearchFilterValue.toLowerCase())) return true;
        }
        return false;
    }

}