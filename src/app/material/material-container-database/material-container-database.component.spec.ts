import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialContainerDatabaseComponent } from './material-container-database.component';

describe('MaterialContainerDatabaseComponent', () => {
  let component: MaterialContainerDatabaseComponent;
  let fixture: ComponentFixture<MaterialContainerDatabaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaterialContainerDatabaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterialContainerDatabaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
