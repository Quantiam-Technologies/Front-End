import { AuthService } from '../auth/auth.service';
import { Injectable } from '@angular/core';
import { CanLoad, CanActivate, Route, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanLoad {

  constructor(public auth: AuthService, private router: Router) {

    // console.log(router.url, route);

    }



   canLoad(route: Route): boolean {

      const queryString = window.location.search;
      const token = decodeURIComponent(window.location.search.replace(new RegExp('^(?:.*[&\\?]' + encodeURIComponent('token').replace(/[\.\+\*]/g, '\\$&') + '(?:\\=([^&]*))?)?.*$', 'i'), '$1'));
     // console.log(token, token.length);
      if (token.length === 0) {

        if (this.auth.isLoggedIn(null)) {

          return true;
        } else {

        //  sessionStorage.setItem('lastRouteUrl',this.router.url);
          this.router.navigate(['auth']);

        }

      } else {

         if (this.auth.isLoggedIn(token)) {

            localStorage.setItem('token', token);
           return true;

          } else { this.router.navigate(['auth']); }

      }

      return false;
  }


}
//
