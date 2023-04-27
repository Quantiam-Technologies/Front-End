import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MatLegacyTableDataSource as MatTableDataSource } from '@angular/material/legacy-table';
import { Router, ActivatedRoute } from '@angular/router';
import { SampleService } from '../../services/sample/sample.service';
import { SampleContainerService } from '../../services/sample-container/sample-container.service';
import { SampleCommentService } from '../../services/sample-comment/sample-comment.service';

import { MaterialLotContainerService } from '../../services/material-lot-container/material-lot-container.service';
import { WebsocketService } from '../../services/websocket/websocket.service';
import { NotificationsService } from 'angular2-notifications';

import { SgxScaleWebsocketService } from '../../services/sgx-scale-websocket/sgx-scale-websocket.service';


@Component({
  selector: 'app-sample-view',
  templateUrl: './sample-view.component.html',
  styleUrls: ['./sample-view.component.css']
})
export class SampleViewComponent implements OnInit {

   sample_: any;
   scanEvent_: any;
   sample: any = {};
   id: any;
   ws_: any;
   scanContainer = true;
   editContainer = false;
   containerDataSource;

  // Comments

   commentContent: string;
   oldCommentContent: string;

  // Measuring

   wasZero = false;
   measuredContainerIndex: any;
   activeContainer: any;

  // Scale Integration

   sgxScale: any;
   currentScaleValue: number;
   lastScaleResponse: any;
   scaleConnected = false;
   websocketScannerEventSubscription_: any;


   displayedColumns = ['container', 'material', 'measured', 'measured_at', 'actions', ];
//
  // 'measured_required','measured_tolerance','measured_by','measured_at']

  constructor(
  public sampleService: SampleService,
  public router: Router,
  private websocketService: WebsocketService,
  private route: ActivatedRoute,
  private containerService: MaterialLotContainerService,
  private changeDetectorRefs: ChangeDetectorRef,
  private  sgxScaleService: SgxScaleWebsocketService,
  public notification: NotificationsService,
  private sampleContainerService: SampleContainerService,
  private sampleCommentService: SampleCommentService


  ) { }

  ngOnInit() {




      this.id  = this.route.snapshot.params['id'];  // obtain ID from route
      this.sampleService.get(this.id); // ask teh service to fetch the sample
      this.sample_ = this.sampleService.sample$.subscribe((r) => { // subscribe to any updates.

        this.sample = r;
        this.containerDataSource =  new MatTableDataSource(this.sample.containers);

      });


     this.startScannerListen();
     this.sgxScale = this.sgxScaleService.connect();
     this.subscribeToSgxScale();

  }


  subscribeToSgxScale() {
    this.sgxScale.subscribe(res => {

      this.scaleConnected = true;

      try {
            const data = JSON.parse(res.data);
            console.log(data);
          try {
                if (data.machine) { this.lastScaleResponse = data; }
          } catch (e) {}

          } catch (e) {}

    });

  }

  startScannerListen() {
     this.websocketService.redirectOnScan = false;
     this.websocketScannerEventSubscription_ = this.websocketService.scannerEvents.subscribe((r) => {		// subscribe to scanner events

        r.prefix == 'QCID' ? this.scanContainerIn(r.data) : this.scanContainerIn(r.id);

      });



  }

  scanContainerIn(id) {
    if (!this.websocketService.redirectOnScan && this.scanContainer) {

      if (!this.activeContainer) {
        this.scanEvent_ = this.containerService.fetch(id).subscribe((r) => {

                const obj = this.sample.containers.find(o => o.container.id === r.id);

              if (!obj) {


                const params = {

                sample: this.sample.id,
                container: r.id,

                };

                this.sampleContainerService.create(params).subscribe((r) => {

                      this.sample.containers.push(r);

                      // this.activeContainer.sampleContainerId = r.id;

                      this.containerDataSource.data = this.sample.containers;
                      this.activeContainer = r;


                  });





             } else {
               this.notification.error('Error', 'This container is already here', {showProgressBar: false, timeOut: 3000, clickToClose: true});
              }
             // this.changeDetectorRefs.detectChanges();
               console.log(this.containerDataSource.data);
              // add to the sample array, refresh the sample
                // this.sampleService.get(this.sample.id,true);
          });
      }


        if (this.activeContainer) {
            this.sampleContainerService.update(this.activeContainer.id, {measured: this.lastScaleResponse.data.value }).subscribe((r) => {

                const index = this.sample.containers.findIndex(x => x.id == this.activeContainer.id );

                this.sample.containers[index].measured = r.measured;

                // this.containerDataSource.data = this.sample.containers;
                delete this.activeContainer;

            });
            // get sampleContainer ID
            // this.updateSampleContainer()
        }
    }


  }

  updateSampleContainer(sampleContainer) {
    this.sampleContainerService.update(sampleContainer.id, sampleContainer).subscribe((r) => {

            console.log(r);
       if (this.activeContainer) { delete this.activeContainer; }

      });

  }

 updateMeasured(sampleContainer) {


    this.sampleContainerService.update(sampleContainer.id, {'measured': sampleContainer.measured}).subscribe((r) => {

    });

 }

 createSampleComment() {


     this.sampleCommentService.create({'content': this.commentContent, 'sample': this.sample.id}).subscribe((r) => {

        this.sample.comments.push(r);
        delete  this.commentContent;


    });


 }

 updateSampleComment(index) {

     this.sampleCommentService.update(this.sample.comments[index].id, {'content': this.sample.comments[index].content}).subscribe((r) => {


        this.sample.comments[index] = r;
        delete this.oldCommentContent;


    });

 }

 deleteSampleComment(index) {
    if (confirm('Are you sure you want to delete this comment')) {

       this.sampleCommentService.delete(this.sample.comments[index].id).subscribe((r) => {

          this.sample.comments.splice(index, 1);


      });

    }
 }



 deleteSampleContainer(container) {
    console.log(container);
    if (confirm('Are you sure you want to delete this?')) {
       // send http, update table
        const index = this.sample.containers.findIndex(x => x.id == container.id );

       this.sampleContainerService.delete(container.id).subscribe((r) => {


            if (this.activeContainer && (this.activeContainer.id == this.sample.containers[index].id)) { delete this.activeContainer; }

            this.sample.containers.splice(index, 1);

            this.containerDataSource.data = this.sample.containers;




      });


    }

  }

  updateSampleContainerField(measuredWeight) {

  }

  ngOnDestroy() {
    this.websocketService.redirectOnScan = true; // make sure redirect is back on
    this.sample_.unsubscribe();
    this.websocketScannerEventSubscription_.unsubscribe();
    this.sgxScale.unsubscribe();
    if (this.scanEvent_) { this.scanEvent_.unsubscribe(); }
  }

}
