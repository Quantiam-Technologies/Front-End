
import { Injectable } from '@angular/core';
import {Observable, Subject, Observer} from 'rxjs';
import {share} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SgxScaleWebsocketService {

  private socketUrl = 'ws://localhost:4201';
 // private socketUrl = 'ws://api.edm.quantiam.com:8081';
 
  private subject: Subject<MessageEvent>;
	private subjectData: Subject<number>;

	// For chat box
	public connect(): Subject<MessageEvent> {
		if (!this.subject) {
			this.subject = this.create(this.socketUrl);
		}
		return this.subject;
	}

	private create(url: string): Subject<MessageEvent> {
		let ws = new WebSocket(url);
  console.log(ws);
		let observable = Observable.create(
			(obs: Observer<MessageEvent>) => {
				ws.onmessage = obs.next.bind(obs);
				ws.onerror   = obs.error.bind(obs);
				ws.onclose   = obs.complete.bind(obs);

				return ws.close.bind(ws);
			});

		let observer = {
			next: (data: Object) => {
				if (ws.readyState === WebSocket.OPEN) {
					ws.send(JSON.stringify(data));
				}
			}
		};

		return Subject.create(observer, observable);
	}

	// For random numbers
	public connectData(url: string): Subject<number> {
		if (!this.subjectData) {
			this.subjectData = this.createData(url);
		}
		return this.subjectData;
	}

	private createData(url: string): Subject<number> {
		let ws = new WebSocket(url);

		let observable = Observable.create(
			(obs: Observer<any>) => {
				ws.onmessage = obs.next.bind(obs);
				ws.onerror   = obs.error.bind(obs);
				ws.onclose   = obs.complete.bind(obs);

				return ws.close.bind(ws);
			});

		let observer = {
			next: (data: Object) => {
				if (ws.readyState === WebSocket.OPEN) {
					ws.send(JSON.stringify(data));
				}
			}
		};

		return Subject.create(observer, observable);
	}
  
  public send(data){
    
      this.subject.next(data);
    }
  


  }