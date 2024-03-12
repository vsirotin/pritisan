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
  @ViewChild(CurrentEventComponent) rurrentEventComponent!: CurrentEventComponent;

  uiModel = new CaptureUIModel();
  
  
  ngAfterViewInit() {
    this.repositoryNavigationComponent.uiModel = this.uiModel.navigationUIModel;
    this.runningEventsComponent.uiModel = this.uiModel.runningEventsUIModel;
    this.rurrentEventComponent.uiModel = this.uiModel.currentEventUIModel;
  }

}

