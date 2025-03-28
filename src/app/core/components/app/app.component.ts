import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MainComponent} from '../main/main.component';
import { StartComponent } from "../../../features/components/start/start.component";
import { IStartCompletionReceiver, StartDispatcher } from '../../../features/classes/start-dispatcher';
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

  private logger = LoggerFactory.getLogger("AppComponent");

  ngOnInit(): void {
    LoggerFactory.setAllLevelsByAllLoggers();
    this.logger.debug("Start of AppComponent initialization.");
    StartDispatcher.setStartCompletionReceiver(this);
  }
  

  completeStartProcess(): void {
    this.startProcessRunning = false;
  }
}
