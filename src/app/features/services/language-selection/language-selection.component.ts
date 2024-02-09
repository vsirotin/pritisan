
import {Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatRadioModule} from '@angular/material/radio';
import {LanguageSelectionNotificationService} from './language-selection-notification.service'
import { SupportedLanguages } from '../../../shared/classes/localization/language-description';

/**
 * @title Accordion with expand/collapse all toggles
 */
@Component({
  selector: 'app-language-selection',
  templateUrl: './language-selection.component.html',
  styleUrl: './language-selection.component.scss',
  standalone: true,
  imports: [
    MatRadioModule, 
    FormsModule
  ],
})

export class LanguageSelectionComponent {
  selectedLangCode?: string;

  supportedLanguages = SupportedLanguages;
  
  static langEtfTags: string;

  constructor(private selectedLanguageService: LanguageSelectionNotificationService){}

  onRadioChange() {
    let selLang = SupportedLanguages.filter((lang) => lang.ietfTag == this.selectedLangCode)[0];
    this.selectedLanguageService.selectionChanged(selLang);
    this.selectedLanguageService.setLanguage(selLang.ietfTag);
  }
}


