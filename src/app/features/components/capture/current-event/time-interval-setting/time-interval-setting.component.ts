import { Component, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { TimePointSettingComponent } from '../time-point-setting/time-point-setting.component';
import { LoggerFactory } from '@vsirotin/log4ts';
import { Capturer, ITimeIntervalProvider, ITimePoint } from '../../../../models/capture/capturer';

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


