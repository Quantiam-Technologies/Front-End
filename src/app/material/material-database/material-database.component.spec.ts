import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialDatabaseComponent } from './material-database.component';

describe('MaterialDatabaseComponent', () => {
  let component: MaterialDatabaseComponent;
  let fixture: ComponentFixture<MaterialDatabaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaterialDatabaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterialDatabaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
