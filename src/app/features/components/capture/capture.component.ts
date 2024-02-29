import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

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
    MatFormFieldModule, 
    MatSelectModule,
    FormsModule, 
    ReactiveFormsModule, 
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    RunningActivitiesComponent,
    ActivitySelectionComponent,
    TimeSettingComponent,
    ParametersSettingComponent
],
  templateUrl: './capture.component.html',
  styleUrl: './capture.component.scss'
})
export class CaptureComponent {
  title = 'PriTiSAn';
  isDisabled = true;
  isPlaying = true;

  hours = Array.from({length: 24}, (_, i) => i); // [0, 1, 2, ..., 23]
  minutes = Array.from({length: 60}, (_, i) => i); // [0, 1, 2, ..., 59]
  selectedHour = this.hours[0];
  selectedMinute = this.minutes[0];

  readonly activities: Array<IActivity> = [
    {id: "1.1", label: "Activity 1.1"},
    {id: "1.2", label: "Activity 1.2"},
    {id: "2.1", label: "Activity 2.1"},
  ];

  onClick() {
    
  }

}

interface IActivity {
  id: string;
  label: string;
}
