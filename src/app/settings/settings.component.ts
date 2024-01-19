import {Component, ViewChild, OnInit} from '@angular/core';
import {MatAccordion, MatExpansionModule} from '@angular/material/expansion';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatNativeDateModule} from '@angular/material/core';
import {MatCardModule} from '@angular/material/card';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {LanguageSelectionComponent} from '../language-selection/language-selection.component'
import {LanguageDescription, LanguageSelectionNotificationService,  inSupportedLanguages} from '../language-selection/language-selection-notification.service';
import {Subscription} from 'rxjs/internal/Subscription';


/**
 * @title Accordion with expand/collapse all toggles
 */
@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [
    MatButtonModule,
    MatExpansionModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCardModule,
    MatProgressBarModule,
    LanguageSelectionComponent,
  ],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent implements OnInit  {
  @ViewChild(MatAccordion) accordion?: MatAccordion;

  private subscription: Subscription;

  langOrigin: string = ""
  langEn: string = ""
  langEtfTag = "" 

  constructor(private languageSelectionNotificationService: LanguageSelectionNotificationService) {
    this.subscription = this
      .languageSelectionNotificationService.selectionChanged$
      .subscribe((selectedLanguage: LanguageDescription) => {
      this.langOrigin = selectedLanguage.originalName;
      this.langEn = selectedLanguage.enName
      this.langEtfTag = selectedLanguage.ietfTag
    });
  }

  ngOnInit() {
    this.trySetLanguage();
  }

   trySetLanguage() {

    let savedLangEtfTag = localStorage.getItem("langEtfTag")

    if(typeof savedLangEtfTag !== 'string'){
      savedLangEtfTag = navigator.language;
      console.log('Browser Language:', savedLangEtfTag);
    }

    if(!inSupportedLanguages(savedLangEtfTag)){
      savedLangEtfTag = "en-US";
    }

    this.languageSelectionNotificationService.setLanguage(savedLangEtfTag as string)
  }
}
