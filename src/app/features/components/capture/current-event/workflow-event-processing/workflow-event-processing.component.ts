import { Component } from '@angular/core';
import { EventTypeSettingComponent } from '../event-type-setting/event-type-setting.component';
import { TimeIntervalSettingComponent } from '../time-interval-setting/time-interval-setting.component';

@Component({
  selector: 'app-workflow-event-processing',
  standalone: true,
  imports: [EventTypeSettingComponent, TimeIntervalSettingComponent],
  templateUrl: './workflow-event-processing.component.html',
  styleUrl: './workflow-event-processing.component.scss'
})
export class WorkflowEventProcessingComponent {

}
