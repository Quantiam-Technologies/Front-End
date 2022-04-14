import { Component, OnInit, Input, EventEmitter, Output, OnDestroy, ChangeDetectorRef  } from '@angular/core';
import { SelectUserService } from './select-user.service';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-select-user',
  templateUrl: './select-user.component.html',
  styleUrls: ['./select-user.component.css']
})
export class SelectUserComponent implements OnInit, OnDestroy {

  list$: any;
  items: any = [];
  machineItems: any = [];
  allItems: any = [];
  showActive = true;
  showInactive = false;
  virtualScroll = true;
  user;


  // Inputs
  @Input() selectedValue: string; // default value, object or ID
  @Input() multiple: any = false; // multi version
  @Input() selectableGroup: any = false;
  @Input() placeholder = 'Select Somebody';
  @Input() showMachines = false;
  @Input() restrictedAccessMode = false;
  @Input() subordinates = false;
  @Input() clearable = true;
  @Input() supervisors = false;
  @Input() authorizedSubordinatesOrMachines = false;
  @Input() showSubordinatesOnly = false;
  @Input() allOptions = false;
  @Input() appendTo;
  @Input() style = 'min-width:200px;';

  // Outputs
  @Output() change = new EventEmitter<any>();
  @Output() remove = new EventEmitter<any>();
  @Output() clear = new EventEmitter<any>();



  constructor(private selectUserService: SelectUserService, private userService: UserService, ) { }

  ngOnInit() {

  //  console.log('select user started', this.selectedValue);
   // this.selectedValue = this.selectedValue.toString();
    this.showMachineItems();
    if (!this.restrictedAccessMode) {

    this.selectUserService.list(); // Make sure the service is initialized.
    this.list$ = this.selectUserService.list$.subscribe((r) => {
         this.allItems = r;

      //   console.log(this.allItems);

          if (r[0]) { this.showItems(); }
      });
    }




  }

  showMachineItems() {


    if (!this.restrictedAccessMode) {

      this.selectUserService.listMachines(); // Make sure the service is initialized.
      this.list$ = this.selectUserService.machineList$.subscribe((r) => {

          this.machineItems = r;

        });
      }

  }


  showItems() {

    // check for all Options
    // console.log('Show Items', this.selectedValue);

    if (this.allOptions) {

        const everything = this.allItems;

       if (this.machineItems.length > 0) {
         this.machineItems.forEach((element: any) => {
              element.id = parseInt(element.id) + 'm';
              everything.push(element);
          });
      }

      return this.activityFilter(everything);
    }

     // check for  subordinate and supervisors

    if (this.showSubordinatesOnly) {
      this.user = this.userService.fetchAuthUserObj();
      const userObj = this.allItems.find((x) => {

       return x.id === this.user.id;

      });
     this.items = this.user.subordinates;
     this.items.unshift(userObj);
     return this.activityFilter(this.items);

    }

     if (this.authorizedSubordinatesOrMachines) {
       this.user = this.userService.fetchAuthUserObj();
       const userObj = this.allItems.find((x) => {

        return x.id === this.user.id;

       });

      this.items = this.user.subordinates.concat(this.user.machines);
      this.items.unshift(userObj);
      return this.activityFilter(this.items);



     }


     setTimeout(() => { this.selectedValue = this.selectedValue; console.log('check'); }, 200);
     return this.activityFilter(this.allItems);


      

  }

  activityFilter(items) {

   // console.log(this.showActive, this.showInactive);
  try {
      if (this.showActive && !this.showInactive) {

      this.items = items.filter((obj) => {

          return obj.active;

        });
      }

      if (!this.showActive && this.showInactive) {

      this.items = items.filter((obj) => {

          return !obj.active;

        });
      }


    if (!this.showActive && !this.showInactive) { this.items = []; }
    if (this.showActive && this.showInactive) {this.items = items; }
    } catch (e) {}



  }

  onChange(event) {  this.change.emit(event);  }
  onRemove(event) { this.remove.emit(event);  }
  onClear() { this.clear.emit(event); }

  customSearchFn(term: string, item) {  // good for lists we store in their entirety
   // console.log(term,item);
    term = term.toLocaleLowerCase();

    item.id = item.id;
    return item.id === term
    || item.name.toLocaleLowerCase().indexOf(term) > -1;

}

  ngOnDestroy() {
   if (this.list$) { this.list$.unsubscribe(); }
  }

}
