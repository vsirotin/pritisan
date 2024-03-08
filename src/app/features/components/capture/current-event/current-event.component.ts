import { Component, ViewChild } from '@angular/core';

import { EventSelectionComponent } from './event-selection/event-selection.component';
import { TimeSettingComponent } from './time-setting/time-setting.component';
import { ParametersSettingComponent } from './parameters-setting/parameters-setting.component';
import { AdapterCurrentEventPresentationModel, EventPresentationModel } from '../model/capture-presentation-model';

@Component({
  selector: 'app-current-event',
  standalone: true,
  imports: [
    EventSelectionComponent,
    TimeSettingComponent,
    ParametersSettingComponent],
  templateUrl: './current-event.component.html',
  styleUrl: './current-event.component.scss'
})
export class CurrentEventComponent {

  @ViewChild(EventSelectionComponent) eventSelectionComponent!: EventSelectionComponent;
  @ViewChild(TimeSettingComponent) timeSettingComponent!: TimeSettingComponent;
  @ViewChild(ParametersSettingComponent) parametersSettingComponent!: ParametersSettingComponent;

  presentationModel = new EventPresentationModel(); 

  constructor(adapterCurrentEventPresentationModel: AdapterCurrentEventPresentationModel) {
  }

  ngAfterViewInit() {
    this.eventSelectionComponent.presentationModel = this.presentationModel.eventSelectionPresenationModel
    this.timeSettingComponent.presentationModel = this.presentationModel.timeSettingPresenationModel;
    this.parametersSettingComponent.presentationModel = this.presentationModel.parametersSettingPresentationModel; 
  }

}
