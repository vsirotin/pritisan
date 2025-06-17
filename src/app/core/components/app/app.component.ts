import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MainComponent} from '../main/main.component';
import { StartComponent } from "../../../features/components/start/start.component";
import { IStartCompletionReceiver, AppStarter } from '../../../features/classes/app-starter';
import { LoggerFactory } from '@vsirotin/log4ts';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule,
    MainComponent, 
    StartComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements IStartCompletionReceiver, OnInit {

  startProcessRunning = true;

  private logger = LoggerFactory.getLogger("eu.sirotin.pritisan.AppComponent");

  ngOnInit(): void {
    LoggerFactory.setAllLevelsByAllLoggers();
    this.logger.debug("Start of AppComponent initialization.");
    AppStarter.setStartCompletionReceiver(this);
    this.logger.debug("End of AppComponent initialization.");
  }
  

  completeStartProcess(): void {
    this.logger.debug("completeStartProcess called.");
    setTimeout(() => {
      this.startProcessRunning = false;
      this.logger.debug("startProcessRunning set to false asynchronously.");
    }, 0);
  }
}
