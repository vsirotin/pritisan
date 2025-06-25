import { Component, OnDestroy } from '@angular/core';
import { MatRadioChange } from '@angular/material/radio';
import { FormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { MatExpansionModule} from '@angular/material/expansion';
import { ILogger, LoggerFactory } from '@vsirotin/log4ts';
import { IAlternativeList, IEventType, IEventTypeProvider } from '../../../models/capture/business-logic-model/current-event-business-logic-model/event-commons';
import * as uiItems from '../../../../../assets/languages/features/capture/current-event/event-type-setting/lang/1/en-US.json';
import { ILocalizationClient, ILocalizer, LocalizerFactory } from '@vsirotin/localizer';
import { CaptureController, IEventTypeUpdateReceiver } from '../../controller/capture-controller';

// This component allows the user to select the type of event they want to process.
// It displays a list of available event types and allows the user to select one.
// The selected event type is then used to determine the workflow for processing the event.
// It is part of the current event processing feature in the application.


// Directory with localization files
const EVENT_TYPE_LANG_DIR = "assets/languages/features/capture/current-event/event-type-setting/lang";

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
export class EventTypeSettingComponent  implements IEventTypeProvider, ILocalizationClient<IAlternativeList>, OnDestroy {

  // --- Variables presented in UI --- 
  isExpanded = true; 
  selectedAlternative!: IEventType;
  nameSelectedAlternative = "";
  title : string;
  alternatives: IEventType[];   
  private  ui: IAlternativeList = (uiItems as any).default;

  //--- Common services ---
  private logger: ILogger = LoggerFactory.getLogger("eu.sirotin.pritisan.WorkflowTypeSelectionComponent"); 
  private localizer: ILocalizer;

  // ---- Controller for processing selected event type ---
  private eventTypeUpdateReceiver: IEventTypeUpdateReceiver;

  constructor() { 
   this.logger.debug("In constructor alternativeList: " + JSON.stringify(this.ui));

    this.localizer  =  LocalizerFactory.createLocalizer<IAlternativeList>(EVENT_TYPE_LANG_DIR, 1, this.ui, this);

    this.eventTypeUpdateReceiver = CaptureController.getEventTypeUpdateReceiver();
    
      this.title = this.ui.groupLabel;
      this.alternatives = this.ui.alternatives;
      const index = this.ui.alternatives.findIndex(a => a.id == this.ui.currentAlternativeId);
      if(index >= 0){
        this.selectedAlternative = this.alternatives[index];
        this.nameSelectedAlternative = this.selectedAlternative.name;
      }

      CaptureController.setEventTypeProvider(this);
  }
  
  // --- Processing of user actions ---

  // This method is called when the user selects an alternative from the list
  // It updates the selected alternative and notifies the controller about the change
  onSelectionChange(event: MatRadioChange) {
    this.logger.debug("onSelectionChange event: " + event);
    this.isExpanded = false; // collapse the panel after a selection is made
    
    this.eventTypeUpdateReceiver.eventTypeUpdated(event.value); // Notify the controller about the change

    const id = event.value.id;
    const index = this.alternatives.findIndex(a => a.id == id);
      if(index >= 0){
        this.selectedAlternative = this.alternatives[index];
        this.nameSelectedAlternative = this.selectedAlternative.name;
      }
  }

  // --- Implementation of interfaces ---
  //Implememntation of Interface ILOcalizationClient<IAlternativeList>
  // This method is called by the Localizer when the localization data is updated
  // It updates the UI with the new localization data
  updateLocalization(data: IAlternativeList): void {
    this.logger.debug("Start of updateLocalization data=" + JSON.stringify(data));
    this.ui = data;
  }

  //Implememntation of Interface IEventTypeProvider
  // This method returns the current event type
  getEventType(): IEventType {
    return {id: this.selectedAlternative.id, name: this.selectedAlternative.name};
  }

  // --- Lifecycle hooks ---

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
