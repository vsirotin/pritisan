import { Component, OnDestroy, Input, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { ILogger, LoggerFactory } from '@vsirotin/log4ts';
import { ILocalizer, ILocalizationClient, LocalizerFactory } from '@vsirotin/localizer';
import { AppStarter } from '../../../classes/app-starter';

import * as uiItems from '../../../../../assets/languages/features/components/start/welcome/lang/1/en-US.json';
import { WelcomeComponentGalery } from "./welcome-galery/welcome-galery.component";

const MY_DIR = "assets/languages/features/components/start/welcome/lang";
// export interface GalleryImage {
//   src: string;
//   alt: string; // Alt text for accessibility
//   label: string;
// };
interface UIItems {
  title: string;
  btn_next: string;
}
@Component({
  selector: 'app-welcome',
  imports: [
    ScrollingModule,
    MatIconModule,
    MatButtonModule,
    WelcomeComponentGalery
],
  standalone: true,
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.scss'
})
export class WelcomeComponent implements OnDestroy, ILocalizationClient<UIItems>{

  logger: ILogger = LoggerFactory.getLogger("eu.sirotin.pritisan.WelcomeComponent");

  private localizer: ILocalizer;

  ui: UIItems = (uiItems as any).default;

    constructor( ) {
      this.logger.debug("Start of constructor");  
  
      this.localizer  =  LocalizerFactory.createLocalizer<UIItems>(MY_DIR, 1, this.ui, this);

    
    }


  ngOnDestroy() {
    this.logger.debug("Start of ngDestroy");
    this.localizer.dispose();
  }

  onNextClick() {
    this.logger.debug("Start of onNextClick");
    AppStarter.getLanguageSetter().languageIsSet();
  }

  updateLocalization(data: UIItems): void {
    this.logger.debug("Start of updateLocalization data=" + JSON.stringify(data));
    this.ui = data;
  }
 

}
