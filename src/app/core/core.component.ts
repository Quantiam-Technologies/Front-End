
import { Component, ChangeDetectorRef, OnInit, AfterViewInit, OnDestroy  } from '@angular/core';
import { Location} from '@angular/common';
import { FormBuilder, FormGroup} from '@angular/forms';
import { MediaMatcher } from '@angular/cdk/layout';
import { AuthService } from '../services/auth/auth.service';
import { UserService } from '../services/user/user.service';
import { TimesheetService } from '../timesheet/timesheet.service';
import { catchError, map, tap, delay } from 'rxjs/operators';
import {
  Router,  NavigationCancel,   NavigationEnd, NavigationStart
} from '@angular/router';

//import { fadeAnimation } from '../animations';

import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { PatchNotesComponent } from './patch-notes/patch-notes.component';

import { WebsocketService } from '../services/websocket/websocket.service';
import { SettingsService } from '../services/settings/settings.service';


import { faCoffee, faMicroscope, faBolt, faFlask, faXRay, 
  faFireAlt, faPlaneDeparture, faHatWizard, faPaste, faCog, 
  faPiggyBank, faChartLine, faJournalWhills, faUserFriends, faPallet, faSitemap, faUserTimes, faDraftingCompass, faWrench, faExclamationCircle, faBraille, faSun } from '@fortawesome/free-solid-svg-icons';
import { faCalendar, faClock } from '@fortawesome/free-regular-svg-icons';
import { faAngular, faGithub, faFontAwesome, faLaravel } from '@fortawesome/free-brands-svg-icons';


import { HttpClient  } from '@angular/common/http';
import { environment } from '../../environments/environment';


interface WebSocketMessages {

}


@Component({
  selector: 'app-core',
  templateUrl: './core.component.html',
  styleUrls: ['./core.component.css'],
   providers: [
      MediaMatcher,
      UserService,
  ],
  //animations: [fadeAnimation] // register the animation
})


export class CoreComponent implements OnInit, OnDestroy {


  // Icons
  faLaravel = faLaravel;
  faPlaneDeparture = faPlaneDeparture;
  faFireAlt = faFireAlt;
  faXRay = faXRay;
  faFlask = faFlask;
  faBolt = faBolt;
  faMicroscope = faMicroscope;
  faFontAwesome = faFontAwesome;
  faGithub = faGithub;
  faAngular = faAngular;
  faClock = faClock;
  faCalendar = faCalendar;
  faCoffee = faCoffee;
  faHatWizard = faHatWizard;
  faPaste = faPaste;
  faCog = faCog;
  faPiggyBank = faPiggyBank;
  faChartLine = faChartLine;
  faJournalWhills = faJournalWhills;
  faUserFriends = faUserFriends;
  faPallet = faPallet;
  faSitemap = faSitemap;
  faUserTimes = faUserTimes;
  faDraftingCompass = faDraftingCompass;
  faWrench = faWrench;
  faExclamationCircle = faExclamationCircle;
  faBraille = faBraille;
  faSun = faSun;


  title = 'app';
  version = '';
  user: any = {};
  userLoaded = false;
  userTitle: null;
  userName: null;
  selectedScanner;
  initializeScanner = false;
  scannerList = [];
  loading;
  showUserSwitch = false;
  timesheetYear = '';
  timesheetUser = null;
  timesheetPayperiod = null;
  hasSwitchedUser = false;
  devTokenFound = false;

  menuCollapseState = {}; //locally saved collapse state

  currentYear = (new Date()).getFullYear();
  currentTimesheet = {userId: '', year: '', payperiod: ''};

  webSocketMessages: WebSocketMessages;
  lastWebSocketMessage;
  _ws;
  _wsk;
  _scannerEvents: any;

  isAdmin = false;


	options: FormGroup;
	mobileQuery: MediaQueryList;
	private _mobileQueryListener: () => void;


  constructor(
		fb: FormBuilder,
		changeDetectorRef: ChangeDetectorRef,
		media: MediaMatcher,
		public userService: UserService,
		private auth: AuthService,
		private websocketService: WebsocketService,
		private settings: SettingsService,
    private _location: Location,
    private router: Router,
    private http: HttpClient,
    private timesheetService: TimesheetService,
    private dialog: MatDialog,

	) {

    this.loading = true;


	this.getScanner();


    this.mobileQuery = media.matchMedia('(max-width: 600px)');
      this._mobileQueryListener = () => changeDetectorRef.detectChanges();
      this.mobileQuery.addListener(this._mobileQueryListener);

      this.options = fb.group({
        'fixed': false,
        'top': 0,
        'bottom': 0,
      });

     // get user data and store in user Variable
      this.userService.getAuthedUser().subscribe(res => {



              this.user = res;
              this.userLoaded = true;

              this.adminCheck();

		//   console.log(this.userService.hasPermission(38));

        });

      // this.user.getUser
  }

