import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';

import { RunningEventsComponent } from './running-events/running-events.component';
import { RepositoryNavigationComponent } from './repository-navigation/repository-navigation.component';
import { CaptureUIModel, ICaptureUIModel } from '../../models/capture/ui-model/capture-ui-model';
import { CurrentEventComponent } from './current-event/current-event.component';
import { ILogger, LoggerFactory } from '@vsirotin/log4ts';


@Component({
  selector: 'app-capture',
  standalone: true,
  imports: [
    MatDividerModule,
    RepositoryNavigationComponent,
    RunningEventsComponent,
    CurrentEventComponent
],
  templateUrl: './capture.component.html',
  styleUrl: './capture.component.scss'
})
export class CaptureComponent implements AfterViewInit {

  @ViewChild(RepositoryNavigationComponent) repositoryNavigationComponent!: RepositoryNavigationComponent;
  @ViewChild(RunningEventsComponent) runningEventsComponent!: RunningEventsComponent;
  @ViewChild(CurrentEventComponent) currentEventComponent!: CurrentEventComponent;

  uiModel! : ICaptureUIModel;

  private logger: ILogger = LoggerFactory.getLogger("eu.sirotin.pritisan.CaptureComponent");

  constructor() { 
    this.uiModel = new CaptureUIModel();
  }

  ngAfterViewInit() {
    this.uiModel.setNavigationUIModel(this.repositoryNavigationComponent.uiModel);
    this.uiModel.setRunningEventsUIModel(this.runningEventsComponent.uiModel);
    this.uiModel.setCurrentEventUIModel(this.currentEventComponent.uiModel);
  }

}

