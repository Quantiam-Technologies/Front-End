import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MaterialLotContainerService } from '../../services/material-lot-container/material-lot-container.service';


@Component({
  selector: 'app-material-container-log',
  templateUrl: './material-container-log.component.html',
  styleUrls: ['./material-container-log.component.css']
})
export class MaterialContainerLogComponent implements OnInit {

  constructor(
    private materialLotCotainerService: MaterialLotContainerService,
    private route: ActivatedRoute,
    ) { }

    selectedRouteParams;
    loadLogs = false;
    container;

    ngOnInit() {

      this.route.params.subscribe((p) => {


        this.materialLotCotainerService.getMaterialLotContainer(p['id']).subscribe(res => {

          this.container = res;
          this.selectedRouteParams = [{material_container: res.id }, {material: res.lot.material.id}];
         // console.log(this.containerlogObject);

          this.loadLogs = true;

    });

  });

}


}
