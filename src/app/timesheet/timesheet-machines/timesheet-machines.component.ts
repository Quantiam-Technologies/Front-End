import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HotTableRegisterer } from '@handsontable/angular';
import { UserService } from '../../services/user/user.service';
import { NotificationsService } from 'angular2-notifications';
import { HttpClient } from '@angular/common/http';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { MachineUserDialogComponent } from '../machine-user-dialog/machine-user-dialog.component';

@Component({
  selector: 'app-timesheet-machines',
  templateUrl: './timesheet-machines.component.html',
  styleUrls: ['./timesheet-machines.component.css']
})
export class TimesheetMachinesComponent implements OnInit {

  constructor(public userService: UserService, private notify: NotificationsService, private http: HttpClient, private dialog: MatDialog) { }

  purposes = ['Experimental', 'Heat Treatment at Atmospheric Pressure', 'Low Temperature Debind Furnace', 'Mechano-Synthesis', 'Physical Properties Testing', 'Powder Analysis', 'Surface Analysis', 'TGA', 'Vacuum Heat Treatment Furnace'];
  billingCategories = ['Specialized Technical Services', 'Specialized Heat Treatment Services', 'Specialized Analytical Services'];
  denominations = ['Cycles', 'Days', 'Experiments', 'Half_days', 'Hours', 'Runs', 'Samples'];

  private hotRegisterer = new HotTableRegisterer();
  hotTableSettings: any = {
    colHeaders: true,
    minSpareRows: 0,
    afterRender: () => {
      console.log('test');
    //  $('[data-toggle="tooltip"]').tooltip();
    },
    afterChange: (changes, source) => {
      console.log(changes, source);
      if (changes) {
        const rowProp: any = this.hotRegisterer.getInstance('id').getSourceDataAtRow(changes[0][0]);
        console.log(changes);
        const payload: any = {};
        payload[changes[0][1]] = changes[0][3];
        payload.id = rowProp.id;
        console.log(rowProp);
        if (changes[0][2] !== changes [0][3]) { // only trigger if different
        this.updateMachine(payload.id, payload);
        }
      }
    },
    columns: [
      {data: 'id', title: 'ID', readOnly: 'true'},
      {data: 'machine_name', title: 'Name'},
      {data: 'machine_purpose', type: 'dropdown', source: this.purposes, title: 'Purpose'},
      {data: 'denomination',   type: 'dropdown', source: this.denominations, title: 'Denomination'},
      {data: 'billing_category', type: 'dropdown', source: this.billingCategories, title: 'Billing Category' },
      {data: 'startdate', title: 'Start Date', type: 'date',  dateFormat: 'YYYY-MM-DD'},
      {data: 'enddate', title: 'End Date', type: 'date', dateFormat: 'YYYY-MM-DD'},
      {
        title: 'Actions',
        readOnly: true,
        renderer: function(instance, td, row, col, prop, value, cellProperties) {
          td.innerHTML = `<button id="deleteButton" class="btn btn-xs btn-danger" style="margin:2px;">Delete</button>`;
          return td;
        }
      },
      {
        title: 'Users',
        readOnly: true,
        renderer: function(instance, td, row, col, prop, value, cellProperties) {

          const rowProp = instance.getSourceDataAtRow(row);
        // console.log(rowProp,row);
         if (rowProp.users) {
          td.innerHTML = `<button id="usersButton" data-toggle="tooltip" data-placement="right" title="Tooltip on right"\
           class="btn btn-xs btn-primary" style="margin:2px;">${rowProp.users.length} Operators </button>`;
         }
           return td;
        },

      },

    ],

    afterOnCellMouseDown: (event, coords, TD) => {
    //  console.log();
      if (TD.firstElementChild.getAttribute('id') === 'deleteButton' && coords.col === 7) {
        this.deleteMachineFromRow(coords);
      }
     
      if (TD.firstElementChild.getAttribute('id') === 'usersButton' && coords.col === 8) {
  //      console.log('test');
        this.usersPopup(coords);
      }


    }

  };

  ngOnInit() {
    this.fetchMachines();

  }

  deleteMachineFromRow(coords) {

    const data: any = this.hotRegisterer.getInstance('id').getSourceDataAtRow(coords.row);
    if (confirm('Are you sure you want to delete machine ' + data.machine_name + ' ID:' + data.machine_id + '?') && data.Category !== 'Absence') {

      this.deleteMachine(data.id);
    }
  //  console.log(data,coords);
  }

  usersPopup(coords) {

    const data = this.hotRegisterer.getInstance('id').getSourceDataAtRow(coords.row);
    console.log(data);
    const dialogRef = this.dialog.open(MachineUserDialogComponent, {

      // disableClose: true,
        width: 'auto',
        autoFocus: true,
        position: {'top': '50px'},
         data: data,
      });

      dialogRef.afterClosed().subscribe((result) => {

          if (result) {
            this.fetchMachines();
          }

      });


  }


  fetchMachines() {

    this.http.get(environment.apiUrl + `/machine`).subscribe((r: any) => {

       this.hotRegisterer.getInstance('id').loadData(r.data);
    });
  }

  updateMachine(id, payload ) {

    this.http.put(environment.apiUrl + `/machine/${id}`, payload).subscribe((r) => {

    });
  }

  addTableRow() {


    if (confirm('Are you sure you want to create a new machine?')) {

      this.http.post(environment.apiUrl + `/machine`, null).subscribe((r: any) => {
        this.hotRegisterer.getInstance('id').alter('insert_row', 0);
        this.hotRegisterer.getInstance('id').setDataAtCell(0, 0, r.id );
      });
    }
  }

  createMachine() {


  }

  deleteMachine(id) {
    this.http.delete(environment.apiUrl + `/machine/${id}`).subscribe((r) => {

      this.notify.success('Deleted', 'You deleted machine ' + id, { timeOut: 4000, showProgressBar: false, clickToClose: true }); /// Daily OT notificaton

      this.fetchMachines();
    });

  }


}
