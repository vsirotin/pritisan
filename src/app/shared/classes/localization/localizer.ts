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
          "expand_all": "Expand All",
          "collapse_all": "Collapse All",
          "language": "Language:",
          "appearance": "Appearance",
          "set_options_for_appearance": "Set appearance options",
          "rules": "Rules",
          "set_rules": "Set rules for automatic data deletion, etc."
        }`;

    this.currentLanguageMap = new Map(Object.entries(JSON.parse(load)));

  }

  getTranslation(key: string): string {
    this.logger.trace("Start of Localizer.getTranslation");

    let val = this.currentLanguageMap.get(key);
    if (val) {
      return val;
    }
    else {
      this.logger.warn("Not found value for key " + key);
      return "NOT FOUND: " + key + " for " + this.currentLanguage;
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






