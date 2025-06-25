import { Component, ViewChild } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormsModule } from '@angular/forms';
import { TimePointSettingComponent } from '../time-point-setting/time-point-setting.component';
import { LoggerFactory } from '@vsirotin/log4ts';
import { CaptureController } from '../../controller/capture-controller';
import { IEventTimeDetailsProvider, ITimeIntervalProvider, ITimePoint } from '../../commons/event-commons';

//This component allows to set the start and end time of an event, as well as whether the event is running or a time point event.
@Component({
  selector: 'app-time-interval-setting',
  standalone: true,
  imports: [TimePointSettingComponent, 
    MatSlideToggleModule,
    FormsModule],
  templateUrl: './time-interval-setting.component.html',
  styleUrl: './time-interval-setting.component.scss'
})
export class TimeIntervalSettingComponent implements ITimeIntervalProvider, IEventTimeDetailsProvider {

  // --- Objects and variables presented in UI ---
  @ViewChild('startTime') startTimeComponent!: TimePointSettingComponent;
  @ViewChild('endTime') endTimeComponent!: TimePointSettingComponent;

  labelStartTime = 'Start time';
  labeFinishTime = 'Finish time';
  labeToggleRunninigEvent = 'Event runiinig (not closed)';
  isRunningEvent = true;
  
  isTimePointEvent = false;
  labelTimePointEvent = 'Start and end times are the same';

  // --- Common services ---
  private logger = LoggerFactory.getLogger('TimeIntervalSettingComponent');

  constructor() {
    this.logger.debug('TimeIntervalSettingComponent created');
    CaptureController.setTimeIntervalProvider(this);
    CaptureController.setEventTimeDetailsProvider(this);
  }

  //--- Implementation of interfaces

  //--- Implementation of ITimeIntervalProvider ---

  getStartTimePoint(): ITimePoint {
    return this.startTimeComponent.getTimePoint();
  }
  getEndTimePoint(): ITimePoint {
    return this.endTimeComponent.getTimePoint();
  }

  //--- Implementation of IEventTimeDetailsProvider ---

  getIsRunningEvent(): boolean {
    return this.isRunningEvent;
  }
  getIsTimePointEvent(): boolean {
    return this.isTimePointEvent;
  }

}


