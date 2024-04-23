import { Component, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';

import { WorkflowTypeSelectionComponent } from './workflow-type-selection/workflow-type-selection.component';
import { EventTypeSettingComponent } from './event-type-setting/event-type-setting.component';
import { TimeSettingComponent } from './time-setting/time-setting.component';
import { ParametersSettingComponent } from './parameters-setting/parameters-setting.component';
import { CurrentEventProcessingUIModel, ICurrentEventProcessingUIModel } from '../../../models/capture/ui-model/current-event-processing-ui-model/current-event-processing-ui-model';
import { Logger } from '../../../../shared/services/logging/logger';
import { CurrentEventNotificationService } from './current-event-notification-service';
import { Subscription } from 'rxjs';
import { CurrentEventActions } from '../../../models/capture/ui-model/current-event-processing-ui-model/current-event-processing-ui-model';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { IEventPart } from '../../../models/capture/business-logic-model/current-event-business-logic-model/event-commons';

@Component({
  selector: 'app-current-event',
  standalone: true,
  imports: [
    WorkflowTypeSelectionComponent,
    EventTypeSettingComponent,
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

  @ViewChild(WorkflowTypeSelectionComponent) eventSelectionComponent!: WorkflowTypeSelectionComponent;
  @ViewChild(EventTypeSettingComponent) activityTypeSelectingComponent!: EventTypeSettingComponent;
  @ViewChild(ParametersSettingComponent) parametersSettingComponent!: ParametersSettingComponent;

  uiModel! : ICurrentEventProcessingUIModel; 

  currentEventDescription: string = "";

  private subscription!: Subscription; 

  CEA = CurrentEventActions;

  constructor(private logger: Logger, private currentEventNotificationService: CurrentEventNotificationService) { 
    this.uiModel = new CurrentEventProcessingUIModel(logger, currentEventNotificationService); 
    this.subscription = this.currentEventNotificationService.captureNotification$.subscribe((notification) => {
      this.logger.debug("CurrentEventComponent.captureNotification$ notification: " + notification);
      this.updateCurrentEventDescription(notification);
    });
  }
  private updateCurrentEventDescription(notification: IEventPart) {
    this.currentEventDescription += notification.localizedName + " ";
  }

  ngAfterViewInit() {
   // this.uiModel.eventSelectionUIModel = this.eventSelectionComponent.uiModel;
   // this.uiModel.activityTypeSelectingUIModel = this.activityTypeSelectingComponent.uiModel
   // this.timeSettingComponent.uiModel = this.uiModel.timeSettingUIModel;
   // this.parametersSettingComponent.uiModel = this.uiModel.parametersSettingUIModel; 
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.uiModel.doDestroy();
  }

  navigateTo(action: CurrentEventActions) {
    const result = this.uiModel.navigateTo(action);
    this.logger.debug("CurrentEventComponent.navigateTo action: " + JSON.stringify(action) + " result: " + result);
    this.currentSubCommponent = result;
  }
  
  isDisabled(action: CurrentEventActions): boolean {
    return false;
  }

}
