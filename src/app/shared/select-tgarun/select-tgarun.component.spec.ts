import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectTgarunComponent } from './select-tgarun.component';

describe('SelectTgarunComponent', () => {
  let component: SelectTgarunComponent;
  let fixture: ComponentFixture<SelectTgarunComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectTgarunComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectTgarunComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
