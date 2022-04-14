import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NotificationsService } from 'angular2-notifications';
import { UserService } from '../../services/user/user.service';

import * as moment from 'moment';
import * as Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
    selector: 'app-timesheet-rto-view',
    templateUrl: './timesheet-rto-view.component.html',
    styleUrls: ['./timesheet-rto-view.component.css']
})
export class TimesheetRtoViewComponent implements OnInit {

    policyFolderPath = 'Q:\\Administration - All Staff\\HR and EH&S INFORMATION\\POLICIES AND PROCEDURES\\HR POLICIES\\HRD-0003 Paid Leave BV and PTO';

    showTimeOffRequestForm;
    previousTimeRequest = {};
    canApprove = false;

    showSelectBox = false;
    rto;
    rtoBank;
    typeTotals;
    existingAbsences;

    routeParams: any;

    requestTime = { date: null, end_hour: null, hours: null, requestID: null, rtotimeID: null, start_hour: null, type: null, };
    timeOptions = [
        '8:00 am', '8:15 am', '8:30 am', '8:45 am',
        '9:00 am', '9:15 am', '9:30 am', '9:45 am',
        '10:00 am', '10:15 am', '10:30 am', '10:45 am',
        '11:00 am', '11:15 am', '11:30 am', '11:45 am',
        '12:00 pm',
        '1:00 pm', '1:15 pm', '1:30 pm', '1:45 pm',
        '2:00 pm', '2:15 pm', '2:30 pm', '2:45 pm',
        '3:00 pm', '3:15 pm', '3:30 pm', '3:45 pm',
        '4:00 pm', '4:15 pm', '4:30 pm', '4:45 pm',
        '5:00 pm',
    ];

    selectedSupervisorToNotifyId;

    editable = false;

    constructor(
        private http: HttpClient,
        private notification: NotificationsService,
        private route: ActivatedRoute,
        public userService: UserService,
        private router: Router,
    ) {}

    ngOnInit() {



        this.route.paramMap.subscribe(params => {
            console.log(params);


            this.fetchRtoData(params.get('id'));
            this.showTimeOffRequestForm = false;

        });



    }

    canEdit() {
        // is supervisor & superior has not approved

        // has relevant Permissions

        //
    }

    checkIfCanApprove() {
        // is supervisor


        const checkIfAlreadyApproved = this.rto.approvals.filter((obj) => {

            return obj.employeeID === this.userService.get('id');
        });

        console.log(checkIfAlreadyApproved);
        if (checkIfAlreadyApproved[0]) { return; }

        if ((this.rto.user.id !== this.userService.get('id')) && this.userService.hasPermission([15, 2])) { this.canApprove = true; } // Has the ability to approve others
        if ((this.rto.user.id === this.userService.get('id')) && this.userService.hasPermission([16])) { this.canApprove = true; } // Self Approval Clause

        // has relevant Permissions


    }

    fetchRtoData(id) {


        this.http.get(environment.apiUrl + '/rto/' + id).subscribe((r) => {

            this.rto = r;
            this.canEdit();

            this.checkIfCanApprove();
            this.fetchExistingAbsences();

            if (this.rto.status === 'pending') {
                this.fetchRtobank();
            }
        });


    }


    checkTimeRequestRules() {



        if ((this.requestTime.type === 'pto' || this.requestTime.type === 'vacation') && (this.requestTime.hours < 1 && this.requestTime.hours > -1)) {
            this.notification.error('Error', 'PTO must be a minimum of 1 hour. ', {timeOut: 4000});
            return false;
        }

      /*   if (this.requestTime.type === 'vacation' && (this.requestTime.hours < 8 && this.requestTime.hours > -8) && !this.userService.hasPermission(11)) {
            this.notification.error('Error', 'Vacation must taken in full days. ', {timeOut: 4000});
            return false;
        }
 */
        return true;
    }

    createTimeRequest() {

        /// requests must be all positive or all negative
        if (!this.checkTimeRequestRules()) { return; }
        const params = {
            date: this.requestTime.date,
            end_hour: this.requestTime.end_hour,
            hours: this.requestTime.hours,
            requestID: this.requestTime.requestID,
            start_hour: this.requestTime.start_hour,
            type: this.requestTime.type,
        };

        //console.log(this.previousTimeRequest, params);
        if (JSON.stringify(this.previousTimeRequest) === JSON.stringify(params)) {

            this.notification.error('Duplicate','You are trying to create the same thing twice!', {timeOut: 4000, showProgressBar: false, clickToClose: true});

    /*         Swal.fire({
                title: 'Duplicate Request',
                text: 'You\'re trying to create the same thing twice!',
                icon: 'warning',
                // showCancelButton: true,
                confirmButtonColor: '#3085d6',
                // cancelButtonColor: '#d33',
                confirmButtonText: 'Hmm...'
            }).then((result) => {}); */

        } else {

            this.http.post(environment.apiUrl + '/rto/' + this.rto.requestID + '/requestTime', params).subscribe((r) => {

                this.rto.requested_time.push(r);
                this.previousTimeRequest = params;
                this.calculateTypeTotals();
                this.fetchExistingAbsences();
            });


        }



        // requests must adhere to policy rules

    }

