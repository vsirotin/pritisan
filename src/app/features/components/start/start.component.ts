import { Component, OnInit } from '@angular/core';
import { IStartProcessNotificationReceiver, StartDispatcher } from '../../classes/start-dispatcher';
import { LanguageSetComponent } from "./language-set/language-set.component";
import { SavingConfirmationComponent } from "./saving-confirmation/saving-confirmation.component";
import { WelcomeComponent } from "./welcome/welcome.component";
import { LoggerFactory } from '@vsirotin/log4ts';


@Component({
  selector: 'app-start',
  imports: [LanguageSetComponent, SavingConfirmationComponent, WelcomeComponent],
  templateUrl: './start.component.html',
  styleUrl: './start.component.scss'
})
export class StartComponent implements OnInit, IStartProcessNotificationReceiver {

  currentCommponent: string = '';

  private logger = LoggerFactory.getLogger("StartComponent");

  ngOnInit(): void {
    this.logger.debug("Start of StartComponent initialization.");
    StartDispatcher.setStartProcessNotificationReceiver(this);
  }


  startLanguageSettingProcess(): void {
    this.currentCommponent = "language-setting";
  }

  startWelcomeProcess(): void {
    this.currentCommponent = "welcome"
  }

  startDataSavingConfirmationProcess(): void {

    this.currentCommponent = "saving-confirmation"
  }

}
