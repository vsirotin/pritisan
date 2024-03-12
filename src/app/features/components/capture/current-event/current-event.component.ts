import { Component, ViewChild } from '@angular/core';


import { EventSelectionComponent } from './event-selection/event-selection.component';
import { TimeSettingComponent } from './time-setting/time-setting.component';
import { ParametersSettingComponent } from './parameters-setting/parameters-setting.component';
import { EventUIModel } from '../model/capture-presentation-model';
import { CurrentEventToolbarComponent } from './current-event-toolbar/current-event-toolbar.component';

@Component({
  selector: 'app-current-event',
  standalone: true,
  imports: [
    CurrentEventToolbarComponent,
    EventSelectionComponent,
    TimeSettingComponent,
    ParametersSettingComponent],
  templateUrl: './current-event.component.html',
  styleUrl: './current-event.component.scss'
})
export class CurrentEventComponent {

  @ViewChild(CurrentEventToolbarComponent) currentEventToolbarComponent!: CurrentEventToolbarComponent;
  @ViewChild(EventSelectionComponent) eventSelectionComponent!: EventSelectionComponent;
  @ViewChild(TimeSettingComponent) timeSettingComponent!: TimeSettingComponent;
  @ViewChild(ParametersSettingComponent) parametersSettingComponent!: ParametersSettingComponent;

  presentationModel = new EventUIModel(); 

  ngAfterViewInit() {
    this.eventSelectionComponent.presentationModel = this.presentationModel.eventSelectionPresenationModel
    this.timeSettingComponent.presentationModel = this.presentationModel.timeSettingPresenationModel;
    this.parametersSettingComponent.presentationModel = this.presentationModel.parametersSettingUIModel; 
  }

}