    deleteTimeRequest(timeRequest) {

        if(confirm('Do you want to delete this request?')){

            this.http.delete(environment.apiUrl + '/rto/time/' + timeRequest.rtotimeID).subscribe((r) => {

                this.rto.requested_time = this.rto.requested_time.filter(obj => obj !== timeRequest); // filter for objects that aren't the one we removed
                this.notification.success('Deleted', 'The RTO Request was deleted.', {timeOut: 4000, showProgressBar: false, clickToClose: true}); /// Daily OT notificato
                this.calculateTypeTotals();

            });

        }

       /*  Swal.fire({
            title: 'Are you sure?',
            text: 'You won\'t be able to revert this!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.value) {


                this.http.delete(environment.apiUrl + '/rto/time/' + timeRequest.rtotimeID).subscribe((r) => {

                    this.rto.requested_time = this.rto.requested_time.filter(obj => obj !== timeRequest); // filter for objects that aren't the one we removed
                    // Swal.fire( 'Deleted!',    'Your file has been deleted.',  'success');
                    this.calculateTypeTotals();

                });
            }
        }); */
    }

    checkNegativeResult() {
        if ((this.rtoBank.remaining.pto + this.typeTotals.pto) < 0) { return true; }
        if ((this.rtoBank.remaining.vacation + this.typeTotals.vacation) < 0) { return true; }
        if ((this.rtoBank.remaining.cto + this.typeTotals.cto) < 0) { return true; }
        return false;
    }

    checkApproval() {

        console.log("check approval");
        // check to see if negative or positive vacation / pto / cto
        if (this.checkNegativeResult()) {
            console.log("Negative");

            this.notification.info('Negative Hours Result','This user will have a negative balance in their hours bank.', {timeOut: 4000, showProgressBar: false, clickToClose: true});
            this.createApproval();

/* 
            return new Swal({
                title: 'Negative Hours Result',
                text: 'This user will have a negative balance in their hours bank. ',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonColor: '#3085d6',
                confirmButtonText: 'Approved!',
                cancelButtonText: 'Wait a minute...'
            }).then((result) => {
                if (result.value) {
                    this.createApproval();

                }
              }); */


        } else if ((this.userService.hasPermission(2) && this.rto.approvals.length === 0) && this.userService.get('id') !== this.rto.user.id) {
            // warning for approving on your own
            console.log("Other event");

            
            this.notification.info('Ignoring First Level Approval','The group supervisor has not approved this request yet. ', {timeOut: 4000, showProgressBar: false, clickToClose: true});
            this.createApproval();

          /*   return new Swal({
                title: 'Ignoring First Level Approval',
                text: 'The group supervisor has not approved this request yet. ',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonColor: '#3085d6',
                confirmButtonText: 'Approve Anyway',
                cancelButtonText: 'I will wait...'
            }).then((result) => {
                if (result.value) {
                    this.createApproval();

                }
        }); */

        } else {
            this.createApproval();
        }

     //


    }

    createApproval() {

        const params = {

            'approval': 'approved',

        };
        this.http.post(environment.apiUrl + '/approval/' + this.rto.requestID , params).subscribe((r: any) => {

                this.rto.approvals.push(r);
                this.rto.status = r.check;

                if (this.rto.status === 'pending') {
                    this.notification.info('Final Review', 'Notified reviewers via email.');
                }
                else{
                    this.notification.success('Success', 'The request was appvoed by you.', {timeOut: 4000, showProgressBar: false}); 

                }

                this.checkIfCanApprove();

        });

    }

    deleteApproval(approval) {

        this.http.delete(environment.apiUrl + '/approval/' + approval.approvalID ).subscribe((r) => {

            this.notification.success('Delete', 'The approval was removed.', {timeOut: 4000, showProgressBar: false}); /// Daily OT notificaton

            this.rto.approvals = this.rto.approvals.filter(obj => obj !== approval);
            this.rto.status = 'pending';
            this.checkIfCanApprove();

        });

    }

    denyApproval() {
        const params = {

            'approval': 'denied',

        };
        this.http.post(environment.apiUrl + '/approval/' + this.rto.requestID , params).subscribe((r: any) => {

                this.rto.approvals.push(r);
                this.rto.status = r.check;

                this.checkIfCanApprove();

        });
    }

