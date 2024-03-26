import { Component } from '@angular/core';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { EventTypeSelectingPresenationModel } from '../../model/capture/ui-model/capture-ui-model';

@Component({
  selector: 'app-event-type-selecting',
  standalone: true,
  imports: [ 
    MatInputModule,
    MatFormFieldModule
  ],
  templateUrl: './event-type-selecting.component.html',
  styleUrl: './event-type-selecting.component.scss'
})
export class EventTypeSelectingComponent {

  uiModel!:  EventTypeSelectingPresenationModel;
  onClick() {
    
  }
}
