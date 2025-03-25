import { TestBed } from '@angular/core/testing';

import { UserInformer } from './user-informer';
import { Warning, Error } from '../problems/problems';
import { Subject } from 'rxjs';
import { ILogger, LoggerFactory } from '@vsirotin/log4ts';
//import { ILocalizer } from '../localization/localizer';

// describe('UserInformerService', () => {
//   let userInformer: UserInformer;
//   let subject: Subject<Warning|Error>;
//   let mockLocalizer: ILocalizer;
//   let subjectSpy: jasmine.Spy;
//   let timeStampPrefix: string;

//   beforeEach(() => {
//     subject = new Subject<Warning|Error>();
//     userInformer = new UserInformer("SH-CL-UI", new Logger(), subject);
//     subjectSpy = spyOn(subject, 'next');

//     let t = new Date();
//     timeStampPrefix = `${t.getFullYear()}-${t.getMonth() + 1}-${t.getDate()} ${t.getHours()}:${t.getMinutes()}:`;
//   });

//   it('should be created', () => {
//     expect(userInformer).toBeTruthy();
//   });

//   it('should call the subject with a warning', () => {
//     userInformer.warnUser("W001", "My message");

//     expect(subjectSpy).toHaveBeenCalledTimes(1);
//     const mostRecentCall = subjectSpy.calls.mostRecent();
//     const problem = mostRecentCall.args[0]; // This is the warning passed to next()

//     // Now we can analyze the properties of actualWarning separately

//     expect(problem).toBeInstanceOf(Warning);
//     const actualWarning: Warning = problem as Warning;
//     expect(actualWarning.source).toBe("SH-CL-UI");
//     expect(actualWarning.formattedTimestamp).toContain(timeStampPrefix);
//   });

//   it('should call the subject with a error', () => {

//     userInformer.alertUser("W001", "My message");

//     expect(subjectSpy).toHaveBeenCalledTimes(1);
//     const mostRecentCall = subjectSpy.calls.mostRecent();
//     const problem = mostRecentCall.args[0]; // This is the warning passed to next()

//     // Now we can analyze the properties of actualWarning separately

//     expect(problem).toBeInstanceOf(Error);
//     const actualWarning: Warning = problem as Warning;
//     expect(actualWarning.source).toBe("SH-CL-UI");
//     expect(actualWarning.formattedTimestamp).toContain(timeStampPrefix);
//   });

  
// });

