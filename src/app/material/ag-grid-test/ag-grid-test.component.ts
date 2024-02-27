import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, GridReadyEvent } from 'ag-grid-community';
import 'ag-grid-enterprise';
import { IOlympicData } from './interfaces';

@Component({
  selector: 'ag-grid-test',
  standalone: true,
  imports: [AgGridAngular, HttpClientModule],
  template: `<p> Test </p><ag-grid-angular
    style="width: 1200px; height: 400px;"
    [columnDefs]="columnDefs"
    [rowData]="rowData"
    [defaultColDef]="defaultColDef"
    [sideBar]="false"
    [class]="themeClass"
    (gridReady)="onGridReady($event)"
  ></ag-grid-angular> `,
})
export class AgGridTestComponent {
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
  public rowData!: IOlympicData[];
  public themeClass: string =
    "ag-theme-quartz";

  constructor(private http: HttpClient) {}

  onGridReady(params: GridReadyEvent<IOlympicData>) {
    this.http
      .get<IOlympicData[]>(
        'https://www.ag-grid.com/example-assets/olympic-winners.json'
      )
      .subscribe((data) => (this.rowData = data));
  }
}