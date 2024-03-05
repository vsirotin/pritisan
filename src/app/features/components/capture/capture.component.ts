import { Component } from '@angular/core';


import { RunningEventsComponent } from './running-events/running-events.component';
import { ActivitySelectionComponent } from './event-selection/event-selection.component';
import { TimeSettingComponent } from './time-setting/time-setting.component';
import { ParametersSettingComponent } from './parameters-setting/parameters-setting.component';
import { RepositoryNavigationComponent } from './repository-navigation/repository-navigation.component';


@Component({
  selector: 'app-capture',
  standalone: true,
  imports: [
    RepositoryNavigationComponent,
    RunningEventsComponent,
    ActivitySelectionComponent,
    TimeSettingComponent,
    ParametersSettingComponent
],
  templateUrl: './capture.component.html',
  styleUrl: './capture.component.scss'
})
export class CaptureComponent {

  isDisabled = true;
  isPlaying = true;

 

}

