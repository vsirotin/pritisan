import { Component, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';

import { WorkflowTypeSelectionComponent } from './workflow-type-selection/workflow-type-selection.component';
import { EventTypeSettingComponent } from './event-type-setting/event-type-setting.component';
import { TimeSettingComponent } from './time-setting/time-setting.component';
import { ParametersSettingComponent } from './parameters-setting/parameters-setting.component';
import { CurrentEventProcessingUIModel, ICurrentEventProcessingUIModel } from '../../../models/capture/ui-model/current-event-processing-ui-model/current-event-processing-ui-model';
import { Logger } from '../../../../shared/services/logging/logger';
import { CurrentEventChangeNotificationService, IEventChange } from '../../../models/capture/ui-model/current-event-processing-ui-model/current-event-notification-service';
import { Subscription } from 'rxjs';
import { CurrentEventActions } from '../../../models/capture/ui-model/current-event-processing-ui-model/current-event-processing-ui-model';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';


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

  private subscriptionEventDescription!: Subscription; 
  private subscriptionState!: Subscription;

  CEA = CurrentEventActions;

  constructor(private logger: Logger, private currentEventNotificationService: CurrentEventChangeNotificationService) { 
    this.uiModel = new CurrentEventProcessingUIModel(logger, currentEventNotificationService); 
    this.subscriptionEventDescription = this.uiModel.eventDescriptionChange$.subscribe((notification) => {
      this.logger.debug("CurrentEventComponent.uiModel.eventDescriptionChange$.subscribe notification: " + notification);
      this.updateCurrentEventDescription(notification);
    });

    this.subscriptionState = this.uiModel.stateChange$.subscribe((state) => {
      this.logger.debug("CurrentEventComponent.state$ state: " + state);
      this.currentSubCommponent = state;
    });
  }
  private updateCurrentEventDescription(notification: IEventChange) {
    this.currentEventDescription += notification.localizedName + " ";
  }

  ngAfterViewInit() {
   // this.uiModel.eventSelectionUIModel = this.eventSelectionComponent.uiModel;
   // this.uiModel.activityTypeSelectingUIModel = this.activityTypeSelectingComponent.uiModel
   // this.timeSettingComponent.uiModel = this.uiModel.timeSettingUIModel;
   // this.parametersSettingComponent.uiModel = this.uiModel.parametersSettingUIModel; 
  }

  ngOnDestroy() {
    this.subscriptionEventDescription.unsubscribe();
    this.subscriptionState.unsubscribe();
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
