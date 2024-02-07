import {Component, ViewChild, OnInit, OnDestroy} from '@angular/core';
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
import {ILanguageDescription, LanguageSelectionNotificationService,  inSupportedLanguages} from '../../services/language-selection/language-selection-notification.service';
import {Subscription} from 'rxjs/internal/Subscription';
import {ILocalizer, Localizer} from '../../../shared/classes/localization/localizer';
import {Logger} from '../../../shared/services/logging/logger';



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
export class SettingsComponent implements OnInit, OnDestroy  {
  @ViewChild(MatAccordion) accordion?: MatAccordion;

  private subscription: Subscription;
  private localizer: ILocalizer;

  langOrigin: string = ""
  langEn: string = ""
  langEtfTag = "" 

  constructor(private languageSelectionNotificationService: LanguageSelectionNotificationService,
    private logger: Logger ) {
    this.logger.debug("Start of SettingsComponent.constructor");  

    this.localizer =  new Localizer("features/components/settings", 
    1, 
    this.languageSelectionNotificationService.selectionChanged$, 
    logger);

    this.subscription = this
      .languageSelectionNotificationService.selectionChanged$
      .subscribe((selectedLanguage: ILanguageDescription) => {
      this.langOrigin = selectedLanguage.originalName;
      this.langEn = selectedLanguage.enName
      this.langEtfTag = selectedLanguage.ietfTag
    });
  }

  ngOnInit() {
    this.logger.debug("Start of SettingsComponent.ngOnInit");
    this.trySetLanguage();
  }

  ngOnDestroy() {
    this.logger.debug("Start of SettingsComponent.ngDestroy");
    this.subscription.unsubscribe();
  }

  trySetLanguage() {
    this.logger.debug("Start of SettingsComponent.trySetLanguage");
    let savedLangEtfTag = localStorage.getItem("langEtfTag")

    if(typeof savedLangEtfTag !== 'string'){
      savedLangEtfTag = navigator.language;
    }

    if(!inSupportedLanguages(savedLangEtfTag)){
      savedLangEtfTag = "en-US";
    }

    this.languageSelectionNotificationService.setLanguage(savedLangEtfTag as string)
  }

  t(key: string, defaultText: string): string {
    return this.localizer.getTranslation(key, defaultText);
  }
}
