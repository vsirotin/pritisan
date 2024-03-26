import { Component, ViewChild, AfterViewInit } from '@angular/core';

import { EventTypeSelectingComponent } from './event-type-selecting/event-type-selecting.component';
import { TimeSettingComponent } from './time-setting/time-setting.component';
import { ParametersSettingComponent } from './parameters-setting/parameters-setting.component';
import { EventUIModel } from '../model/capture/ui-model/capture-ui-model';
import { CurrentEventToolbarComponent } from './current-event-toolbar/current-event-toolbar.component';

@Component({
  selector: 'app-current-event',
  standalone: true,
  imports: [
    CurrentEventToolbarComponent,
    EventTypeSelectingComponent,
    TimeSettingComponent,
    ParametersSettingComponent],
  templateUrl: './current-event.component.html',
  styleUrl: './current-event.component.scss'
})
export class CurrentEventComponent implements AfterViewInit {

  @ViewChild(CurrentEventToolbarComponent) currentEventToolbarComponent!: CurrentEventToolbarComponent;
  @ViewChild(EventTypeSelectingComponent) eventSelectionComponent!: EventTypeSelectingComponent;
  @ViewChild(TimeSettingComponent) timeSettingComponent!: TimeSettingComponent;
  @ViewChild(ParametersSettingComponent) parametersSettingComponent!: ParametersSettingComponent;

  uiModel = new EventUIModel(); 

  ngAfterViewInit() {
    this.uiModel.eventSelectionUIModel = this.eventSelectionComponent.uiModel;
    this.timeSettingComponent.uiModel = this.uiModel.timeSettingUIModel;
    this.parametersSettingComponent.uiModel = this.uiModel.parametersSettingUIModel; 
  }

}
