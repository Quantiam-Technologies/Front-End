import { Component, OnInit, Input, EventEmitter, Output, } from '@angular/core';

@Component({
  selector: 'app-select-hazard',
  templateUrl: './select-hazard.component.html',
  styleUrls: ['./select-hazard.component.css']
})
export class SelectHazardComponent implements OnInit {

  constructor() { }


    // Inputs
    @Input() selectedHazards: any = null; // default value, object or ID
    @Input() appendTo = 'body'; // multi version

    // Outputs
    @Output() change = new EventEmitter<any>();
    @Output() clear = new EventEmitter<any>();


  hazards:any = [
      {
        'id': 1,
        'name': 'Biohazardous',
        'filename': 'biohazardous.png',
        'created_at': null,
        'updated_at': null,
        'laravel_through_key': 941,
        'url': 'http://api.edm.quantiam.com/images/hazard_symbols/biohazardous.png'
      },
      {
        'id': 2,
        'name': 'Corrosive',
        'filename': 'corrosion.png',
        'created_at': null,
        'updated_at': null,
        'laravel_through_key': 941,
        'url': 'http://api.edm.quantiam.com/images/hazard_symbols/corrosion.png'
      },
      {
        'id': 3,
        'name': 'Environment',
        'filename': 'environment.png',
        'created_at': null,
        'updated_at': null,
        'laravel_through_key': 941,
        'url': 'http://api.edm.quantiam.com/images/hazard_symbols/environment.png'
      },
      {
        'id': 4,
        'name': 'Exclamation Mark',
        'filename': 'exclamation_mark.png',
        'created_at': null,
        'updated_at': null,
        'laravel_through_key': 941,
        'url': 'http://api.edm.quantiam.com/images/hazard_symbols/exclamation_mark.png'
      },
      {
        'id': 5,
        'name': 'Exploding Bomb',
        'filename': 'exploding_bomb.png',
        'created_at': null,
        'updated_at': null,
        'laravel_through_key': 941,
        'url': 'http://api.edm.quantiam.com/images/hazard_symbols/exploding_bomb.png'
      },
      {
        'id': 6,
        'name': 'Flame',
        'filename': 'flame.png',
        'created_at': null,
        'updated_at': null,
        'laravel_through_key': 941,
        'url': 'http://api.edm.quantiam.com/images/hazard_symbols/flame.png'
      },
      {
        'id': 7,
        'name': 'Flame over Circle',
        'filename': 'flame_circle.png',
        'created_at': null,
        'updated_at': null,
        'laravel_through_key': 941,
        'url': 'http://api.edm.quantiam.com/images/hazard_symbols/flame_circle.png'
      },
      {
        'id': 8,
        'name': 'Gas Cylinder',
        'filename': 'gas_cylinder.png',
        'created_at': null,
        'updated_at': null,
        'laravel_through_key': 941,
        'url': 'http://api.edm.quantiam.com/images/hazard_symbols/gas_cylinder.png'
      },
      {
        'id': 9,
        'name': 'Health Hazard',
        'filename': 'health_hazard.png',
        'created_at': null,
        'updated_at': null,
        'laravel_through_key': 941,
        'url': 'http://api.edm.quantiam.com/images/hazard_symbols/health_hazard.png'
      },
      {
        'id': 10,
        'name': 'Skull and Cross Bones',
        'filename': 'skull_crossbones.png',
        'created_at': null,
        'updated_at': null,
        'laravel_through_key': 941,
        'url': 'http://api.edm.quantiam.com/images/hazard_symbols/skull_crossbones.png'
      }
    

  ];

    onChange(event) { this.change.emit(event); }
    onAdd(event) { }
    onRemove(event) { }
    onClear() {

      this.clear.emit();
    }

  ngOnInit() {
  }

}
