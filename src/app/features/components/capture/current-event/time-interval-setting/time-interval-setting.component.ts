import { Component, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { TimePointSettingComponent } from '../time-point-setting/time-point-setting.component';
import { LoggerFactory } from '@vsirotin/log4ts';
import { Capturer } from '../../../../models/capture/capturer';
import { ITimeIntervalProvider, ITimePoint } from '../../../../models/capture/business-logic-model/current-event-business-logic-model/event-commons';

@Component({
  selector: 'app-time-interval-setting',
  standalone: true,
  imports: [TimePointSettingComponent],
  templateUrl: './time-interval-setting.component.html',
  styleUrl: './time-interval-setting.component.scss'
})
export class TimeIntervalSettingComponent implements ITimeIntervalProvider {

  @ViewChild('startTime') startTimeComponent!: TimePointSettingComponent;
  @ViewChild('endTime') endTimeComponent!: TimePointSettingComponent;

  private logger = LoggerFactory.getLogger('TimeIntervalSettingComponent');


  getStartTimePoint(): ITimePoint {
    return this.startTimeComponent.getTimePoint();
  }
  getEndTimePoint(): ITimePoint {
    return this.endTimeComponent.getTimePoint();
  }

  ngAfterViewInit() {
    Capturer.setTimeIntervalProvider(this);
  }
}


