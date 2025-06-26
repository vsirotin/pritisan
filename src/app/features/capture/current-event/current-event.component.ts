import { Component } from '@angular/core';
import { EventTypeSettingComponent } from './event-type-setting/event-type-setting';
import { WorkflowEventProcessingComponent } from './workflow-event-processing/workflow-event-processing.component';
import { WorkflowObservationProcessingComponent } from './workflow-observation-processing/workflow-observation-processing.component';
import { WorkflowRessourceProcessingComponent } from './workflow-ressource-processing/workflow-ressource-processing.component';
import { ILogger, LoggerFactory } from '@vsirotin/log4ts';
import { Subscription } from 'rxjs';
import { CurrentEventActions } from '../../models/capture/ui-model/current-event-processing-ui-model/current-event-processing-ui-model';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CaptureController, ICurrentEventDataGetter } from '../controller/capture-controller';

// This component is responsible for displaying the current event being processed in the application.
// It allows the user to view and interact with the current event, including its type, activities, and parameters.
// The component uses various sub-components to handle different aspects of the current event processing,
// such as event type selection, activity type setting, and workflow processing.
@Component({
  selector: 'app-current-event',
  standalone: true,
  imports: [
    EventTypeSettingComponent,
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
export class CurrentEventComponent  {

  //--- Objects and ariables presented in UI ---
  currentSubCommponent: string = 'workflow-type-selection';
  currentEventDescription: string = "TODO: Current event description"; //TODO: remove this variable when it is not used anymore
  CEA = CurrentEventActions;

  //---Common services ---
  private logger: ILogger = LoggerFactory.getLogger("eu.sirotin.pritisan.CurrentEventComponent");

  // --- Controller for processing current event ---
  private dataGetter: ICurrentEventDataGetter; //TO start here

  // --- Subscription to state changes of the current event ---
  private subscriptionState: Subscription 

   constructor() { 
    this.dataGetter = CaptureController.getCurrentEventController().getCurrentEventDataGetter();
    
    this.subscriptionState = this.dataGetter.stateChange$.subscribe((state) => { //TODO start here
      this.logger.debug("CurrentEventComponent.state$ state: " + state);
      this.currentSubCommponent = state;
    });
  }



  onButtonClick(action: CurrentEventActions) {
    this.logger.debug("In navigateTo action: " + JSON.stringify(action));

    switch (action) {
      case CurrentEventActions.SAVE:
        this.logger.debug("In navigateTo action: SAVE");
        CaptureController.getCurrentEventUserActionsReceiver().saveCurrentEvent();
        break;
      default:
        this.logger.error("In navigateTo action NOT implememted: " + action);
    }
  }
  
  isDisabled(action: CurrentEventActions): boolean {
    return false;
  }

}
