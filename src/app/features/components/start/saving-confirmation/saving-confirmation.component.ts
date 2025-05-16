import { Component, OnDestroy, Input, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ILogger, LoggerFactory } from '@vsirotin/log4ts';
import { ILocalizer, ILocalizationClient, LocalizerFactory } from '@vsirotin/localizer';
import { AppStarter } from '../../../classes/app-starter';

import * as uiItems from '../../../../../assets/languages/features/components/start/saving-confirmation/lang/1/en-US.json';

const MY_DIR = "assets/languages/features/components/start/saving-confirmation/lang";

interface UIItems {
  title: string;
  btn_next: string;
}
@Component({
  selector: 'app-saving-confirmation',
  imports: [
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './saving-confirmation.component.html',
  styleUrl: './saving-confirmation.component.scss'
})
export class SavingConfirmationComponent implements OnDestroy, ILocalizationClient<UIItems>{

  logger: ILogger = LoggerFactory.getLogger("eu.sirotin.pritisan.SavingConfirmationComponent");

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
    AppStarter.getSavingDataConfirmation().setDataSavingConfirmation();
  }

  updateLocalization(data: UIItems): void {
    this.logger.debug("Start of updateLocalization data=" + JSON.stringify(data));
    this.ui = data;
  }
 

}
