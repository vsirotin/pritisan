import { TestBed } from '@angular/core/testing';

import { Localizer } from './localizer';
import { Observable, Subscription } from 'rxjs';
import { ILanguageDescription, LanguageSelectionNotificationService } from '../../../features/services/language-selection/language-selection-notification.service';
import { Logger } from '../../services/logging/logger';

describe('Localizer', () => {
  let localizer: Localizer;
  let langDescr: ILanguageDescription;
  let langSelectNotificationService: LanguageSelectionNotificationService 


  beforeEach(() => {
    let logger = new Logger();
    logger.setLogLevel(0);
    langSelectNotificationService = new LanguageSelectionNotificationService();
    localizer = new Localizer("test", 1, langSelectNotificationService.selectionChanged$, logger);

  });

  xit('should be created', () => {
    expect(localizer).toBeTruthy();
  });

  xit('by start has en-US default language', () => {
    expect(localizer.currentLanguage).toEqual("en-US");
  });

  describe('after change the language on de-DE', () => {
    let selectionChanged$: Observable<ILanguageDescription>;
    let subscription: Subscription;
    
    beforeEach(() => {  
      selectionChanged$ = langSelectNotificationService.selectionChanged$;
      langDescr = {"enName": "German", "originalName": "Deutsch", "ietfTag": "de-DE"};
      langSelectNotificationService.selectionChanged(langDescr);


      selectionChanged$ = langSelectNotificationService.selectionChanged$;
      langDescr = {"enName": "German", "originalName": "Deutsch", "ietfTag": "de-DE"};
    });

    afterEach(() => {
      subscription.unsubscribe();
    });

    xit('the current language should be de-DE', (done) => {   
      subscription = selectionChanged$
      .subscribe((selectedLanguage: ILanguageDescription) => {
        expect(selectedLanguage.ietfTag).toEqual("de-DE");
        done();
      });

      langSelectNotificationService.selectionChanged(langDescr);
    });    

    it('the localizer should have languageMap for de-DE', (done) => {   
      subscription = selectionChanged$
      .subscribe((selectedLanguage: ILanguageDescription) => {
        expect(localizer.currentLanguage).toEqual("de-DE");
        done();
      });

      langSelectNotificationService.selectionChanged(langDescr);
    });    
  });

});



