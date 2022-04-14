import { Component, OnInit, Input, EventEmitter, Output, OnDestroy } from '@angular/core';
import { SelectTgarunService } from './select-tgarun.service';

// import { ProjectService } from '../../services/project/project.service';

@Component({
  selector: 'app-select-tgarun',
  templateUrl: './select-tgarun.component.html',
  styleUrls: ['./select-tgarun.component.css']
})
export class SelectTgarunComponent implements OnInit, OnDestroy {

  list$: any;
  items: any = [];
  allItems: any = [];
  itemsBuffer: any = [];
  dropdownWidth: '1000'; // in Pixels

  loading;


  // Inputs
  @Input() selectedValue: any = null; // default value, object or ID
  @Input() multiple: any = false; // multi version
  @Input() selectableGroup: any = false; // multi version
  @Input() placeholder = 'Select Container'; // multi version

  // Outputs
  @Output() change = new EventEmitter<any>();
  @Output() remove = new EventEmitter<any>();
  @Output() clear = new EventEmitter<any>();

  constructor(private selectTgarunService: SelectTgarunService) { }

  ngOnInit() {

    this.selectTgarunService.list();
    this.list$ = this.selectTgarunService.list$.subscribe((r) => {

      console.log(r);
          this.itemsBuffer = r;

      });


  }

  onChange(event) { this.change.emit(event); }
  onAdd(event) { }
  onRemove(event) { this.remove.emit(event); }
  onClear(event) { this.clear.emit(event); }
  onScrollToEnd() {}

  ngOnDestroy() {
    // this.list$.unsubscribe();
  }

  customSearchFn(term: string, item) {  // good for lists we store in their entirety
    // console.log(term,item);
    term = term.toLocaleLowerCase();

    return item.name.toLocaleLowerCase().indexOf(term) > -1
    || item.comments.toLocaleLowerCase().indexOf(term) > -1;

}

   onOpen() {

    setTimeout((x) => {

      const dropdown = document.querySelector('.total-padding');
     // console.log('check',dropdown);
      dropdown?.setAttribute('style', 'width:900px !important;height: 3800px;'); // this changes the dropdown to be as wide as it's contents
      // dropdown.setAttribute('style',''); //workaround

    }, 100);

  }

}
