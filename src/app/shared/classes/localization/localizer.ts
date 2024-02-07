import { Observable, Subscription } from "rxjs";
import { ILanguageDescription } from "../../../features/services/language-selection/language-selection-notification.service";
import { Logger } from "../../services/logging/logger";
import { Warning } from "../problems/problems";
import { OnDestroy, OnInit } from "@angular/core";

const SOURCE_COORDINATE = "SH-CL-LO-LO-";

export class Localizer implements ILocalizer{

  currentLanguage: string = "en-US";
  private currentLanguageMap: Map<string, string> = new Map<string, string>();

  private subscription: Subscription;

  constructor(private componentCooordinate: string,
    private componentVersion : number,
    private languageChangeNotificator: | Observable<ILanguageDescription>,
    private logger: Logger) { 

    this.logger.debug("Start of Localizer.constructor"); 

    this.subscription = this
      .languageChangeNotificator
      .subscribe((selectedLanguage: ILanguageDescription) => {
        this.logger.debug("Start of subscription in Localizer.constructor"); 
        this.currentLanguage = selectedLanguage.ietfTag

        let path = "assets/languages/features/components/settings/en-US.json";
        //fetch the language file from path
        fetch(path)
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then(data => {
          this.logger.debug("Processing of data in subscription in Localizer.constructor data=" + JSON.stringify(data)); 
          // handle data
        })
        .catch(error => {
          console.error('There was a problem with the fetch operation: ', error);
        });
      }); //end of subscription
  }

  destructor() {
    this.logger.debug("Start of Logger.destructor");
    this.subscription.unsubscribe();
  }

  getTranslation(key: string, defaultText: string): string {
    this.logger.debug("Start of Localizer.getTranslation");

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

  currentLanguage: string ;
}






