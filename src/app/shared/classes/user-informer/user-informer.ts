import { Localizer } from '../localization/localizer';
import { Logger } from '../../services/logging/logger';
import { Subject } from 'rxjs';

/**
 * Provides methods to inform the user about various logging events.
 */

export class UserInformer {

  private localizationService: Localizer;


  constructor(private callrerCodeCoordinate: string,  private logger: Logger, private callee: Subject<Warning|Error>) { 
    this.localizationService = new Localizer(callrerCodeCoordinate);
  }

  /**
   * 
   * @param localWarninId Warning id in the caller code. Will be used in the log.
   * @param messageKey Key of the message to be localized.
   * @param message Technical message to be logged, but not presented to the user.
   */
  warnUser(localWarninId: string = "W01", messageKey: string, message?: string){
    this.logger.warn('warnUser messageKey=' + messageKey + ' messageKey=' + messageKey + ' message=' + message);
    var { source, formattedTimestamp, localizedMessage } = this.prepareProblemProps(messageKey);
    const warning : Warning = {source, formattedTimestamp, localizedMessage};
    this.callee.next(warning);
  }

  /**
   * 
   * @param localErrorId Error id in the caller code. Will be used in the log.
   * @param messageKey Key of the message to be localized.
   * @param message Technical message to be logged, but not presented to the user.
   */
  allertUser(localErrorId: string = "E01", messageKey: string, message?: string){
    this.logger.warn('warnUser messageKey=' + messageKey + ' messageKey=' + messageKey + ' message=' + message);
    var { source, formattedTimestamp, localizedMessage } = this.prepareProblemProps(messageKey);
    const error : Error = {source, formattedTimestamp, localizedMessage};
    this.callee.next(error);
  }

  /**
   * Prepares the properties of a problem.
   * @param messageKey Problem message key.
   * @returns 
   */
  private prepareProblemProps(messageKey: string) {
    const localizedMessage = this.localizationService.getTranslation(messageKey);
    let t = new Date();
    let formattedTimestamp = `${t.getFullYear()}-${t.getMonth() + 1}-${t.getDate()} ${t.getHours()}:${t.getMinutes()}:${t.getSeconds()}.${t.getMilliseconds()}`;
    const source = this.callrerCodeCoordinate;
    return { source, formattedTimestamp, localizedMessage };
  }
}

/**
 * A problem that can be reported to the user.
 */
type Problem = {
  source: string;
  formattedTimestamp: string;
  localizedMessage: string;
};

export type Warning = Problem;
export type Error = Problem;