    notifySupervisor() {

        // Build date table.
        if (this.checkNegativeResult()) {

               
            this.notification.info('Negative Hours Result','If this is approved, you will have a negative balance in your bank.', {timeOut: 4000, showProgressBar: false, clickToClose: true});
            this.sendSupervisorNotificationEmail();

           /*  return new Swal({
                title: 'Negative Hours Result',
                text: 'If this is approved, you will have a negative balance in your bank. ',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Okay!',
                cancelButtonText: 'Wait a minute...'
            }).then((result) => {
                if (result.value) {
                    this.sendSupervisorNotificationEmail();
                }
              }); */
        } else {
         this.sendSupervisorNotificationEmail();
        }
    }

    sendSupervisorNotificationEmail() {


        const dates = [];
        let total_hours = 0;
        let amount_of_days = 0;
        this.rto.requested_time.forEach((data) => {
            const date = '<tr><td align=\'center\'>' + moment(data.date).format('dddd') + '</td><td align=\'center\'>' + moment(data.date).format('MMMM Do, YYYY') + '</td><td align=\'center\'>' + data.hours + ' hrs</td><td align=\'center\'>' + data.type + '</td><td height=0 width=0></td></tr>';
            total_hours = total_hours + data.hours;
            amount_of_days = amount_of_days + 1;
            dates.push(date);
        });

        const table = '<table border="1" cellspacing="2" cellpadding="2" width="550" >' +
            '<th> Day of Week </th> <th> Day  </th><th>Amount</th><th>Type</th><th>Comma</th>' +
            '<tbody>' +
            dates +
            '</tbody></table>';

        const body = '<p><a href=\'' + document.location.href + '\'> View Time-off Request</a></p><b> Total Time  </b>: ' + total_hours + ' Hours <br> <b> Total Days </b> : ' + amount_of_days + '<br><br>' + table + '<br><br><p><i>This message is automatically generated. </i></p>';

        const params = {
            'subject': '[RTO] ' + this.rto.user.name + ' has requested time off.',
            'body': body,
            // 'recipientID': ['65'], /// change to supervisor ID later
             'recipientID': [this.rto.user.id, this.selectedSupervisorToNotifyId],

        };
        // 	console.log(params);

         this.http.post(environment.apiUrl + '/mail/send', params).subscribe((r) => {

            // Notified Supervisor

            this.selectedSupervisorToNotifyId = null;

            this.notification.info('Email Sent', 'We notified the Supervisor', {timeOut: 6000, showProgressBar: false, clickToClose: true}); /// Daily OT notificaton

        }, (e) =>{

            this.notification.error('Email Error', 'Please communicate with your supervisor in person.', {timeOut: 4000, showProgressBar: false, clickToClose: true}); /// Daily OT notificaton


        });

    }

    deleteRTO() {
        // confirm if user wants to delete this entire request?

        if(confirm('Do you want to delete this request?')){

            this.http.delete(environment.apiUrl + '/rto/' + this.rto.requestID).subscribe((r) => {
                this.notification.success('Deleted', 'The RTO Request was deleted.', {timeOut: 4000, showProgressBar: false, clickToClose: true}); /// Daily OT notificato
                this.router.navigate(['/timesheet/rto/database'], { queryParams: { refresh: 'true', id: this.rto.requestID }, skipLocationChange: true});

            });
        }

    /*     Swal.fire({
            title: 'Delete Request ' + this.rto.requestID + '?',
            text: 'You won\'t be able to revert this!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
                if (result.value) {
                    // delete the request
                    this.http.delete(environment.apiUrl + '/rto/' + this.rto.requestID).subscribe((r) => {

                        this.router.navigate(['/timesheet/rto/database'], { queryParams: { refresh: 'true', id: this.rto.requestID }, skipLocationChange: true});

                    });
                  }
                }); */

    }


    fetchRtobank () {

        this.http.get(environment.apiUrl + '/user/' + this.rto.employeeID + '/rtobank').subscribe((r) => {

            this.rtoBank = r;
            this.calculateTypeTotals();

        });
    }

    fetchExistingAbsences() {

        const params = {dateArray: []};

        this.rto.requested_time.forEach((time) => {

            params.dateArray.push(time.date);

        });

        this.http.get(environment.apiUrl + '/rto/existingabsences?filterSpinner', {params:params}).subscribe((r: any) => {

            this.existingAbsences = r;


            this.rto.requested_time.forEach((time) => {

                if (r[time.date]) {
                    time.conflicts = r[time.date].length;
                }
            });

        });

    }

    calculateTypeTotals() {
        this.typeTotals = {vacation: 0, pto: 0, cto: 0, ppl: 0};
        this.rto.requested_time.forEach((time) => {
            this.typeTotals[time.type] = this.typeTotals[time.type] + (time.hours * -1);
        });

    }


    resetStartHourAndEndHour() {
        this.requestTime.start_hour = null;
        this.requestTime.end_hour = null;

    }
}
