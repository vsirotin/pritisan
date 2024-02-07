import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';

/**
 * Logger is a service that provides methods for logging messages to the console.
 * It is injectable and provided in the root, meaning it can be used anywhere in the application.
 * 
 * Recommended usage:
 * debug() - Use to technical log. Should be offen called in mostly functions, but rerely switched on in runtime because a lot of output.
 * log() - Use to log bussiness logic. 
 * warn() - Use to log warnings: unexpected situations, but not errors. After this situation application should work correctly.
 * error() - Use to log errors: unexpected situations, when application can't work correctly.
 */
@Injectable({
  providedIn: 'root'
})
export class Logger {

  /**
   * The current log level.
   * Log levels are as follows:
   * 0 or negative - All messages are logged. (Default)
   * 1 - Only warning, error, and log messages are logged.
   * 2 - Only warning and error messages are logged.
   * 3 - Only error messages are logged.  
   * 4 or greater - No messages are logged.
   */
  private logLevel: number;

  constructor() {
    this.logLevel = environment.logLevel;
    this.log("Logger.constructor: logLevel=" + this.logLevel);
  }

  /**
   * Sets the log level.
   * @param logLevel 
   */
  setLogLevel(logLevel: number) {   
    this.logLevel = logLevel;
  }

  /**
   * Gets the current log level.
   * @returns {number} The current log level.
   */
  getLogLevel(): number { 
    return this.logLevel;
  }

  /**
   * Logs a stack debug to the console.
   * 
   * @param {string} message - The message to include in the stack debug.
   */
  debug(message: string) {
    if(this.logLevel <= 0)console.debug(message);
  }

  /**
   * Logs a message to the console.
   * 
   * @param {string} message - The message to log.
   */
  log(message: string) {
    if(this.logLevel <= 1)console.log(message);
  }

  /**
   * Logs a warning message to the console.
   * 
   * @param {string} message - The warning message to log.
   */
  warn(message: string) {
    if(this.logLevel <= 2)console.warn(message);
  }
  
  /**
   * Logs an error message to the console.
   * 
   * @param {string} message - The error message to log.
   */
  error(message: string) {
    if(this.logLevel <= 3)console.error(message);
  }

}
