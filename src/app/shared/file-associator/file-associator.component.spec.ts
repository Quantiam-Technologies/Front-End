import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FileAssociatorComponent } from './file-associator.component';

describe('FileAssociatorComponent', () => {
  let component: FileAssociatorComponent;
  let fixture: ComponentFixture<FileAssociatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FileAssociatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileAssociatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
