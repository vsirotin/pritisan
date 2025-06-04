import { Component, QueryList, ViewChildren } from '@angular/core';
import { TimePointSettingComponent } from '../time-point-setting/time-point-setting.component';
import { LoggerFactory } from '@vsirotin/log4ts';
//import { TimeSettingUIModel } from '../../../../models/capture/ui-model/capture-ui-model';

@Component({
  selector: 'app-time-interval-setting',
  standalone: true,
  imports: [TimePointSettingComponent],
  templateUrl: './time-interval-setting.component.html',
  styleUrl: './time-interval-setting.component.scss'
})
export class TimeIntervalSettingComponent {
  @ViewChildren(TimePointSettingComponent) timePoitnsSettingComponents!: QueryList<TimePointSettingComponent>;

  private logger = LoggerFactory.getLogger('TimeIntervalSettingComponent');
 // uiModel?: TimeSettingUIModel;

  ngAfterViewInit() {

    this.getTimePoints();

     
  }

  getTimePoints(): ITimePoint[] {
    const timePoints: ITimePoint[] = [];
    this.timePoitnsSettingComponents.forEach((child) => {
      const date = child.form.get('date')?.value as Date;
      const hour = child.selectedHour;
      const minute = child.selectedMinute;
      timePoints.push({ date, hour, minute });
    });
    this.logger.debug("getTimePoints: ", timePoints);
    return timePoints;
  }
}

export interface ITimePoint {
  date: Date;
  hour: number;
  minute: number;
}
