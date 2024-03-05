import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-repository-navigation',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './repository-navigation.component.html',
  styleUrl: './repository-navigation.component.scss'
})
export class RepositoryNavigationComponent {

  onClick() {
    
  }


}
