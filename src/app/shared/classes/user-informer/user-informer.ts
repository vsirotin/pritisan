//import { ILocalizer, Localizer } from '../localization/localizer';

import { Subject } from 'rxjs';
import { Warning, Error } from '../problems/problems';
import { ILogger, LoggerFactory } from '@vsirotin/log4ts';

/**
 * Provides methods to inform the user about various logging events.
 */

export class UserInformer {

  private logger: ILogger = LoggerFactory.getLogger("eu.sirotin.pritisan.UserInformer");

//TODO
  constructor(private callrerCodeCoordinate: string, 
    private callee: Subject<Warning|Error>) { }

  /**
   * 
   * @param localWarninId Warning id in the caller code. Will be used in the log.
   * @param message Localized message to be logged, but not presented to the user.
   */
  warnUser(localWarninId: string = "W01", message: string){
    this.logger.warn('warnUser: localWarninId=' + localWarninId + ' message=' + message);
    const warning = new Warning(this.callrerCodeCoordinate, message);
    this.callee.next(warning);
  }

  /**
   * 
   * @param localErrorId Error id in the caller code. Will be used in the log.
   * @param message Localized message to be logged, but not presented to the user.
   */
  alertUser(localErrorId: string = "E01",  message: string){
    this.logger.error('alertUser: localErrorId=' + localErrorId + ' message=' + message);
    const error = new Error(this.callrerCodeCoordinate, message);
    this.callee.next(error);
  }
}

