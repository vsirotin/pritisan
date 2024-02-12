import { Observable, Subject, Subscription } from "rxjs";
import { ILanguageDescription, inSupportedLanguages } from './language-description';
import { Logger } from "../../services/logging/logger";
import { Warning } from "../problems/problems";
import { FasadeDB, IKeyValueDB } from "../db/fasade-db";

const DEFAULT_LANGUAGE = "en-US";
const KEY_SAVING_LANGUAGE = "currentLanguage";

export class Localizer implements ILocalizer{


  dbFasade: IKeyValueDB = new FasadeDB();
  currentLanguage: LanguageData = this.initDefaultLanguage();
  private currentLanguageMap: Map<string, string> = new Map<string, string>();

  private subject = new Subject<LanguageData>();
  languageChanged$ = this.subject.asObservable();

  private subscription: Subscription;

  constructor(private componentCooordinate: string,
    private componentVersion : number,
    private languageChangeNotificator: | Observable<ILanguageDescription>,
    private logger: Logger) { 
    this.logger.debug("Start of Localizer.constructor"); 

    this.subscription = this
      .languageChangeNotificator
      .subscribe((selectedLanguage: ILanguageDescription) => {
        this.logger.debug("Start of subscription in Localizer.constructor this.currentLanguage=" + this.currentLanguage.ietfTag); 
        this.currentLanguage = new LanguageData(selectedLanguage.ietfTag);
        this.dbFasade.set(KEY_SAVING_LANGUAGE, this.currentLanguage.ietfTag);

        if(this.currentLanguage.ietfTag === DEFAULT_LANGUAGE) {
          this.logger.debug("Language is en-US, no need to fetch the language file");
          this.currentLanguageMap = new Map<string, string>();
          this.subject.next(this.currentLanguage);
          return;
        }

        this.loadLanguageMapFromDbOrServer(componentCooordinate);
      }); //end of subscription
  }

  private loadLanguageMapFromDbOrServer(componentCooordinate: string) {
    this.logger.debug("Start of Localizer.loadLanguageMapFromDbOrServer componentCooordinate=" + componentCooordinate);
    let path = componentCooordinate + this.currentLanguage.ietfTag + ".json";
    //fetch the language file from path
    fetch(path)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status} by fetching from ${path}`);
        }
        return response.json();
      })
      .then(data => {
        this.logger.debug("Data loaded from server=" + JSON.stringify(data));
        this.currentLanguageMap = new Map(Object.entries(data));

        if (this.currentLanguage) {
          this.subject.next(this.currentLanguage);
        }
      })
      .catch(error => {
        this.logger.error('There was a problem with the fetch operation: error=' + error);
      });
  }

  destructor() {
    this.logger.debug("Start of Logger.destructor");
    this.subscription.unsubscribe();
  }

  getTranslation(key: string, defaultText: string): string {
    this.logger.debug("Start of Localizer.getTranslation for key=" + key + " defaultText=" + defaultText + " currentLanguage=" + this.currentLanguage);

    if(this.currentLanguage.ietfTag == DEFAULT_LANGUAGE) {
      this.logger.debug("Language is en-US, no need to fetch the language file");
      return defaultText;
    }

    let val = this.currentLanguageMap.get(key);
    let res: string|Warning
    if (val) {
      res = val;
    }
    else {
      this.logger.warn("Not found value for key " + key + "this.currentLanguage.ietfTag=" + this.currentLanguage.ietfTag + " defaultText=" + defaultText);
      res = defaultText;
    }
    this.logger.debug("Result of Localizer.getTranslation for key=" + key + " defaultText=" + defaultText + " is:" + res);
    return res;
  }

  private initDefaultLanguage(): LanguageData {
    let savedLangEtfTag = this.dbFasade.get(KEY_SAVING_LANGUAGE);
    this.logger.debug("Start of Localizer.initDefaultLanguage savedLangEtfTag=" + savedLangEtfTag);
    if(typeof savedLangEtfTag !== 'string'){
      this.logger.debug("No saved language, using navigator.language");
      savedLangEtfTag = navigator.language;
    }

    if(!inSupportedLanguages(savedLangEtfTag)){
      savedLangEtfTag = DEFAULT_LANGUAGE;
      this.logger.warn("Language " + savedLangEtfTag + " is not supported, using default language");
    }
    this.logger.log("End of Localizer.initDefaultLanguage savedLangEtfTag=" + savedLangEtfTag);
    return new LanguageData(savedLangEtfTag);
  }
}

/**
 * Interface for localizitation of used in UI labels, terms and information.
 */
export interface ILocalizer { 
  /**
   * Returns the translation of the given key in current language
   * @param key 
   */
  getTranslation(key: string, defaultText: string): string;

  destructor(): void;

  currentLanguage: LanguageData|undefined;

}

export class LanguageData {
  constructor(public ietfTag: string) {}
}






