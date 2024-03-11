import { Component } from '@angular/core';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { EventSelectionPresenationModel } from '../../model/capture-presentation-model';

@Component({
  selector: 'app-event-selection',
  standalone: true,
  imports: [ 
    MatInputModule,
    MatFormFieldModule
  ],
  templateUrl: './event-selection.component.html',
  styleUrl: './event-selection.component.scss'
})
export class EventSelectionComponent {

  presentationModel?:  EventSelectionPresenationModel;
  onClick() {
    
  }
}
