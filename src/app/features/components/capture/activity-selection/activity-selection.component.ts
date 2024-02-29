import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-activity-selection',
  standalone: true,
  imports: [ MatInputModule,
    MatSelectModule,
    MatFormFieldModule
  ],
  templateUrl: './activity-selection.component.html',
  styleUrl: './activity-selection.component.scss'
})
export class ActivitySelectionComponent {

}
