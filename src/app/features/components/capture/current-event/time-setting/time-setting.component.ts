import { Component } from '@angular/core';
import { TimePointSettingComponent } from './time-point-setting/time-point-setting.component';

@Component({
  selector: 'app-time-setting',
  standalone: true,
  imports: [TimePointSettingComponent],
  templateUrl: './time-setting.component.html',
  styleUrl: './time-setting.component.scss'
})
export class TimeSettingComponent {

}
