import { LoggerFactory } from '@vsirotin/log4ts';
import { AppStarter, ILanguageSetter, IStartCompletionReceiver, IStartProcessNotificationReceiver } from './app-starter';


describe('AppStarter', () => {
  let appStarter: AppStarter;
  let mockStartCompletionReceiver: jasmine.SpyObj<IStartCompletionReceiver>;
  let mockStartProcessNotificationReceiver: jasmine.SpyObj<IStartProcessNotificationReceiver>;

  beforeEach(() => {
    LoggerFactory.setAllLevelsByAllLoggers();
    mockStartCompletionReceiver = jasmine.createSpyObj('IStartCompletionReceiver', ['completeStartProcess']);
    mockStartProcessNotificationReceiver = jasmine.createSpyObj('IStartProcessNotificationReceiver', [
      'startLanguageSettingProcess',
      'startWelcomeProcess',
      'startDataSavingConfirmationProcess',
    ]);

    AppStarter.setStartCompletionReceiver(mockStartCompletionReceiver);

    //appStarter = AppStarter.getLanguageSetter() as AppStarter;
    //AppStarter.setStartCompletionReceiver(mockStartCompletionReceiver);
    //AppStarter.setStartProcessNotificationReceiver(mockStartProcessNotificationReceiver);
  });

  it('should create', () => {
    let languageSetter = AppStarter.getLanguageSetter();
    expect(languageSetter).toBeDefined();
  });

  it('if language not set then language setter should be called', () => {
    let welcomer = AppStarter.getWelcomeInformer();
    spyOn(welcomer as any, 'isLanguageSet').and.returnValue(false);

    AppStarter.setStartProcessNotificationReceiverAndStart(mockStartProcessNotificationReceiver)

    expect(mockStartProcessNotificationReceiver.startLanguageSettingProcess).toHaveBeenCalled();
  });

  it('if language is set then welcome informer should be called', () => {
    let welcomer = AppStarter.getWelcomeInformer();
    spyOn(welcomer as any, 'isLanguageSet').and.returnValue(true);
    spyOn(welcomer as any, 'isUserInformed').and.returnValue(false);
    AppStarter.setStartProcessNotificationReceiverAndStart(mockStartProcessNotificationReceiver)

    expect(mockStartProcessNotificationReceiver.startLanguageSettingProcess).not.toHaveBeenCalled();
    expect(mockStartProcessNotificationReceiver.startWelcomeProcess).toHaveBeenCalled();
  });

  it('if the user has not yet received the initial welcomed then data saving confirmation should be called', () => {
    let welcomer = AppStarter.getWelcomeInformer();
    spyOn(welcomer as any, 'isLanguageSet').and.returnValue(true);
    spyOn(welcomer as any, 'isUserInformed').and.returnValue(true);
    spyOn(welcomer as any, 'isDataSavingConfirmed').and.returnValue(false);

    AppStarter.setStartProcessNotificationReceiverAndStart(mockStartProcessNotificationReceiver)

    expect(mockStartProcessNotificationReceiver.startLanguageSettingProcess).not.toHaveBeenCalled();
    expect(mockStartProcessNotificationReceiver.startWelcomeProcess).not.toHaveBeenCalled();
    expect(mockStartProcessNotificationReceiver.startDataSavingConfirmationProcess).toHaveBeenCalled();
  });

  it('if the user has confirmed data saving then start completion should be called', () => {
    let welcomer = AppStarter.getWelcomeInformer();
    spyOn(welcomer as any, 'isLanguageSet').and.returnValue(true);
    spyOn(welcomer as any, 'isUserInformed').and.returnValue(true);
    spyOn(welcomer as any, 'isDataSavingConfirmed').and.returnValue(true);
    AppStarter.setStartProcessNotificationReceiverAndStart(mockStartProcessNotificationReceiver);
    expect(mockStartProcessNotificationReceiver.startLanguageSettingProcess).not.toHaveBeenCalled();
    expect(mockStartProcessNotificationReceiver.startWelcomeProcess).not.toHaveBeenCalled();
    expect(mockStartProcessNotificationReceiver.startDataSavingConfirmationProcess).not.toHaveBeenCalled();
    expect(mockStartCompletionReceiver.completeStartProcess).toHaveBeenCalled();
  });

  it('should log an error if startCompletionReceiver is not set', () => {
    let welcomer = AppStarter.getWelcomeInformer() as any;
    AppStarter.setStartCompletionReceiver(undefined as any);
    let loggerSpy = spyOn(welcomer['logger'], 'error');
    AppStarter.setStartProcessNotificationReceiverAndStart(mockStartProcessNotificationReceiver);

    expect(loggerSpy).toHaveBeenCalledWith('Start process is not completed. StartCompletionReceiver is not set.');
  });



});



//   it('should be created', () => {

//     const loggerSpy = spyOn(appStarter['logger'], 'debug');
//     let receiver = AppStarter.setStartProcessNotificationReceiver
//     expect(loggerSpy).toHaveBeenCalledWith('StartDispatcher is created.');
//   });
 

//   it('should proceed to language setting if language is not set', () => {
//     spyOn(appStarter as any, 'isLanguageSet').and.returnValue(false);

//     appStarter['start']();

//     expect(mockStartProcessNotificationReceiver.startLanguageSettingProcess).toHaveBeenCalled();
//   });

//   it('should proceed to user information if language is set', () => {
//     spyOn(appStarter as any, 'isLanguageSet').and.returnValue(true);
//     spyOn(appStarter as any, 'isUserInformed').and.returnValue(false);

//     appStarter['start']();

//     expect(mockStartProcessNotificationReceiver.startWelcomeProcess).toHaveBeenCalled();
//   });

//   it('should proceed to data saving confirmation if user is informed', () => {
//     spyOn(appStarter as any, 'isLanguageSet').and.returnValue(true);
//     spyOn(appStarter as any, 'isUserInformed').and.returnValue(true);
//     spyOn(appStarter as any, 'isDataSavingConfirmed').and.returnValue(false);

//     appStarter['start']();

//     expect(mockStartProcessNotificationReceiver.startDataSavingConfirmationProcess).toHaveBeenCalled();
//   });

//   it('should complete the start process if all conditions are met', () => {
//     spyOn(appStarter as any, 'isLanguageSet').and.returnValue(true);
//     spyOn(appStarter as any, 'isUserInformed').and.returnValue(true);
//     spyOn(appStarter as any, 'isDataSavingConfirmed').and.returnValue(true);

//     appStarter['start']();

//     expect(mockStartCompletionReceiver.completeStartProcess).toHaveBeenCalled();
//   });

//   it('should log an error if startCompletionReceiver is not set', () => {
//     AppStarter.setStartCompletionReceiver(undefined as any);
//     const loggerSpy = spyOn(appStarter['logger'], 'error');

//     appStarter['start']();

//     expect(loggerSpy).toHaveBeenCalledWith('Start process is not completed. StartCompletionReceiver is not set.');
//   });




