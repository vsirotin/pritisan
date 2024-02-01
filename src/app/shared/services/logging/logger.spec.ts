import { TestBed } from '@angular/core/testing';

import { Logger } from './logger';

describe('Logger', () => {
  let service: Logger;
  let consoleSpyLog: jasmine.Spy;
  let consoleSpyWarn: jasmine.Spy;
  let consoleSpyError: jasmine.Spy;
  let consoleSpyTrace: jasmine.Spy;

  beforeEach(() => {
    service = new Logger();
    consoleSpyLog = spyOn(console, 'log');
    consoleSpyWarn = spyOn(console, 'warn');
    consoleSpyError = spyOn(console, 'error');
    consoleSpyTrace = spyOn(console, 'trace');
  });

  afterEach(() => {
    consoleSpyLog.calls.reset();
    consoleSpyWarn.calls.reset();
    consoleSpyError.calls.reset();
    consoleSpyTrace.calls.reset();

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('by default no levels should be logged', () => {
    service.log('test');
    expect(consoleSpyLog).not.toHaveBeenCalledWith('test');
    
    service.warn('test'); 
    expect(consoleSpyWarn).not.toHaveBeenCalledWith('test');

    service.error('test');
    expect(consoleSpyError).not.toHaveBeenCalledWith('test');

    service.track('test');
    expect(consoleSpyTrace).not.toHaveBeenCalledWith('test');

  });

  it('by level 5 no levels should be logged', () => {
    service.setLogLevel(5);
    service.log('test');
    expect(consoleSpyLog).not.toHaveBeenCalledWith('test');
    
    service.warn('test'); 
    expect(consoleSpyWarn).not.toHaveBeenCalledWith('test');

    service.error('test');
    expect(consoleSpyError).not.toHaveBeenCalledWith('test');

    service.track('test');
    expect(consoleSpyTrace).not.toHaveBeenCalledWith('test');

  });

  it('by level 20 no levels should be logged', () => {
    service.setLogLevel(20);
    service.log('test');
    expect(consoleSpyLog).not.toHaveBeenCalledWith('test');
    
    service.warn('test'); 
    expect(consoleSpyWarn).not.toHaveBeenCalledWith('test');

    service.error('test');
    expect(consoleSpyError).not.toHaveBeenCalledWith('test');

    service.track('test');
    expect(consoleSpyTrace).not.toHaveBeenCalledWith('test');

  });

  it('by level 0  all levels should be logged', () => {
    service.setLogLevel(0);
    service.log('test');
    expect(consoleSpyLog).toHaveBeenCalledWith('test');
    
    service.warn('test'); 
    expect(consoleSpyWarn).toHaveBeenCalledWith('test');

    service.error('test');
    expect(consoleSpyError).toHaveBeenCalledWith('test');

    service.track('test');
    expect(consoleSpyTrace).toHaveBeenCalledWith('test');

  });

  it('by level -3  all levels should be logged', () => {
    service.setLogLevel(-3);
    service.log('test');
    expect(consoleSpyLog).toHaveBeenCalledWith('test');
    
    service.warn('test'); 
    expect(consoleSpyWarn).toHaveBeenCalledWith('test');

    service.error('test');
    expect(consoleSpyError).toHaveBeenCalledWith('test');

    service.track('test');
    expect(consoleSpyTrace).toHaveBeenCalledWith('test');

  });

  it('by level 3  only errors should be logged', () => {
    service.setLogLevel(3);

    service.track('test');
    expect(consoleSpyTrace).not.toHaveBeenCalledWith('test');

    service.log('test');
    expect(consoleSpyLog).not.toHaveBeenCalledWith('test');
    
    service.warn('test'); 
    expect(consoleSpyWarn).not.toHaveBeenCalledWith('test');

    service.error('test');
    expect(consoleSpyError).toHaveBeenCalledWith('test');

  });

  it('by level 2  only errors and warnings should be logged', () => {
    service.setLogLevel(2);

    service.track('test');
    expect(consoleSpyTrace).not.toHaveBeenCalledWith('test');

    service.log('test');
    expect(consoleSpyLog).not.toHaveBeenCalledWith('test');
    
    service.warn('test'); 
    expect(consoleSpyWarn).toHaveBeenCalledWith('test');

    service.error('test');
    expect(consoleSpyError).toHaveBeenCalledWith('test');

  });

  it('by level 1  errors, warnings and log should be logged', () => {
    service.setLogLevel(1);

    service.track('test');
    expect(consoleSpyTrace).not.toHaveBeenCalledWith('test');

    service.log('test');
    expect(consoleSpyLog).toHaveBeenCalledWith('test');
    
    service.warn('test'); 
    expect(consoleSpyWarn).toHaveBeenCalledWith('test');

    service.error('test');
    expect(consoleSpyError).toHaveBeenCalledWith('test');

  });

  it('by changing in runtime correct behaviour', () => {
    service.setLogLevel(2);

    service.track('test');
    expect(consoleSpyTrace).not.toHaveBeenCalledWith('test');

    service.log('test');
    expect(consoleSpyLog).not.toHaveBeenCalledWith('test');
    
    service.warn('test'); 
    expect(consoleSpyWarn).toHaveBeenCalledWith('test');

    service.error('test');
    expect(consoleSpyError).toHaveBeenCalledWith('test');

    let currentLevel = service.getLogLevel();
    expect(currentLevel).toBe(2);

    service.setLogLevel(1);
    service.track('test');
    expect(consoleSpyTrace).not.toHaveBeenCalledWith('test');

    service.log('test');
    expect(consoleSpyLog).toHaveBeenCalledWith('test');
    
    service.warn('test'); 
    expect(consoleSpyWarn).toHaveBeenCalledWith('test');

    service.error('test');
    expect(consoleSpyError).toHaveBeenCalledWith('test');

    currentLevel = service.getLogLevel();
    expect(currentLevel).toBe(1);

  });
});
