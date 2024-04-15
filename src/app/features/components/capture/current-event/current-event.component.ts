import { Component, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';

import { EventTypeSelectingComponent } from './event-type-selecting/event-type-selecting.component';
import { ActivityTypeSelectingComponent } from './activity-type-selecting/activity-type-selecting.component';
import { TimeSettingComponent } from './time-setting/time-setting.component';
import { ParametersSettingComponent } from './parameters-setting/parameters-setting.component';
import { EventUIModel } from '../model/capture/ui-model/current-event-ui-model';
import { Logger } from '../../../../shared/services/logging/logger';
import { CaptureNotificationService } from '../capture-notification-service';
import { Subscription } from 'rxjs';
import { CurrentEventActions } from '../model/capture/ui-model/current-event-ui-model';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-current-event',
  standalone: true,
  imports: [
    EventTypeSelectingComponent,
    ActivityTypeSelectingComponent,
    TimeSettingComponent,
    ParametersSettingComponent,
    MatToolbarModule, 
    MatButtonModule, 
    MatIconModule,
    MatInputModule,
    MatSelectModule],
  templateUrl: './current-event.component.html',
  styleUrl: './current-event.component.scss'
})
export class CurrentEventComponent implements AfterViewInit, OnDestroy {

  currentSubCommponent: string = 'eventSelectionComponent';

  @ViewChild(EventTypeSelectingComponent) eventSelectionComponent!: EventTypeSelectingComponent;
  @ViewChild(TimeSettingComponent) timeSettingComponent!: TimeSettingComponent;
  @ViewChild(ParametersSettingComponent) parametersSettingComponent!: ParametersSettingComponent;

  uiModel! : EventUIModel; 

  currentEventDescription = "";

  private subscription!: Subscription; 

  CEA = CurrentEventActions;

  constructor(private logger: Logger, private captureNotificationService: CaptureNotificationService) { 
    this.uiModel = new EventUIModel(logger, captureNotificationService); 
    this.subscription = this.captureNotificationService.captureNotification$.subscribe((notification) => {
      this.currentEventDescription += notification;
    });
  }

  ngAfterViewInit() {
    this.uiModel.eventSelectionUIModel = this.eventSelectionComponent.uiModel;
   // this.timeSettingComponent.uiModel = this.uiModel.timeSettingUIModel;
   // this.parametersSettingComponent.uiModel = this.uiModel.parametersSettingUIModel; 
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.uiModel.doDestroy();
  }

  navigateTo(action: CurrentEventActions) {
    this.currentSubCommponent = this.uiModel.navigateTo(action);
  }
  
  isDisabled(action: CurrentEventActions): boolean {
    return false;
  }

}
