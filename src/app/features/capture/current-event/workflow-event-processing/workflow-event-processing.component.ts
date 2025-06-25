import { Component, ViewChild } from '@angular/core';
import { ActivityTypeSettingComponent } from '../activity-type-setting/activity-type-setting';
import {  TimeIntervalSettingComponent } from '../time-interval-setting/time-interval-setting.component';
import { LoggerFactory } from '@vsirotin/log4ts';

@Component({
  selector: 'app-workflow-event-processing',
  standalone: true,
  imports: [ActivityTypeSettingComponent, TimeIntervalSettingComponent],
  templateUrl: './workflow-event-processing.component.html',
  styleUrl: './workflow-event-processing.component.scss'
})
export class WorkflowEventProcessingComponent {

  private logger = LoggerFactory.getLogger('WorkflowEventProcessingComponent');
  
  // @ViewChild(TimeIntervalSettingComponent) timeIntervalSettingComponent!: TimeIntervalSettingComponent;
  // @ViewChild(EventTypeSettingComponent) eventTypeSettingComponent!: EventTypeSettingComponent;

  // getClosedEvent(): IClosedEvent {
  //   const timePoints: ITimePoint[] = this.timeIntervalSettingComponent.getTimePoints();
  //   const startTime = timePoints[0];
  //   const endTime = timePoints[1];
  //   const eventTypeId = this.eventTypeSettingComponent.selectedEventTypeId;
  //   const eventTypeName = this.eventTypeSettingComponent.selectedEventTypeName;

  //   return {
  //     startTime,
  //     endTime,
  //     eventTypeId,
  //     eventTypeName
  //   };
  // }

  //   ngAfterViewInit() {
  //     const closedEvent = this.getClosedEvent();
  //     this.logger.debug("ngAfterViewInit: closedEvent: ", closedEvent);
  //   }



}


