import { Injectable } from '@angular/core';

/**
 * Logger is a service that provides methods for logging messages to the console.
 * It is injectable and provided in the root, meaning it can be used anywhere in the application.
 */
@Injectable({
  providedIn: 'root'
})
export class Logger {

  constructor() { }

  /**
   * Logs a message to the console.
   * 
   * @param {string} message - The message to log.
   */
  log(message: string) {
    console.log(message);
  }

  /**
   * Logs a warning message to the console.
   * 
   * @param {string} message - The warning message to log.
   */
  warn(message: string) {
    console.warn(message);
  }
  
  /**
   * Logs an error message to the console.
   * 
   * @param {string} message - The error message to log.
   */
  error(message: string) {
    console.error(message);
  }

  /**
   * Logs a stack trace to the console.
   * 
   * @param {string} message - The message to include in the stack trace.
   */
  track(message: string) {
    console.trace(message);
  }
}
