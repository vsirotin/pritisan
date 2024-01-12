import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

import {ToolbarComponent } from './toolbar/toolbar.component';
import {MenuComponent} from './menu/menu.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, 
    RouterOutlet, 
    ToolbarComponent,  
    MenuComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  onItemClicked(item: string) {
    console.log("Clicked on: ", item);
    // Implement your logic here
  }
}
