import { Component } from '@angular/core';

import { ActivitySelectionComponent } from './event-selection/event-selection.component';
import { TimeSettingComponent } from './time-setting/time-setting.component';
import { ParametersSettingComponent } from './parameters-setting/parameters-setting.component';
import { AdapterCurrentEventPresentationModel } from '../model/capture-presentation-model';

@Component({
  selector: 'app-current-event',
  standalone: true,
  imports: [
    ActivitySelectionComponent,
    TimeSettingComponent,
    ParametersSettingComponent],
  templateUrl: './current-event.component.html',
  styleUrl: './current-event.component.scss'
})
export class CurrentEventComponent {
  constructor(adapterCurrentEventPresentationModel: AdapterCurrentEventPresentationModel) {
  }

}
