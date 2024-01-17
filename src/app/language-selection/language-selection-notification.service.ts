import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { LanguageDescription } from './language-selection.component'

@Injectable({
  providedIn: 'root'
})
export class LanguageSelectionNotificationService {

  private subject = new Subject<LanguageDescription>();
  selectionChanged$ = this.subject.asObservable();

  selectedLanguage?: LanguageDescription;

  selectionChanged(selectedLanguage: LanguageDescription) {
    this.subject.next(selectedLanguage);
    this.selectedLanguage = selectedLanguage;
    console.log("selectionChanged =" + selectedLanguage);
  }

  constructor() { }

}
