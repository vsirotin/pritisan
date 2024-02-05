import { Observable } from "rxjs";
import { LanguageDescription } from "../../../features/services/language-selection/language-selection-notification.service";
import { Logger } from "../../services/logging/logger";

export class Localizer implements ILocalizer{

  currentLanguage: string = "en-US";
  currentLanguageMap: Map<string, string> = new Map<string, string>();

  constructor(private componentCooordinate: string,
    private componentVersion : number,
    private languageChangeNotificator: | Observable<LanguageDescription> | undefined,
    private logger: Logger) { 

    this.logger.trace("Start of Localizer.constructor");  

    const  load = `{
          "settings": "Settings",
          "other": "Other"
        }`;

    console.log("load=" + load);

    this.currentLanguageMap = new Map(Object.entries(JSON.parse(load)));

    console.log("1 this.currentLanguageMap =" + this.currentLanguageMap);   

    let x = this.getTranslation("settings");
    console.log("3 this.currentLanguageMap =" + this.currentLanguageMap); 
  }

  getTranslation(key: string): string {
    this.logger.trace("Start of Localizer.getTranslation");
    console.log("2 this.currentLanguageMap =" + JSON.stringify(this.currentLanguageMap)); 

    let val = this.currentLanguageMap.get(key);
    if (val) {
      return val;
    }
    else {
      return key;
    }
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
  getTranslation(key: string): string;
}






