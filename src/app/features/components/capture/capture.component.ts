import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-capture',
  standalone: true,
  imports: [MatToolbarModule, 
    MatButtonModule, 
    MatIconModule],
  templateUrl: './capture.component.html',
  styleUrl: './capture.component.scss'
})
export class CaptureComponent {
  title = 'PriTiSAn';
  isDisabled = true;
  isPlaying = true;

  onClick() {
    
  }

}
