import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { RunningActivitiesComponent } from './running-activities/running-activities.component';
import { ActivitySelectionComponent } from './activity-selection/activity-selection.component';
import { TimeSettingComponent } from './time-setting/time-setting.component';
import { ParametersSettingComponent } from './parameters-setting/parameters-setting.component';


@Component({
  selector: 'app-capture',
  standalone: true,
  imports: [MatToolbarModule, 
    MatButtonModule, 
    MatIconModule,
    RunningActivitiesComponent,
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

  onClick() {
    
  }

}

