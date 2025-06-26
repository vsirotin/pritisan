import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import {provideMomentDateAdapter} from '@angular/material-moment-adapter'

// This component allows the user to set a time point, which consists of a date, hour, and minute.
// this cmponent follows special structure convention because it don't communicate with the controller.

//--- Start of special section that needed because technical specialities of Moment.js and rollup ---

// Depending on whether rollup is used, moment needs to be imported differently.
// Since Moment.js doesn't have a default export, we normally need to import using the `* as`
// syntax. However, rollup creates a synthetic default module and we thus need to import it using
// the `default as` syntax.
import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
import {default as _rollupMoment} from 'moment';
import { ITimePoint } from '../../commons/event-commons';
import { LoggerFactory } from '@vsirotin/log4ts';
import { DatePipe } from '@angular/common';


const moment = _rollupMoment || _moment;

// See the Moment.js docs for the meaning of these formats:
// https://momentjs.com/docs/#/displaying/format/

// -- End of special section that needed because technical specialities of Moment.js and rollup ---
export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'LL',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};
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
  providers: [
    // Moment can be provided globally to your app by adding `provideMomentDateAdapter`
    // to your app config. We provide it at the component level here, due to limitations
    // of our example generation script.
    provideMomentDateAdapter(MY_FORMATS),

    DatePipe
  ],
  templateUrl: './time-point-setting.component.html',
  styleUrl: './time-point-setting.component.scss'
})
export class TimePointSettingComponent {

  //-- Objects and values presented in UI ---
  // The form group that contains the date control
  // It is used to manage the state of the date input field.
  // The date control is initialized with the current date.
  form = new FormGroup({
    date: new FormControl(new Date()),
  });

  hours = Array.from({length: 24}, (_, i) => i); // [0, 1, 2, ..., 23]
  minutes = Array.from({length: 60}, (_, i) => i); // [0, 1, 2, ..., 59]
  selectedHour: number; 
  selectedMinute: number; 

  //--- Copmmon services

  private logger = LoggerFactory.getLogger('eu.sirotin.pritisan.TimePointSettingComponent');

  constructor(private datePipe: DatePipe) {
    this.form.valueChanges.subscribe(val => {
      const localDate = this.datePipe.transform(val.date, 'yyyy-MM-dd');
      this.logger.debug("selected local date: ", localDate);
      // TODO inform controller abour changes
    });

    const now = new Date();
    this.selectedHour = this.hours[now.getHours()];
    this.selectedMinute = this.minutes[now.getMinutes()];
  }

  // This method will be called by parent object to get the time point
  // It returns an object of type ITimePoint which contains the date, hour, and
getTimePoint(): ITimePoint {
  const dateControlValue = this.form.get('date')?.value;
  let year: number, month: number, dayOfMonth: number;

  if (moment.isMoment(dateControlValue)) {
    year = dateControlValue.year();
    month = dateControlValue.month() + 1; // Moment.js months are 0-based
    dayOfMonth = dateControlValue.date();
  } else if (dateControlValue instanceof Date) {
    year = dateControlValue.getFullYear();
    month = dateControlValue.getMonth() + 1;
    dayOfMonth = dateControlValue.getDate();
  } else {
    throw new Error('Invalid date value');
  }

  return {
    year,
    month,
    dayOfMonth,
    hour: this.selectedHour,
    minute: this.selectedMinute
  } as ITimePoint;
}
}
