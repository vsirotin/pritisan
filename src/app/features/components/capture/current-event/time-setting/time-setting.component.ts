import { Component, QueryList, ViewChildren } from '@angular/core';
import { TimePointSettingComponent } from './time-point-setting/time-point-setting.component';
import { TimeSettingPresentationModel } from '../../model/capture-presentation-model';

@Component({
  selector: 'app-time-setting',
  standalone: true,
  imports: [TimePointSettingComponent],
  templateUrl: './time-setting.component.html',
  styleUrl: './time-setting.component.scss'
})
export class TimeSettingComponent {
  @ViewChildren(TimePointSettingComponent) timePoitnsSettingComponents!: QueryList<TimePointSettingComponent>;

  presentationModel?: TimeSettingPresentationModel;

  ngAfterViewInit() {

      console.log(this.timePoitnsSettingComponents.toArray()[0].hours);

  }
                      
  onClick() {
  } 
}
