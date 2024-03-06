import { Component, OnInit } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';

import { RunningEventsComponent } from './running-events/running-events.component';
import { ActivitySelectionComponent } from './event-selection/event-selection.component';
import { TimeSettingComponent } from './time-setting/time-setting.component';
import { ParametersSettingComponent } from './parameters-setting/parameters-setting.component';
import { RepositoryNavigationComponent } from './repository-navigation/repository-navigation.component';
import { AdapterCapturePresentationModel, CapturePresentationModel } from './model/capture-presentation-model';


@Component({
  selector: 'app-capture',
  standalone: true,
  imports: [
    MatDividerModule,
    RepositoryNavigationComponent,
    RunningEventsComponent,
    ActivitySelectionComponent,
    TimeSettingComponent,
    ParametersSettingComponent
],
  templateUrl: './capture.component.html',
  styleUrl: './capture.component.scss'
})
export class CaptureComponent implements OnInit {

  capturePresentationModel: CapturePresentationModel;
  

  constructor(adapterCapturePresentationModel: AdapterCapturePresentationModel) { 
    this.capturePresentationModel = adapterCapturePresentationModel.capturePresentationModel;
  }

  
  ngOnInit() {
    
  }

}

