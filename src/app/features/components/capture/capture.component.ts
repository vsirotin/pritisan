import { Component, OnInit } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';

import { RunningEventsComponent } from './running-events/running-events.component';
import { RepositoryNavigationComponent } from './repository-navigation/repository-navigation.component';
import { CaptureUIModel } from './model/capture-presentation-model';
import { CurrentEventComponent } from './current-event/current-event.component';


@Component({
  selector: 'app-capture',
  standalone: true,
  imports: [
    MatDividerModule,
    RepositoryNavigationComponent,
    RunningEventsComponent,
    CurrentEventComponent
],
  templateUrl: './capture.component.html',
  styleUrl: './capture.component.scss'
})
export class CaptureComponent implements OnInit {

  captureUIModel!: CaptureUIModel;
  
  
  ngOnInit() {
    
  }

}

