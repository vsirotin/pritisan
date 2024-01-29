import { Injectable } from '@angular/core';

export class Localizer implements ILocalizer{

  constructor(private callrerCodeCoordinate: string) { }

  getTranslation(key: string): string {
    throw new Error('Not implemented yet'); //TODO
  }
}

export interface ILocalizer { 
  getTranslation(key: string): string;
}
