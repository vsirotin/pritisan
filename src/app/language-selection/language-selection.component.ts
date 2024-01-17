
import {Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatRadioModule} from '@angular/material/radio';
import {LanguageSelectionNotificationService} from './language-selection-notification.service'

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

  languages: Array<LanguageDescription> = [
    {"enName": "Arabic", "originalName": "العربية", "ietfTag": "ar-SA"},
    {"enName": "Bengali", "originalName": "বাংলা", "ietfTag": "bn-BD"},
    {"enName": "Bulgarian", "originalName": "български", "ietfTag": "bg-BG"},
    {"enName": "Catalan, Valencian", "originalName": "català, valencià", "ietfTag": "ca-ES"},
    {"enName": "Chinese", "originalName": "中文", "ietfTag": "zh-CN"},
    {"enName": "Croatian", "originalName": "hrvatski", "ietfTag": "hr-HR"},
    {"enName": "Czech", "originalName": "český", "ietfTag": "cs-CZ"},
    {"enName": "Danish", "originalName": "dansk", "ietfTag": "da-DK"},
    {"enName": "Dutch, Flemish", "originalName": "Nederlands, Vlaams", "ietfTag": "nl-NL"},
    {"enName": "English", "originalName": "English", "ietfTag": "en-US"},
    {"enName": "Estonian", "originalName": "eesti", "ietfTag": "et-EE"},
    {"enName": "Finnish", "originalName": "suomi", "ietfTag": "fi-FI"},
    {"enName": "French", "originalName": "français", "ietfTag": "fr-FR"},
    {"enName": "German", "originalName": "Deutsch", "ietfTag": "de-DE"},
    {"enName": "Greek", "originalName": "Ελληνικά", "ietfTag": "el-GR"},
    {"enName": "Hebrew", "originalName": "עברית", "ietfTag": "he-IL"},
    {"enName": "Hungarian", "originalName": "magyar", "ietfTag": "hu-HU"},
    {"enName": "Indonesian", "originalName": "Bahasa Indonesia", "ietfTag": "id-ID"},
    {"enName": "Italian", "originalName": "italiano", "ietfTag": "it-IT"},
    {"enName": "Japanese", "originalName": "日本語", "ietfTag": "ja-JP"},
    {"enName": "Korean", "originalName": "한국어", "ietfTag": "ko-KR"},
    {"enName": "Latvian", "originalName": "latviešu", "ietfTag": "lv-LV"},
    {"enName": "Lithuanian", "originalName": "lietuvių", "ietfTag": "lt-LT"},
    {"enName": "Norwegian", "originalName": "Norsk", "ietfTag": "no-NO"},
    {"enName": "Norwegian Bokmål", "originalName": "Norsk bokmål", "ietfTag": "nb-NO"},
    {"enName": "Persian", "originalName": "فارسی", "ietfTag": "fa-IR"},
    {"enName": "Polish", "originalName": "polski", "ietfTag": "pl-PL"},
    {"enName": "Portuguese", "originalName": "Português", "ietfTag": "pt-PT"},
    {"enName": "Punjabi", "originalName": "ਪੰਜਾਬੀ", "ietfTag": "pa-IN"},
    {"enName": "Romanian", "originalName": "română", "ietfTag": "ro-RO"},
    {"enName": "Russian", "originalName": "Русский", "ietfTag": "ru-RU"},
    {"enName": "Serbian", "originalName": "српски", "ietfTag": "sr-RS"},
    {"enName": "Slovak", "originalName": "slovenčina", "ietfTag": "sk-SK"},
    {"enName": "Slovenian", "originalName": "slovenščina", "ietfTag": "sl-SI"},
    {"enName": "Spanish", "originalName": "Español", "ietfTag": "es-ES"},
    {"enName": "Swedish", "originalName": "svenska", "ietfTag": "sv-SE"},
    {"enName": "Thai", "originalName": "ไทย", "ietfTag": "th-TH"},
    {"enName": "Turkish", "originalName": "Türkçe", "ietfTag": "tr-TR"},
    {"enName": "Ukrainian", "originalName": "українська", "ietfTag": "uk-UA"},
    {"enName": "Vietnamese", "originalName": "Tiếng Việt", "ietfTag": "vi-VN"}
  ];

  constructor(private selectedLanguageService: LanguageSelectionNotificationService){}

  onRadioChange() {
    let selLang = this.languages.filter((lang) => lang.ietfTag == this.selectedLangCode)[0];
    this.selectedLanguageService.selectionChanged(selLang);
  }
}

export interface LanguageDescription {
  enName: string,
  originalName: string,
  ietfTag: string
}
