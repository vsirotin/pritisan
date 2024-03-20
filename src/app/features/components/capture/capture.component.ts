import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';

import { RunningEventsComponent } from './running-events/running-events.component';
import { RepositoryNavigationComponent } from './repository-navigation/repository-navigation.component';
import { CaptureUIModel, ICaptureUIModel } from './model/capture/capture-ui-model';
import { CurrentEventComponent } from './current-event/current-event.component';
import { Logger } from '../../../shared/services/logging/logger';


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

  constructor(private logger: Logger) { 
    this.uiModel = new CaptureUIModel(this.logger);
  }

  ngAfterViewInit() {
    this.uiModel.setNavigationUIModel(this.repositoryNavigationComponent.uiModel);
    this.uiModel.setRunningEventsUIModel(this.runningEventsComponent.uiModel);
    this.uiModel.setCurrentEventUIModel(this.currentEventComponent.uiModel);
    this.uiModel.init();
  }

}

