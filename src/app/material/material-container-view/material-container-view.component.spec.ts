import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialContainerViewComponent } from './material-container-view.component';

describe('MaterialContainerViewComponent', () => {
  let component: MaterialContainerViewComponent;
  let fixture: ComponentFixture<MaterialContainerViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaterialContainerViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterialContainerViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
