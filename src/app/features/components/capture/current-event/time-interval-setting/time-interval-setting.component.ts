import { Component, QueryList, ViewChildren } from '@angular/core';
import { TimePointSettingComponent } from '../time-point-setting/time-point-setting.component';
import { TimeSettingUIModel } from '../../../../models/capture/ui-model/capture-ui-model';

@Component({
  selector: 'app-time-interval-setting',
  standalone: true,
  imports: [TimePointSettingComponent],
  templateUrl: './time-interval-setting.component.html',
  styleUrl: './time-interval-setting.component.scss'
})
export class TimeIntervalSettingComponent {
  @ViewChildren(TimePointSettingComponent) timePoitnsSettingComponents!: QueryList<TimePointSettingComponent>;

  uiModel?: TimeSettingUIModel;

  ngAfterViewInit() {

      console.log(this.timePoitnsSettingComponents.toArray()[0].hours);

  }
                      
  onClick() {
  } 
}
