import { Component, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { WorkflowTypeSelectionComponent } from './workflow-type-selection/workflow-type-selection.component';
import { EventTypeSettingComponent } from './event-type-setting/event-type-setting.component';
import { WorkflowEventProcessingComponent } from './workflow-event-processing/workflow-event-processing.component';
import { ParametersSettingComponent } from './parameters-setting/parameters-setting.component';
import { WorkflowObservationProcessingComponent } from './workflow-observation-processing/workflow-observation-processing.component';
import { WorkflowRessourceProcessingComponent } from './workflow-ressource-processing/workflow-ressource-processing.component';
import { CurrentEventProcessingUIModel } from '../../../models/capture/ui-model/current-event-processing-ui-model/current-event-processing-ui-model';
import { ILogger, LoggerFactory } from '@vsirotin/log4ts';
import { IEventChange } from '../../../models/capture/ui-model/current-event-processing-ui-model/current-event-processing-ui-model';
import { Subscription } from 'rxjs';
import { CurrentEventActions } from '../../../models/capture/ui-model/current-event-processing-ui-model/current-event-processing-ui-model';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CurrentEventProcessingBusinessLogicModel } from '../../../models/capture/business-logic-model/current-event-business-logic-model/current-event-business-logic-model';


@Component({
  selector: 'app-current-event',
  standalone: true,
  imports: [
    WorkflowTypeSelectionComponent,
    WorkflowEventProcessingComponent,
    WorkflowObservationProcessingComponent,
    WorkflowRessourceProcessingComponent,
    MatToolbarModule, 
    MatButtonModule, 
    MatIconModule,
    MatInputModule,
    MatSelectModule],
  templateUrl: './current-event.component.html',
  styleUrl: './current-event.component.scss'
})
export class CurrentEventComponent implements OnDestroy {

  currentSubCommponent: string = 'workflow-type-selection';

  @ViewChild(WorkflowTypeSelectionComponent) eventSelectionComponent!: WorkflowTypeSelectionComponent;
  @ViewChild(EventTypeSettingComponent) activityTypeSelectingComponent!: EventTypeSettingComponent;
  @ViewChild(ParametersSettingComponent) parametersSettingComponent!: ParametersSettingComponent;

  //uiModel! : ICurrentEventProcessingUIModel; 

  currentEventDescription: string = "";

  private subscriptionEventDescription!: Subscription; 
  private subscriptionState: Subscription 

  CEA = CurrentEventActions;

  private logger: ILogger = LoggerFactory.getLogger("eu.sirotin.pritisan.CurrentEventComponent");

  private readonly currentEventProcessingUIModel = CurrentEventProcessingUIModel.getInstance();

   constructor() { 
  //   this.uiModel = CurrentEventProcessingUIFactory.getCurrentEventProcessingUIModel();
  //   this.subscriptionEventDescription = this.uiModel.eventDescriptionChange$.subscribe((notification) => {
  //     this.logger.debug("CurrentEventComponent.uiModel.eventDescriptionChange$.subscribe notification: " + notification);
  //     this.updateCurrentEventDescription(notification);
  //   });

    this.subscriptionState = this.currentEventProcessingUIModel.stateChange$.subscribe((state) => {
      this.logger.debug("CurrentEventComponent.state$ state: " + state);
      this.currentSubCommponent = state;
    });
  }

  private updateCurrentEventDescription(notification: IEventChange) {
    this.currentEventDescription += notification.localizedName + " ";
  }


  ngOnDestroy() {
    this.subscriptionEventDescription.unsubscribe();
    this.subscriptionState.unsubscribe();
 //   this.uiModel.doDestroy();
  }

  navigateTo(action: CurrentEventActions) {
//    const result = this.uiModel.navigateTo(action);
    this.logger.debug("In navigateTo action: " + JSON.stringify(action));
  //  this.currentSubCommponent = result;

    switch (action) {
      case CurrentEventActions.SAVE:
        this.logger.debug("In navigateTo action: SAVE");
        CurrentEventProcessingBusinessLogicModel.saveCurrentEvent();
        break;
      default:
        this.logger.error("In navigateTo action NOT implememted: " + action);
    }
  }
  
  isDisabled(action: CurrentEventActions): boolean {
    return false;
  }

}
