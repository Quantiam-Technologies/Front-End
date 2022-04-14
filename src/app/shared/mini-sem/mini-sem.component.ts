import { Component, OnInit,Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NotificationsService } from 'angular2-notifications';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-mini-sem',
  templateUrl: './mini-sem.component.html',
  styleUrls: ['./mini-sem.component.css']
})
export class MiniSemComponent implements OnInit {

  @Input() semRunId:any = null; 

  constructor(  private http: HttpClient,
  private notification: NotificationsService,) { }

  ngOnInit() {
  }

}
