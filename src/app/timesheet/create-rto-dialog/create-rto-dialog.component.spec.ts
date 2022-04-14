import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateRtoDialogComponent } from './create-rto-dialog.component';

describe('CreateRtoDialogComponent', () => {
  let component: CreateRtoDialogComponent;
  let fixture: ComponentFixture<CreateRtoDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateRtoDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateRtoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
