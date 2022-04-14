import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreedmodelDatabaseComponent } from './threedmodel-database.component';

describe('ThreedmodelDatabaseComponent', () => {
  let component: ThreedmodelDatabaseComponent;
  let fixture: ComponentFixture<ThreedmodelDatabaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThreedmodelDatabaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThreedmodelDatabaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
