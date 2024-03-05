import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-event-selection',
  standalone: true,
  imports: [ MatInputModule,
    MatSelectModule,
    MatFormFieldModule
  ],
  templateUrl: './event-selection.component.html',
  styleUrl: './event-selection.component.scss'
})
export class ActivitySelectionComponent {

}
