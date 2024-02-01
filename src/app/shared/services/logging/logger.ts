import { Injectable } from '@angular/core';
import { Inject } from '@angular/core';

/**
 * Logger is a service that provides methods for logging messages to the console.
 * It is injectable and provided in the root, meaning it can be used anywhere in the application.
 * 
 * Recommended usage:
 * trace() - Use to technical log. Should be offen called in mostly functions, but rerely switched on in runtime because a lot of output.
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
   * 
   * @private
   * @type {number}
   */
  private _logLevel: number = 0;

  constructor(@Inject(Number) private logLevel: number = 5) {
    this._logLevel = logLevel;
  }

  /**
   * Sets the log level.
   * @param logLevel 
   */
  setLogLevel(logLevel: number) {   
    this._logLevel = logLevel;
  }

  /**
   * Gets the current log level.
   * @returns {number} The current log level.
   */
  getLogLevel(): number { 
    return this._logLevel;
  }

  /**
   * Logs a stack trace to the console.
   * 
   * @param {string} message - The message to include in the stack trace.
   */
  track(message: string) {
    if(this._logLevel <= 0)console.trace(message);
  }

  /**
   * Logs a message to the console.
   * 
   * @param {string} message - The message to log.
   */
  log(message: string) {
    if(this._logLevel <= 1)console.log(message);
  }

  /**
   * Logs a warning message to the console.
   * 
   * @param {string} message - The warning message to log.
   */
  warn(message: string) {
    if(this._logLevel <= 2)console.warn(message);
  }
  
  /**
   * Logs an error message to the console.
   * 
   * @param {string} message - The error message to log.
   */
  error(message: string) {
    if(this._logLevel <= 3)console.error(message);
  }

}
