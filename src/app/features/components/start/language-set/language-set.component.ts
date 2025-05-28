import { Component, OnDestroy, ViewChild } from '@angular/core';
import { MatAccordion, MatExpansionModule} from '@angular/material/expansion';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { LanguageSelectionComponent } from "../../../../shared/components/language-selection/language-selection.component";
import * as uiItems from '../../../../../assets/languages/features/components/start/language-set/lang/1/en-US.json';
import { ILogger, LoggerFactory } from '@vsirotin/log4ts';
import { ILanguageDescription, ILocalizer, ILocalizationClient, LocalizerFactory } from '@vsirotin/localizer';
import { Subscription } from 'rxjs';
import { AppStarter } from '../../../classes/app-starter';

const MY_DIR = "assets/languages/features/components/start/language-set/lang";

interface UIItems {
  label_title: string;
  label_language: string;
  btn_next: string;
}
@Component({
  selector: 'app-language-set',
  imports: [
    MatExpansionModule,
    MatAccordion,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    LanguageSelectionComponent
  ],
  templateUrl: './language-set.component.html',
  styleUrl: './language-set.component.scss'
})
export class LanguageSetComponent implements OnDestroy, ILocalizationClient<UIItems>{

  @ViewChild(MatAccordion) accordion?: MatAccordion;

  logger: ILogger = LoggerFactory.getLogger("eu.sirotin.pritisan.LanguageSetComponent");

  private localizer: ILocalizer;

  langOrigin: string = ""
  langEn: string = ""

  ui: UIItems = (uiItems as any).default;
  subscription: Subscription;

  constructor( ) {
    this.logger.debug("Start of constructor");  

    this.localizer  =  LocalizerFactory.createLocalizer<UIItems>(MY_DIR, 1, this.ui, this);
    this.subscription = LocalizerFactory.languageChangeNotificator.selectionChanged$.subscribe(
      (languageDescription: ILanguageDescription) => {
        this.logger.debug("Language changed to: " + JSON.stringify(languageDescription));
        this.langOrigin = languageDescription.originalName;
        this.langEn = languageDescription.enName;
        this.accordion?.closeAll();
    }); 
  }

  updateLocalization(data: UIItems): void {
    this.logger.debug("Start of updateLocalization data=" + JSON.stringify(data));
    this.ui = data;
  }


  ngOnDestroy() {
    this.logger.debug("Start of ngDestroy");
    this.localizer.dispose();
    this.subscription.unsubscribe();
  }

  onNextClick() {
    this.logger.debug("Start of onNextClick");
    AppStarter.getLanguageSetter().languageIsSet();
  }

}
