import { Injectable, HostListener } from '@angular/core';
import {Observable, Subject, Observer, BehaviorSubject} from 'rxjs';
import { NotificationsService } from 'angular2-notifications';
import { catchError, map, tap, delay, share } from 'rxjs/operators';

import { SettingsService } from '../../services/settings/settings.service';

import { Router } from '@angular/router';



@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  private url = 'ws://api.edm.quantiam.com:8081';

  private subject: Subject<MessageEvent>;
  private subjectData: Subject<number>;
  private codeObj: any;
  private randomNumber = Math.random();
  public observable: any;
  public scannerEvents: any;
  public scanned$: any;
  public _keyBoardSubject = new BehaviorSubject({});
  public keyboardObservable: Observable<any> = this._keyBoardSubject.asObservable();
  ws: any;

//  public _wsSource = new BehaviorSubject({});
 // public ws$: Observable<any> = this._wsSource.asObservable();


  public selectableScanners = [{'text': 'None', id: 0}, {'text': 'QAQC', id: 1}, {'text': 'Powders', id: 2}, {'text': 'Slipcasting', id: 3}, {'text': 'Furnaces', id: 4}];
  public selectableScales = [{'text': 'None', id: 0}, {'text': 'Powders', id: 1}, {'text': 'Slipcast', id: 2}, {'text': 'SGX', id: 3}];
  public selectedScanner: any;


  private prefixNavigationMap = {
    'QCID': '/material/container/QCID-',
    'QMSMLC': '/material/container/',
    'QMSML': '/material/lot/',
    'QMIM': '/material/',
	'QMIS': '/steel/',

  };

	public redirectOnScan = true; // will a scan event trigger a redirect?

	private id_string = '';
	private last_key_name;
	private lastKeyPressTime;
	private triggerTimeout = false;
	private keypressIncrement = 0;
	private lastKeypressCh = '';
	private timeout;




  constructor(
	public router: Router,
	private notification: NotificationsService,
	private settings: SettingsService,
	) {

		this.selectedScanner = settings.get('selectedScanner');
		this.lastKeyPressTime = Date.now();

		window.addEventListener('keydown', (event) => {
			// console.dir(event);
			 const keypressTime =  Date.now();
			this.identifyScannedObjectKeyboardInput (event.key, keypressTime);


	  });

		this.connect();


	}


	public toggleRedirectOnScan() {
		this.redirectOnScan = !this.redirectOnScan;
	}
	// For chat box
	public connect() {


				// Raw Data
				this.observable = Observable.create((observer) => {
				this.ws = new WebSocket(this.url);

				this.ws.onopen = (e) => {
					console.log('Websocket Connected', this.url);
				};

				this.ws.onclose = (e) => {
				  if (e.wasClean) {
					observer.complete();
				  } else {
					observer.error(e);
				  }
				};

				this.ws.onerror = (e) => {
				  observer.error(e);
				};

				this.ws.onmessage = (e) => {
				// console.log(e);
					const r = JSON.parse(e.data);
					//console.log(r);
					observer.next(r);
				};

				return () => {
				  this.ws.close();
				};
			  }).pipe(share());



				this.scannerEvents = Observable.create((observer) => {
				this.ws = new WebSocket(this.url);

				this.ws.onopen = (e) => {
					console.log('Websocket Connected', this.url);

				};

				this.ws.onclose = (e) => {
				  if (e.wasClean) {
					observer.complete();
				  } else {
					observer.error(e);
				  }
				};

				this.ws.onerror = (e) => {
				  observer.error(e);
				};

				this.ws.onmessage = (e) => {
					const r = JSON.parse(e.data);
				   try {  // Redirect user to specific screen based on scan event.
						
						const scannerResponse = r;
						if (scannerResponse.type === 'Scanner') {

						   console.log('Scanner Response', scannerResponse, this.redirectOnScan);

							const parsed: any = this.parseScannerCode(r.data);
							r.prefix = parsed.prefix;
							r.id = parsed.id;

							observer.next(r);


						   this.notification.info('Scanner Event', scannerResponse.data, {timeOut: 3000, showProgressBar: false, clickToClose: true});

						   if (this.redirectOnScan && scannerResponse.machine.name === this.selectedScanner.text) {
							 this.redirectOnScanFn(scannerResponse.data);


						   }
						}

					} catch (e) {}


				};

				return () => {
				  this.ws.close();
				};
			  }).pipe(share());

	}

 redirectOnScanFn(scannedString) {
  if (this.redirectOnScan) {
    const codeObj: any = this.parseScannerCode(scannedString);

							  const selectedRoute: any = this.prefixNavigationMap[codeObj.prefix];
						if (scannedString.length > 5) {	  this.router.navigate([selectedRoute + codeObj.id], {queryParams: {scannerNavigation: true}}).catch(error => {

								 this.notification.error('Redirect Not Registered', scannedString, {timeOut: 3000, showProgressBar: false, clickToClose: true});
							});
						}
  }
 }



  parseScannerCode (code) {
    try {
        const explode = code.split('-');
        const r = {};
        r['prefix'] = explode[0];
        r['id'] = explode[1];
        return r;

    } catch (e) {

    return false;

    }


  }


 public identifyScannedObjectKeyboardInput(ch, keypressTime) {


	// console.log(ch,keypressTime,this.lastKeyPressTime);
	if (this.lastKeyPressTime) {
		const calc = keypressTime - this.lastKeyPressTime;

		if (calc < 50) {

			if (!this.keypressIncrement) { this.id_string = this.id_string + this.lastKeypressCh; }
			if (ch !== 'Shift' && ch !== 'Enter') { this.id_string = this.id_string + ch; }


				clearTimeout(this.timeout);
				if (this.id_string.indexOf('-') > -1) {

				this.timeout = setTimeout(() => {

							const message = this.id_string.replace('Shift', '');
							// console.log('timeout thing',message);


							this._keyBoardSubject.next(message.toUpperCase());
							this.redirectOnScanFn(message.toUpperCase());


							this.id_string = '';
							this.keypressIncrement = 0;



					}, 400);
				}
			this.keypressIncrement++;
		}
	}

	// if(triggerTimeout) setTimeout

	this.lastKeyPressTime = keypressTime;
	this.lastKeypressCh = ch;
}






}
