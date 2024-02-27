
import { NgModule } from '@angular/core';
import { environment } from '../environments/environment';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule, RouteReuseStrategy  } from '@angular/router';

// Services 
import { AuthService } from './services/auth/auth.service';
import { AuthGuardService } from './services/auth-guard/auth-guard.service';

import { TokenInterceptor } from './auth/token.interceptor';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';

//Strategies
import { CustomReuseStrategy } from './reuse-strategy';

// Modules
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { MaterialDesignModule } from './material-design/material-design.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { JwtModule  } from '@auth0/angular-jwt';
import { HighchartsChartModule } from 'highcharts-angular';
import { FileSaverModule } from 'ngx-filesaver';
import { MatIconModule } from '@angular/material/icon';

// Components
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';

import { DisconnectionScreenComponent } from './auth/disconnection-screen/disconnection-screen.component';
import * as $ from 'jquery';

const routes: Routes = [
    {
    path: 'auth',
    component: AuthComponent,
    data: {key: 'Auth'},
  },   
   {
    path: 'disconnected',
    component: DisconnectionScreenComponent,
  }, 
 {
    path: '',
    loadChildren: () => import('./core/core.module').then(m => m.CoreModule),
 
    canLoad: [AuthGuardService],
  },   

];

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    DisconnectionScreenComponent,
    
  ],
  exports:[MaterialDesignModule],
  imports: [
    
    RouterModule.forRoot(routes),
    BrowserModule,
    BrowserAnimationsModule,  
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,     
    MatIconModule,
    SimpleNotificationsModule.forRoot(),
    MaterialDesignModule,
    FileSaverModule,
    HighchartsChartModule,
    JwtModule.forRoot({

      config: {
      tokenGetter: gettoken,
      // whitelistedDomains: [environment.apiUrl],
      // blacklistedRoutes: [environment.apiUrl + '/auth']
     }

   }),
  ],
  providers: [
    AuthService,
     {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }, 
   // WebsocketService,
    {provide: RouteReuseStrategy, useClass: CustomReuseStrategy}

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }


export function gettoken () {
  return localStorage.getItem('token');
  }