import { Observable, Subject, Subscription } from "rxjs";
import { ILanguageDescription, inSupportedLanguages, DEFAULT_LANG_TAG } from './language-description';
import { Logger } from "../../services/logging/logger";
import { Warning } from "../problems/problems";
import { DbAgent, IKeyValueDB } from "../db/db-agent";
import { ILanguageChangeNotificator, LanguageChangeNotificator } from "./language-change-notificator";


const KEY_SAVING_LANGUAGE = "currentLanguage";

export class Localizer implements ILocalizer{

  static languageChangeNotificator: ILanguageChangeNotificator = new LanguageChangeNotificator(); 

  dbAgent: IKeyValueDB = new DbAgent();
  currentLanguage: LanguageData;
  private currentLanguageMap: Map<string, string> = new Map<string, string>();

  private subject = new Subject<LanguageData>();
  languageChanged$ = this.subject.asObservable();

  private subscription: Subscription;
  private languageChange$: Observable<ILanguageDescription> = Localizer.languageChangeNotificator.selectionChanged$;

  constructor(private componentCooordinate: string,
    private componentVersion : number,

    private logger: Logger) { 
    this.logger.debug("Start of Localizer.constructor"); 

    this.currentLanguage = this.initializeLanguage();

    this.subscription = this
      .languageChange$
      .subscribe((selectedLanguage: ILanguageDescription) => {
        this.logger.debug("Start of subscription in Localizer.constructor this.currentLanguage=" 
        + this.currentLanguage.ietfTag 
        + " selectedLanguage=" + JSON.stringify(selectedLanguage)); 

        this.setLanguage(selectedLanguage.ietfTag);
      });
  }

  private initializeLanguage(): LanguageData {
    let savedLangEtfTag = this.dbAgent.get(KEY_SAVING_LANGUAGE);
    this.logger.debug("In Localizer.constructor  savedLangEtfTag=" + savedLangEtfTag);
    if (savedLangEtfTag == null) {
      savedLangEtfTag = navigator.language;
    }

    if (!inSupportedLanguages(savedLangEtfTag)) {
      savedLangEtfTag = DEFAULT_LANG_TAG;
    }

    this.setLanguage(savedLangEtfTag);
    return new LanguageData(savedLangEtfTag);
  }

  private setLanguage(ietfTag: string) {

    this.currentLanguage = new LanguageData(ietfTag);
    this.dbAgent.set(KEY_SAVING_LANGUAGE, this.currentLanguage.ietfTag);

    if(this.currentLanguage.ietfTag == DEFAULT_LANG_TAG) {
      this.setDefaultLanguage();
      return;
    }
    this.loadLanguageMap();
  }

  private setDefaultLanguage() {
    this.currentLanguage = new LanguageData(DEFAULT_LANG_TAG);
    this.logger.debug("Language is DEFAULT_LANG_TAG, no need to fetch the language file");
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
        let key = this.generateKeyForLoadingLanguageMap();

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
    
    let key = this.generateKeyForLoadingLanguageMap();

    let res = this.dbAgent.get(key);
    this.logger.debug("In Localizer.loadLanguageMapFromDb (1) key=" + key + " res=" + res); 
    if(res == null) return null;

    const jsonObject = JSON.parse(res);
    const map = new Map<string, string>(Object.entries(jsonObject));
    this.logger.debug("In Localizer.loadLanguageMapFromDb (2) map=" + JSON.stringify(Object.fromEntries(map))); 
    return map;
  }

  private generateKeyForLoadingLanguageMap(): string {
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
    if(this.currentLanguage.ietfTag == DEFAULT_LANG_TAG) {
      this.logger.debug("Language is DEFAULT_LANG_TAG, no need to fetch the language file");
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








