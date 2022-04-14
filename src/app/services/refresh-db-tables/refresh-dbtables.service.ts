import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RefreshDBTablesService {

  // Observable string sources
  private refreshSemDBTableSource = new Subject<boolean>();
  private refreshXrdDBTableSource = new Subject<boolean>();

  // Observable string streams
  refreshSemDBTable$ = this.refreshSemDBTableSource.asObservable();
  refreshXrdDBTable$ = this.refreshXrdDBTableSource.asObservable();

  // Service message commands
  refreshSemTable(refresh: boolean) {
    this.refreshSemDBTableSource.next(refresh);
  }

  refreshXrdTable(refresh: boolean) {
    this.refreshXrdDBTableSource.next(refresh);
  }
}
