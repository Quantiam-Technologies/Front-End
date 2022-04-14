import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
//import { SgxScaleWebsocketService } from '../services/sgx-scale-websocket/sgx-scale-websocket.service';

import { Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  providers: [AuthService],
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

   hidePassword = true;
   loginHappening = false;
   ws: any;
   _ws: any;

  constructor(private auth: AuthService,
     //private scale_websocket: SgxScaleWebsocketService, 
     private router: Router,
    public notification: NotificationsService, ) { }

  ngOnInit() {
  }

  login(username, password, rfid) {

    this.loginHappening = true;

    this.notification.info('Authenticating...', 'This may take some time.', {timeOut: 4000, showProgressBar: false, clickToClose: true});

    this.auth.login(username, password, null).subscribe((response) => {
      this.loginHappening = false;
        console.log(response);
        if (response.token) {

           this.auth.token_auth(response.token);

          }
          this.notification.success('Authenticated', 'Seems good.', {timeOut: 4000, showProgressBar: false, clickToClose: true});
      },
      error => {

        console.log(error);
        if(error.status === 401)
        {
        this.notification.error("Unauthorized",  'Your credentials are incorrect.', {timeOut: 4000, showProgressBar: false, clickToClose: true});
        }

        if(error.status === 0)
        {
          this.router.navigate(['/disconnected']);
          console.log('test');
          this.notification.error('Failed to connect.',  'We could not reach the server.', {timeOut: 4000, showProgressBar: false, clickToClose: true});
        }

        this.loginHappening = false;
      },
  );

  }


  ngOnDestroy() {
     if (this._ws) { this._ws.unsubscribe(); }
  }


}
