import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-material-settings',
  templateUrl: './material-settings.component.html',
  styleUrls: ['./material-settings.component.css']
})
export class MaterialSettingsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    console.log("triggered");
  }

}
