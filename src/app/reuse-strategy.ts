import {ActivatedRouteSnapshot, DetachedRouteHandle, RouteReuseStrategy} from '@angular/router';
import { Injectable } from "@angular/core";

@Injectable()
export class CustomReuseStrategy implements RouteReuseStrategy {

  // tslint:disable-next-line:no-trailing-whitespace
  routesToCache: string[] = [
   'userDatabase', 'userView', 
   'timesheet','timesheet-calendar','timesheet-report', 'timesheet-rto-allocation','timesheet-rto-database',  
   'timesheet-report-user-hours','timesheet-report-project-user-hours','timesheet-report-user-rto-bank-status','timesheet-report-user-absences-summary',
   'timesheet-statistics-company','timesheet-statistics-user',
   'tgaDatabase', 'tgaPeakTool',
    'MaterialContainerDatabase',
    'SemDatabase','SemRun',
    'XrdDatabase','XrdView',
    'xpsDatabase',
    //'ArbinTest',
    'ArbinTestDatabase',
    'company-insight-unpaid',
    'company-insight-headcount',
    'company-insight-hours',
    '3dmodels-database',
    'TapecastDatabaseComponent',
    'TapecastComponent'
    

   ];
  storedRouteHandles = new Map<string, DetachedRouteHandle>();

  // Decides if the route should be stored
  shouldDetach(route: ActivatedRouteSnapshot): boolean {
     return this.routesToCache.indexOf(route.data['key']) > -1;
  }

  // Store the information for the route we're destructing
  store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle): void {
     this.storedRouteHandles.set(route.data['key'], handle);
  }

  // Return true if we have a stored route object for the next route
  shouldAttach(route: ActivatedRouteSnapshot): boolean {
     return this.storedRouteHandles.has(route.data['key']);
  }

  // If we returned true in shouldAttach(), now return the actual route data for restoration
 // retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle {
  retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle {
     return this.storedRouteHandles.get(route.data['key']);
  }

  // Reuse the route if we're going to and from the same route
  shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
     return future.routeConfig === curr.routeConfig;
  }

}
