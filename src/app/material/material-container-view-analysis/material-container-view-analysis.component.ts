import { Component, OnInit } from '@angular/core';
import { MaterialLotContainerService } from '../../services/material-lot-container/material-lot-container.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-material-container-view-analysis',
  templateUrl: './material-container-view-analysis.component.html',
  styleUrls: ['./material-container-view-analysis.component.css']
})
export class MaterialContainerViewAnalysisComponent implements OnInit {

  constructor(
    private materialLotCotainerService: MaterialLotContainerService,
    private route: ActivatedRoute,
    ) { }

  _container: any;
  container: any;

  selectedXrdRun;

  ngOnInit() {

    this.route.params.subscribe((p) =>{
       this.materialLotCotainerService.getMaterialLotContainer(p['id']).subscribe(res => {});
  })

    this._container = this.materialLotCotainerService.materialLotContainer$.subscribe(res => { // subscribe to the material service for updates

      this.container = res;

      if(this.container.xrd_runs)
      {
        this.selectedXrdRun = this.container.xrd_runs[0];
      }
     
     }, (error: any) => {
 
     });
  }

  changeAnalysis()
  {
    
  }

}
