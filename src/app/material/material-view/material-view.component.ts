import { Component, OnInit, OnDestroy } from '@angular/core';
import { MaterialService } from '../../services/material/material.service';
import { ActivatedRoute, Router, Params,RoutesRecognized  } from '@angular/router';
import { catchError, map, tap,delay } from 'rxjs/operators';
import { Subject } from 'rxjs';



@Component({
  selector: 'app-material-view',
  templateUrl: './material-view.component.html',
  styleUrls: ['./material-view.component.css']
})
export class MaterialViewComponent implements OnInit {

  _material:any = null;
  
  material = {} as any;
  renderView: boolean = false;

  constructor(private materialService: MaterialService,private route: ActivatedRoute, private router: Router ) { }

  ngOnInit() {
   
    let id  = this.route.snapshot.params['id'];  //obtain ID from route   
      console.log(id);
       this.materialService.getMaterial(id);  // fetch the material belonging to this id
      
      this._material = this.materialService.material$.subscribe(res=> { //subscribe to the material service for updates
     
        if(typeof res !== 'undefined') this.material = res;
        console.log(this._material, res);
       
       });
    
    
     
     // setInterval(function(){     this.},2000);
     
  }
  
  
  updateMaterial(field){
  
    var params = {};
    params[field.name] =  field.value;
    this.materialService.updateMaterial(params);
  
  }
  
  
  ngOnDestroy()
  {
    this._material.unsubscribe();
    
  }
}
