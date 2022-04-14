import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-typescriptmodelformatter',
  templateUrl: './typescriptmodelformatter.component.html',
  styleUrls: ['./typescriptmodelformatter.component.css']
})
export class TypescriptmodelformatterComponent implements OnInit {

  inputString;
  exportString;

  constructor() { }

  ngOnInit(): void {
  }


  convertToModelFormat ()
  {
    this.exportString = null;
    let split = this.inputString.split(',');
    
    split.forEach((text,index) => {
     
      this.exportString =  this.exportString+"'"+text.trim()+"': ;\n";
    });
    

  }

}
