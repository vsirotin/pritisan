import { TestBed, fakeAsync, tick } from '@angular/core/testing';

import { LanguageData, Localizer } from './localizer';
import { Observable, Subscription } from 'rxjs';
import { ILanguageChangeNotificator } from './language-change-notificator';
import { DEFAULT_LANG_TAG, ILanguageDescription } from './language-description';
import { Logger } from '../../services/logging/logger';

const TEST_SOURCE_DIR = "assets/languages/features/components/settings/lang/";

describe('Localizer', () => {
  let localizer: Localizer;
  let langDescr: ILanguageDescription;

  let langSelectNotificationService: ILanguageChangeNotificator = Localizer.languageChangeNotificator; 

  beforeEach(() => {
    let logger = new Logger();

    localizer = new Localizer(TEST_SOURCE_DIR, 1, logger);
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should be created', () => {
    expect(localizer).toBeTruthy();
  });

  it('by start has DEFAULT_LANG_TAG default language', () => {
    expect(localizer.currentLanguage?.ietfTag).toEqual(DEFAULT_LANG_TAG);
  });

  describe('after change the language on de-DE', () => {
    let languageChanged$: Observable<LanguageData>;

    let subscription: Subscription;
    
    beforeEach(() => {  
      languageChanged$ = localizer.languageChanged$;
      langDescr = {"enName": "German", "originalName": "Deutsch", "ietfTag": "de-DE"};
    });

    afterEach(() => {
      subscription.unsubscribe();
    });

    it('the selected language should be de-DE', (done) => {   
      subscription = languageChanged$
      .subscribe((languageTag: LanguageData) => {
        expect(languageTag.ietfTag).toEqual("de-DE");
        done();
      });
      langSelectNotificationService.selectionChanged(langDescr);
    });    

    it('the current language in localizer should be de-DE', (done) => {   
      subscription = languageChanged$
      .subscribe((slanguageTag: LanguageData) => {
        expect(localizer.currentLanguage?.ietfTag).toEqual("de-DE");
        done();
      });
      langSelectNotificationService.selectionChanged(langDescr);
    });  

    it('the localizer should have languageMap for de-DE', (done) => {   
      subscription = languageChanged$
      .subscribe((languageTag: LanguageData) => {
        expect(localizer.getTranslation('settings', 'not-exist')).toEqual("Einstellungen");
        done();
      });
      langSelectNotificationService.selectionChanged(langDescr);
    });    
  });

});



