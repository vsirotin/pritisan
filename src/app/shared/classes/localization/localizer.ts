import { Observable, Subject, Subscription } from "rxjs";
import { ILanguageDescription, inSupportedLanguages } from './language-description';
import { Logger } from "../../services/logging/logger";
import { Warning } from "../problems/problems";
import { DbAgent, IKeyValueDB } from "../db/db-agent";

const DEFAULT_LANGUAGE = "en-US";
const KEY_SAVING_LANGUAGE = "currentLanguage";

export class Localizer implements ILocalizer{


  dbAgent: IKeyValueDB = new DbAgent();
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
        this.dbAgent.set(KEY_SAVING_LANGUAGE, this.currentLanguage.ietfTag);

        if(this.currentLanguage.ietfTag === DEFAULT_LANGUAGE) {
          this.setDefaultLanguage();
          return;
        }
        this.loadLanguageMap();
      }); //end of subscription
  }

  private setDefaultLanguage() {
    this.currentLanguage = new LanguageData(DEFAULT_LANGUAGE);
    this.logger.debug("Language is en-US, no need to fetch the language file");
    this.currentLanguageMap = new Map<string, string>();
    this.subject.next(this.currentLanguage);
  }

  private loadLanguageMap() {
    this.logger.debug("Start of Localizer.loadLanguageMap componentCooordinate=" + this.componentCooordinate);
    let data: Map<string, string>|null = this.loadLanguageMapFromDb();

    if(data != null){
      this.currentLanguageMap = data;
    }else {
      let path = this.componentCooordinate + this.currentLanguage.ietfTag + ".json";
    //fetch the language map file from path
     fetch(path)
      .then(response => {
        if (!response.ok) {
          this.logger.warn(`HTTP error. Status= ${response.status} by fetching from ${path}`); 
          this.setDefaultLanguage();
        }
        return response.json(); 
      })
      .then(data => {
        this.logger.debug("Data loaded from server=" + JSON.stringify(data));
        this.currentLanguageMap = new Map<string, string>(Object.entries(data));
        let key = this.generateKey();

        this.dbAgent.set(key, JSON.stringify(data));
        this.subject.next(this.currentLanguage as LanguageData);
      })
      .catch(error => {
        this.logger.error('There was a problem with the fetch operation: error=' + error);  
        this.setDefaultLanguage(); 
      });
    }
    
  }

  private loadLanguageMapFromDb(): Map<string, string> | null {
    this.logger.debug("Start of Localizer.loadLanguageMapFromDb componentCooordinate=" + this.componentCooordinate 
      + " componentVersion=" + this.componentVersion);
    
    let key = this.generateKey();

    let res = this.dbAgent.get(key);
    this.logger.debug("In Localizer.loadLanguageMapFromDb (1) key=" + key + " res=" + res); 
    if(res == null) return null;

    const jsonObject = JSON.parse(res);
    const map = new Map<string, string>(Object.entries(jsonObject));
    this.logger.debug("In Localizer.loadLanguageMapFromDb (2) map=" + JSON.stringify(Object.fromEntries(map))); 
    return map;
  }

  private generateKey(): string {
    return  this.componentCooordinate.replace("assets/languages/features/", "") 
              + "-v" + this.componentVersion + "-" 
              + this.currentLanguage.ietfTag;
  }

  destructor() {
    this.logger.debug("Start of Logger.destructor");
    this.subscription.unsubscribe();
  }

  getTranslation(key: string, defaultText: string): string {

    let res: string  
    if(this.currentLanguage.ietfTag == DEFAULT_LANGUAGE) {
      this.logger.debug("Language is en-US, no need to fetch the language file");
      res = defaultText;
    }else {
      let val = this.currentLanguageMap.get(key);
   
      if (val) {
        res = val;
      }
      else {
        this.logger.warn("Not found value for key=" + key + " this.currentLanguage.ietfTag=" + this.currentLanguage.ietfTag + " defaultText=" + defaultText);
        res = defaultText;
      }
    }

    this.logger.debug("Result of Localizer.getTranslation for key=" + key 
      + " defaultText=" + defaultText 
      + " currentLanguage=" + this.currentLanguage.ietfTag
      + " res=" + res);
    return res;
  }

  private initDefaultLanguage(): LanguageData {
    let savedLangEtfTag = this.dbAgent.get(KEY_SAVING_LANGUAGE);
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








