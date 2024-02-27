import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { ColDef, GridReadyEvent } from 'ag-grid-community';
import { AgGridAngular } from 'ag-grid-angular';
//import 'ag-grid-enterprise';

@Component({
  selector: 'test-ag',
  standalone: true,
  imports: [AgGridAngular, HttpClientModule],
  template: `<ag-grid-angular
    style="width: 100%; height: 100%;"
    [columnDefs]="columnDefs"
    [rowData]="rowData"
    [defaultColDef]="defaultColDef"
    [sideBar]="true"
    [class]="themeClass"
    (gridReady)="onGridReady($event)"
  ></ag-grid-angular> `,
})
export class TestAgComponent {
  public columnDefs: ColDef[] = [
    { field: 'athlete', minWidth: 170 },
    { field: 'age' },
    { field: 'country' },
    { field: 'year' },
    { field: 'date' },
    { field: 'sport' },
    { field: 'gold' },
    { field: 'silver' },
    { field: 'bronze' },
    { field: 'total' },
  ];
  public defaultColDef: ColDef = {
    editable: true,
    filter: true,
  };
  public rowData;
  public themeClass: string =
    "ag-theme-balham";

  constructor(private http: HttpClient) {}

  onGridReady(params: GridReadyEvent) {
    this.http
      .get(
        'https://www.ag-grid.com/example-assets/olympic-winners.json'
      )
      .subscribe((data) => (this.rowData = data));
  }
}