import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ILanguageDescription, SupportedLanguages } from '../../../shared/classes/localization/language-description';


@Injectable({
  providedIn: 'root'
})

export class LanguageSelectionNotificationService {

  constructor() { }

  private subject = new Subject<ILanguageDescription>();
  selectionChanged$ = this.subject.asObservable();

  selectedLanguage?: ILanguageDescription;

  selectionChanged(selectedLanguage: ILanguageDescription) {
    this.subject.next(selectedLanguage);
    this.selectedLanguage = selectedLanguage;
  }

  setLanguage(ietfTag: string) {
    this.selectedLanguage = SupportedLanguages.filter((lang) => lang.ietfTag == ietfTag)[0];
    this.subject.next(this.selectedLanguage);
  }
}

