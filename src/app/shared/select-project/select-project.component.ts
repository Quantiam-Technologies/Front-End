import { Component, OnInit, Input, EventEmitter, Output, OnDestroy } from '@angular/core';
import { ProjectService } from '../../services/project/project.service';

@Component({
  selector: 'app-select-project',
  templateUrl: './select-project.component.html',
  styleUrls: ['./select-project.component.css']
})
export class SelectProjectComponent implements OnInit, OnDestroy {

  list$: any;
  items: any = [];
  allItems: any = [];
  showActive = true as boolean;
  showInactive = false as boolean;
  virtualScroll = true as boolean;
  
  dropdownWidth = 400; // in pixels


  // Inputs
  @Input() placeholder = 'Project'; // default value, object or ID
  @Input() selectedValue: any = null; // default value, object or ID
  @Input() multiple = false; // multi version
  @Input() selectableGroup = false; // multi version
  @Input() style = 'min-width: 200px'; // multi version

  // Outputs
  @Output() change = new EventEmitter<any>();
  @Output() clear = new EventEmitter<any>();

  constructor(private projectService: ProjectService) { }

  ngOnInit() {

    // retrieve from project service
    // this.items = ['true', 'Two', 3,'test'];

    this.projectService.list();
    this.list$ = this.projectService.list$.subscribe((r) => {

      //console.log(r);
          this.allItems = r;
          if (r[0]) { this.showItems(); }

      });

  }

  showItems() {
    //console.log(this.showActive, this.showInactive);

    if (this.showActive && !this.showInactive) {

    this.items = this.allItems.filter((obj) => {

        return obj.active;

      });
    }

    if (!this.showActive && this.showInactive) {

    this.items = this.allItems.filter((obj) => {

        return !obj.active;

      });
    }


   if (!this.showActive && !this.showInactive) { this.items = []; }
   if (this.showActive && this.showInactive) {this.items = this.allItems; }

  }


  onChange(event) { this.change.emit(event); }
  onClear(event) { this.change.emit(event); }

  customSearchFn(term: string, item) {  // good for lists we store in their entirety
  //  console.log(term,item);
    term = term.toLocaleLowerCase();

    item.id = String(item.id);
    return item.id.toLocaleLowerCase().indexOf(term) > -1
    || item.Description.toLocaleLowerCase().indexOf(term) > -1;

}


 onOpen() {

  setTimeout((x) => {

    const dropdown = document.querySelector('.total-padding');
    dropdown?.setAttribute('style', 'width:' + this.dropdownWidth + 'px !important;height: 1800px;'); // this changes the dropdown to be as wide as it's contents
    // dropdown.setAttribute('style',''); //workaround

  }, 100);

  }


  ngOnDestroy() {
    this.list$ .unsubscribe();
  }
}
