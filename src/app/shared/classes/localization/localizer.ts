import { Observable, Subject, Subscription } from "rxjs";
import { ILanguageDescription, inSupportedLanguages, DEFAULT_LANG_TAG } from './language-description';
import { Logger } from "../../services/logging/logger";
import { Warning } from "../problems/problems";
import { DbAgent, IKeyValueDB } from "../db/db-agent";
import { ILanguageChangeNotificator, LanguageChangeNotificator } from "./language-change-notificator";


const KEY_SAVING_LANGUAGE = "currentLanguage";

export class Localizer implements ILocalizer {

  static languageChangeNotificator: ILanguageChangeNotificator = new LanguageChangeNotificator(); 

  dbAgent: IKeyValueDB = new DbAgent();
  currentLanguage: LanguageData = new LanguageData(DEFAULT_LANG_TAG);
  currentLanguageMap: Map<string, string> = new Map<string, string>();

  private subject = new Subject<LanguageData>();
  languageChanged$ = this.subject.asObservable();

  private subscription: Subscription;
  private languageChange$: Observable<ILanguageDescription> = Localizer.languageChangeNotificator.selectionChanged$;

  constructor(private componentCooordinate: string,
    private componentVersion : number,

    private logger: Logger) { 
    this.logger.debug("Start of Localizer.constructor"); 

    this.subscription = this
      .languageChange$
      .subscribe((selectedLanguage: ILanguageDescription) => {
        this.logger.debug("Start of subscription in Localizer.constructor this.currentLanguage=" 
        + this.currentLanguage.ietfTag 
        + " selectedLanguage=" + JSON.stringify(selectedLanguage)); 

        this.setLanguage(selectedLanguage.ietfTag);
      });
  }

  async initializeLanguage() {
    let savedLangEtfTag = this.dbAgent.get(KEY_SAVING_LANGUAGE);
    this.logger.debug("In Localizer.constructor  savedLangEtfTag=" + savedLangEtfTag);
    if (savedLangEtfTag == null) {
      savedLangEtfTag = navigator.language;
    }

    if (!inSupportedLanguages(savedLangEtfTag)) {
      savedLangEtfTag = DEFAULT_LANG_TAG;
    }

    await this.setLanguage(savedLangEtfTag);
    this.currentLanguage = new LanguageData(savedLangEtfTag);
  }

  private async setLanguage(ietfTag: string) {
    this.logger.debug("Start of Localizer.setLanguage ietfTag=" + ietfTag);

    this.currentLanguage = new LanguageData(ietfTag);
    this.dbAgent.set(KEY_SAVING_LANGUAGE, this.currentLanguage.ietfTag);

    if(this.currentLanguage.ietfTag == DEFAULT_LANG_TAG) {
      this.setDefaultLanguage();
      return;
    }
    await this.loadLanguageMap();
    this.logger.debug("End of Localizer.setLanguage");
  }

  private setDefaultLanguage() {
    this.logger.debug("Start of Localizer.setDefaultLanguage");
    this.currentLanguage = new LanguageData(DEFAULT_LANG_TAG);
    this.logger.debug("Language is DEFAULT_LANG_TAG, no need to fetch the language file");
    this.currentLanguageMap = new Map<string, string>();

  }



  private async loadLanguageMap() {
    this.logger.debug("Start of Localizer.loadLanguageMap componentCooordinate=" + this.componentCooordinate);
    this.loadLanguageMapFromDb.then(
      ()=>{ 
        //Nothing to do
      }, 
      ()=>{
        this.loadLanguageMapFromServer()
      });
    };

    private loadLanguageMapFromDb = new Promise((resolve, reject) =>{
      this.logger.debug("Start of Localizer.loadLanguageMapFromDb componentCooordinate=" + this.componentCooordinate 
        + " componentVersion=" + this.componentVersion);
      
      let key = this.generateKeyForLoadingLanguageMap();
  
      let res = this.dbAgent.get(key);
      this.logger.debug("In Localizer.loadLanguageMapFromDb (1) key=" + key + " res=" + res); 
      if(res == null) reject();
      
      const jsonObject = JSON.parse(res as string);
      const map = new Map<string, string>(Object.entries(jsonObject));
      this.logger.debug("In Localizer.loadLanguageMapFromDb (2) map=" + JSON.stringify(Object.fromEntries(map))); 
      if(map != null){
        this.currentLanguageMap = map;
        this.logger.debug("In Localizer.loadLanguageMapFromDb (3)  this.currentLanguageMap=" + JSON.stringify(Object.fromEntries( this.currentLanguageMap))); 
        resolve(true);
      }
      reject();
    });
    
  private async loadLanguageMapFromServer() {
    let path = this.componentCooordinate + this.currentLanguage.ietfTag + ".json";
    this.logger.debug("Localizer.loadLanguageMap: Fetching from " + path);
   await fetch(path)
    .then(response => {
      if (!response.ok) {
        this.logger.warn(`HTTP error. Status= ${response.status} by fetching from ${path}`); 
        this.setDefaultLanguage();
      }
      return response.json(); 
    })
    .then(data => {
      this.logger.debug("Localizer.loadLanguageMap: Data loaded from server=" + JSON.stringify(data));
      this.currentLanguageMap = new Map<string, string>(Object.entries(data));
      
      let key = this.generateKeyForLoadingLanguageMap();

      this.dbAgent.set(key, JSON.stringify(data));
      this.logger.debug("Localizer.loadLanguageMapp before call next this.currentLanguageMap=" + JSON.stringify(Object.fromEntries(this.currentLanguageMap)));
      this.subject.next(this.currentLanguage as LanguageData);
      this.logger.debug("Localizer.loadLanguageMapp after call next")
    })
    .catch(error => {
      this.logger.error('There was a problem with the fetch operation: error=' + error);  
      this.setDefaultLanguage(); 
    });
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








