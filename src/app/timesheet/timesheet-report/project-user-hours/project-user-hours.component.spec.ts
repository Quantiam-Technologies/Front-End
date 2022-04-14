import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectUserHoursComponent } from './project-user-hours.component';

describe('ProjectUserHoursComponent', () => {
  let component: ProjectUserHoursComponent;
  let fixture: ComponentFixture<ProjectUserHoursComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectUserHoursComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectUserHoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
