import { TimesheetModule } from './timesheet.module';

describe('TimesheetModule', () => {
  let timesheetModule: TimesheetModule;

  beforeEach(() => {
    timesheetModule = new TimesheetModule();
  });

  it('should create an instance', () => {
    expect(timesheetModule).toBeTruthy();
  });
});
