import { Observable } from "rxjs";
import { ILanguageDescription } from "../../../features/services/language-selection/language-selection-notification.service";
import { Logger } from "../../services/logging/logger";
import { Warning } from "../problems/problems";

const SOURCE_COORDINATE = "SH-CL-LO-LO-";

export class Localizer implements ILocalizer{

  currentLanguage: string = "en-US";
  currentLanguageMap: Map<string, string> = new Map<string, string>();

  constructor(private componentCooordinate: string,
    private componentVersion : number,
    private languageChangeNotificator: | Observable<ILanguageDescription> | undefined,
    private logger: Logger) { 

    this.logger.debug("Start of Localizer.constructor"); 
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

  currentLanguage: string ;
  currentLanguageMap: Map<string, string>;
}






