import { Injectable } from '@angular/core';

export class Localizer {

  constructor(private callrerCodeCoordinate: string) { }

  getTranslation(key: string): string {
    throw new Error('Not implemented yet'); //TODO
  }
}
