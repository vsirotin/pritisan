import { Component } from '@angular/core';

import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-current-event-toolbar',
  standalone: true,
  imports: [    MatToolbarModule, 
    MatButtonModule, 
    MatIconModule,
    MatInputModule,
    MatSelectModule],
  templateUrl: './current-event-toolbar.component.html',
  styleUrl: './current-event-toolbar.component.scss'
})
export class CurrentEventToolbarComponent {
  onClick() {
    
  }
}
