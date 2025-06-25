import { Component, OnDestroy } from '@angular/core';
import { MatRadioChange } from '@angular/material/radio';
import { FormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { MatExpansionModule} from '@angular/material/expansion';
import { ILogger, LoggerFactory } from '@vsirotin/log4ts';
import { IAlternativeList, IEventType, IEventTypeProvider } from '../../../models/capture/business-logic-model/current-event-business-logic-model/event-commons';
import * as uiItems from '../../../../../assets/languages/features/components/capture/current-event/workflow-type-selection/lang/1/en-US.json';
import { ILocalizationClient, ILocalizer, LocalizerFactory } from '@vsirotin/localizer';
import { CurrentEventProcessingUIModel, IWorkflowTypeSelection } from '../../../models/capture/ui-model/current-event-processing-ui-model/current-event-processing-ui-model';
import { IEvent } from '../../../models/capture/capture-common-interfaces';
import { CurrentEventProcessingBusinessLogicModel } from '../../../models/capture/business-logic-model/current-event-business-logic-model/current-event-business-logic-model';
import { CaptureController, IEventTypeUpdateReceiver } from '../../controller/capture-controller';

const WF_TYPE_SELECTION_DIR = "assets/languages/features/components/capture/current-event/workflow-type-selection/lang";

@Component({
  selector: 'app-workflow-type-selection',
  standalone: true,
  imports: [ 
    MatExpansionModule,
    MatRadioModule, 
    FormsModule
  ],
  templateUrl: './event-type-setting.html',
  styleUrl: './event-type-setting.scss'
})
export class WorkflowTypeSelectionComponent  implements 
  OnDestroy, 
  IEventTypeProvider,
  ILocalizationClient<IAlternativeList>{

  isExpanded = true; 

  selectedAlternative!: IEventType;
  nameSelectedAlternative = "";
  title : string;

  private logger: ILogger = LoggerFactory.getLogger("eu.sirotin.pritisan.WorkflowTypeSelectionComponent"); 
  private  ui: IAlternativeList = (uiItems as any).default;

   private localizer: ILocalizer;

  alternatives: IEventType[];      

  //private readonly workflow: IWorkflowTypeSelection = CurrentEventProcessingUIModel.getInstance();

  private userActivityReceiver: IEventTypeUpdateReceiver;

  constructor() { 
   this.logger.debug("In constructor alternativeList: " + JSON.stringify(this.ui));

    this.localizer  =  LocalizerFactory.createLocalizer<IAlternativeList>(WF_TYPE_SELECTION_DIR, 1, this.ui, this);

    this.userActivityReceiver = CaptureController.getEventTypeUpdateReceiver();
    
      this.title = this.ui.groupLabel;
      this.alternatives = this.ui.alternatives;
      const index = this.ui.alternatives.findIndex(a => a.id == this.ui.currentAlternativeId);
      if(index >= 0){
        this.selectedAlternative = this.alternatives[index];
        this.nameSelectedAlternative = this.selectedAlternative.name;
      }

      CaptureController.setEventTypeProvider(this);
  }
  
  getEventType(): IEventType {
    return {id: this.selectedAlternative.id, name: this.selectedAlternative.name};
  }

  onSelectionChange(event: MatRadioChange) {
    this.logger.debug("onSelectionChange event: " + event);
    this.isExpanded = false; // collapse the panel after a selection is made
    
//    CurrentEventProcessingBusinessLogicModel.getCurrentEvent().setWorkflowType(event.value.id);
//    this.workflow.workflowTypeSelected(event.value); //TODO
    this.userActivityReceiver.eventTypeUpdated(event.value); // Notify the controller about the change
 //TODO   this.selectionProcessor.alternativeSelected(event.value);
    const id = event.value.id;
    const index = this.alternatives.findIndex(a => a.id == id);
      if(index >= 0){
        this.selectedAlternative = this.alternatives[index];
        this.nameSelectedAlternative = this.selectedAlternative.name;
      }
  }

  // --- Implementation of interfaces ---
  //Implememntation of Interface ILOcalizationClient<IAlternativeList>

  updateLocalization(data: IAlternativeList): void {
    this.logger.debug("Start of updateLocalization data=" + JSON.stringify(data));
    this.ui = data;
  }


  // This method is called when the component is destroyed
  // It is used to clean up resources and unsubscribe from observables
  // It is important to avoid memory leaks in Angular applications
  // It is called automatically by Angular when the component is destroyed
  // It is not called manually 
  ngOnDestroy() {
    this.logger.debug("Start of ngDestroy");
    this.localizer.dispose();
  }
  
  
}
