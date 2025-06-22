import { Component, ViewChild } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormsModule } from '@angular/forms';
import { TimePointSettingComponent } from '../time-point-setting/time-point-setting.component';
import { LoggerFactory } from '@vsirotin/log4ts';
import { Capturer } from '../../../../models/capture/capturer';
import { IEventTimeDetailsProvider, ITimeIntervalProvider, ITimePoint } from '../../../../models/capture/business-logic-model/current-event-business-logic-model/event-commons';

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


  @ViewChild('startTime') startTimeComponent!: TimePointSettingComponent;
  @ViewChild('endTime') endTimeComponent!: TimePointSettingComponent;

  labelStartTime = 'Start time';
  labeFinishTime = 'Finish time';
  labeToggleRunninigEvent = 'Event runiinig (not closed)';
  isRunningEvent = true;
  
  isTimePointEvent = false;
  labelTimePointEvent = 'Start and end times are the same';


  private logger = LoggerFactory.getLogger('TimeIntervalSettingComponent');


  getStartTimePoint(): ITimePoint {
    return this.startTimeComponent.getTimePoint();
  }
  getEndTimePoint(): ITimePoint {
    return this.endTimeComponent.getTimePoint();
  }

  getIsRunningEvent(): boolean {
    return this.isRunningEvent;
  }
  getIsTimePointEvent(): boolean {
    return this.isTimePointEvent;
  }

  ngAfterViewInit() {
    Capturer.setTimeIntervalProvider(this);
    Capturer.setEventTimeDetailsProvider(this);
  }
}