  ngOnInit(): void {
    // Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    // Add 'implements OnInit' to the class.

     this.loading = false;
      this.timesheetService.currentTimesheet.subscribe(obj => {
          this.currentTimesheet.userId = obj.userId;
          this.currentTimesheet.year = obj.year;
          this.currentTimesheet.payperiod = obj.payperiod;
    });


    if (localStorage.getItem('devToken')) {
      this.devTokenFound = true;
    }


    // Change Log trigger
    this.http.get('CHANGELOG.md', {responseType: 'text', observe: 'response'}).subscribe((r: any) => {

      const etag = localStorage.getItem('PatchNotes_ETag');

      let split = r.body.split('\r\n# ');
      let thing = split[2].split(' ');
      let thing2 = thing[0].split('\r\n');
      this.version = thing2[0];
       split = null;
       thing = null;
       thing2 = null;

      if (etag !== r.headers.get('ETag')) {
        localStorage.setItem('PatchNotes_ETag', r.headers.get('ETag'));
        this.openPatchNotes(r.body);
      }
    }, (e) => {


    });


    //retrieve menu settings 

    this.menuCollapseState = this.settings.get('menuCollapseState');

  }

  prepareRoute(outlet) {
    return true;
  }


  adminCheck() {
	const adminPermissionArray = [27, 28, 5, 6, 7, 8, 9]; // permission which allow you to see the admin side menu


	for (let i = 0; i < adminPermissionArray.length; i++) {


			if (this.userService.hasPermission(adminPermissionArray[i])) {
				// console.log(r);
				this.isAdmin = true;
				return;
			}
		}




  }

  logout() {


      this.auth.logout();

  }

  updateScanner(obj) {

	this.selectedScanner = obj.data[0];
	this.settings.set('selectedScanner', this.selectedScanner);
	this.websocketService.selectedScanner = this.selectedScanner;

  }

  getScanner() {
    this.scannerList = this.websocketService.selectableScanners; // set the selectable list of scanners.
    const savedScanner = this.settings.get('selectedScanner');
   // console.log(savedScanner);
    if (savedScanner && savedScanner.id) {
      this.selectedScanner = this.settings.get('selectedScanner');
    } else {
      this.selectedScanner = this.websocketService.selectableScanners[0];
    }

  }

  backClicked() {
        this._location.back();
    }
   forwardClicked() {
        this._location.forward();
    }



  connectScannerService() {
    if (this.initializeScanner) {
    this._scannerEvents = this.websocketService.scannerEvents.subscribe((data) => {});

    this.router.events
          .subscribe((event) => {


              if (event instanceof NavigationStart) {
                  this.loading = true;

              } else if (

                  event instanceof NavigationCancel ||
                  event instanceof NavigationEnd
                  ) {
                           setTimeout((x) => {  this.loading = false; }, 500);
                      }
          });
        }
  }

   ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
	   if (this._ws) { this._ws.unsubscribe(); }
  }


  changeUser(event) {
   // console.log(event);
    this.userService.getAuthedUser(event.id).subscribe(r => {


     this.userService.fetchAuthUserObj();
     this.user = r;
     this.userLoaded = true;
     this.hasSwitchedUser = true;

     this.http.get<any>(environment.apiUrl + `/user/token/${event.id}?filterSpinner`)
		 .subscribe(r2 => {

      // console.log(r2); //

      localStorage.setItem('devToken', localStorage.getItem('token'));
      localStorage.setItem('token', r2.token);
      window.location.reload();

     // this.settings.set('devToken', this.settings.get('token'));
     // this.settings.set('token',r2);



     });

     this.adminCheck();

    });
  }


  openPatchNotes(patchNotes = null) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '1000px';
   // dialogConfig.height = '90vh';
    dialogConfig.position = {'top': '50px'};
    dialogConfig.data = patchNotes;
    const dialogRef = this.dialog.open(PatchNotesComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
    //  console.log('The dialog was closed');
       // console.log(result);
        // save the notes as viewed
    });

  }

}
