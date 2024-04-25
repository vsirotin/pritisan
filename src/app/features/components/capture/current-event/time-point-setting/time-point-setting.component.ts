import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-time-point-setting',
  standalone: true,
  imports: [
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule
  ],
  templateUrl: './time-point-setting.component.html',
  styleUrl: './time-point-setting.component.scss'
})
export class TimePointSettingComponent {

  label = 'Start time';

  //date = new FormControl(new Date());

  form = new FormGroup({
    date: new FormControl(new Date()),
  });



  hours = Array.from({length: 24}, (_, i) => i); // [0, 1, 2, ..., 23]
  minutes = Array.from({length: 60}, (_, i) => i); // [0, 1, 2, ..., 59]
  selectedHour = this.hours[0];
  selectedMinute = this.minutes[0];


  constructor() {
    this.form.valueChanges.subscribe(val => {
      console.warn("val=" + JSON.stringify(val));
    });
  }
  
}
