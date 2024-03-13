import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';

import { RunningEventsComponent } from './running-events/running-events.component';
import { RepositoryNavigationComponent } from './repository-navigation/repository-navigation.component';
import { CaptureUIModel } from './model/capture-ui-model';
import { CurrentEventComponent } from './current-event/current-event.component';


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

  uiModel = new CaptureUIModel();
  
  ngAfterViewInit() {
    this.uiModel.navigationUIModel = this.repositoryNavigationComponent.uiModel;
    this.uiModel.runningEventsUIModel = this.runningEventsComponent.uiModel;
    this.uiModel.currentEventUIModel = this.currentEventComponent.uiModel;
    this.uiModel.init();
  }

}

