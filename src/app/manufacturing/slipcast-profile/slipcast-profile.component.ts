import { Component, OnInit,Input } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import {FormBuilder, FormControl, FormGroup,Validators} from '@angular/forms';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-slipcast-profile',
  templateUrl: './slipcast-profile.component.html',
  styleUrls: ['./slipcast-profile.component.css']
})
export class SlipcastProfileComponent implements OnInit {

  movies = [
    'Episode I - The Phantom Menace',
    'Episode II - Attack of the Clones',
    'Episode III - Revenge of the Sith',
    'Episode IV - A New Hope',
    'Episode V - The Empire Strikes Back',
    'Episode VI - Return of the Jedi',
    'Episode VII - The Force Awakens',
    'Episode VIII - The Last Jedi',
    'Episode IX – The Rise of Skywalker'
  ];

  @Input() slipcastProfile;


  constructor() { }

  ngOnInit(): void {
  }

  fetchSlipcastProfile (){

  }

  
  drop(event: CdkDragDrop<[]>) {
    moveItemInArray(this.movies, event.previousIndex, event.currentIndex);
  }

}
