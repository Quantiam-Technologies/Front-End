import { Component, OnInit,ChangeDetectorRef } from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [
  MediaMatcher,
  ],
})
export class HeaderComponent implements OnInit {

  sidenav;
  title = 'app';
	options: FormGroup;	
	mobileQuery: MediaQueryList;
	private _mobileQueryListener: () => void;	
	//
  ngOnInit() {
  }

  constructor(fb: FormBuilder,changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
  
	this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  
    this.options = fb.group({
      'fixed': false,
      'top': 0,
      'bottom': 0,
    });
  }
  
   ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
}



