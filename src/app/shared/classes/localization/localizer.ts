import { Observable, Subject, Subscription } from "rxjs";
import { ILanguageDescription } from './language-description';
import { Logger } from "../../services/logging/logger";
import { Warning } from "../problems/problems";
import { OnDestroy, OnInit } from "@angular/core";

const SOURCE_COORDINATE = "SH-CL-LO-LO-";
const DEFAULT_LANGUAGE = "en-US";

export class Localizer implements ILocalizer{

  currentLanguage: LanguageData|undefined = undefined;
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
        this.logger.debug("Start of subscription in Localizer.constructor this.currentLanguage=" + this.currentLanguage); 
        this.currentLanguage = new LanguageData(selectedLanguage.ietfTag);

        if(this.currentLanguage?.ietfTag === DEFAULT_LANGUAGE) {
          this.logger.debug("Language is en-US, no need to fetch the language file");
          this.currentLanguageMap = new Map<string, string>();
          this.subject.next(this.currentLanguage);
          return;
        }

        let path = componentCooordinate +this.currentLanguage.ietfTag + ".json";
        //fetch the language file from path
        fetch(path)
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status} by fetching from ${path}`);
          }
          return response.json();
        })
        .then(data => {
          this.logger.debug("Processing of data in subscription in Localizer.constructor data=" + JSON.stringify(data)); 
          this.currentLanguageMap = new Map(Object.entries(data));

          if (this.currentLanguage) {
            this.subject.next(this.currentLanguage);
          }
        })
        .catch(error => {
          this.logger.error('There was a problem with the fetch operation: error=' + error);
        });
      }); //end of subscription
  }

  destructor() {
    this.logger.debug("Start of Logger.destructor");
    this.subscription.unsubscribe();
  }

  getTranslation(key: string, defaultText: string): string {
    this.logger.debug("Start of Localizer.getTranslation for key=" + key + " defaultText=" + defaultText + " currentLanguage=" + this.currentLanguage);

    if(this.currentLanguage?.ietfTag === "en-US") {
      this.logger.debug("Language is en-US, no need to fetch the language file");
      return defaultText;
    }

    let val = this.currentLanguageMap.get(key);
    let res: string|Warning
    if (val) {
      res = val;
    }
    else {
      this.logger.warn("Not found value for key " + key);
      res = defaultText;
    }
    this.logger.debug("Result of Localizer.getTranslation for key=" + key + " defaultText=" + defaultText + " is:" + res);
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






