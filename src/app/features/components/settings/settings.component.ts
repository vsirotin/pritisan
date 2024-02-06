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
import {LanguageSelectionComponent} from '../../services/language-selection/language-selection.component'
import {LanguageDescription, LanguageSelectionNotificationService,  inSupportedLanguages} from '../../services/language-selection/language-selection-notification.service';
import {Subscription} from 'rxjs/internal/Subscription';
import {ILocalizer, Localizer} from '../../../shared/classes/localization/localizer';
import {Logger} from '../../../shared/services/logging/logger';
import * as jsonData from '../../../../assets/languages/features/components/settings/en-US.json';
//import * as jsonData from './en-US.json';



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
  private localizer: ILocalizer;

  langOrigin: string = ""
  langEn: string = ""
  langEtfTag = "" 

  data: any = jsonData

  constructor(private languageSelectionNotificationService: LanguageSelectionNotificationService,
    private logger: Logger ) {
    this.logger.trace("Start of SettingsComponent.constructor");  

    this.localizer =  new Localizer("features/components/settings", 
    1, 
    this.languageSelectionNotificationService.selectionChanged$, 
    logger);

    this.localizer.currentLanguageMap = new Map(Object.entries(jsonData));
     
    this.subscription = this
      .languageSelectionNotificationService.selectionChanged$
      .subscribe((selectedLanguage: LanguageDescription) => {
      this.langOrigin = selectedLanguage.originalName;
      this.langEn = selectedLanguage.enName
      this.langEtfTag = selectedLanguage.ietfTag
    });
  }

  ngOnInit() {
    this.logger.trace("Start of SettingsComponent.ngOnInit");
    this.trySetLanguage();
  }

  trySetLanguage() {
    this.logger.trace("Start of SettingsComponent.trySetLanguage");
    let savedLangEtfTag = localStorage.getItem("langEtfTag")

    if(typeof savedLangEtfTag !== 'string'){
      savedLangEtfTag = navigator.language;
    }

    if(!inSupportedLanguages(savedLangEtfTag)){
      savedLangEtfTag = "en-US";
    }

    this.languageSelectionNotificationService.setLanguage(savedLangEtfTag as string)
  }

  t(key: string): string {
    this.logger.trace("Start of SettingsComponent.t");
    return this.localizer.getTranslation(key);
  }


}
