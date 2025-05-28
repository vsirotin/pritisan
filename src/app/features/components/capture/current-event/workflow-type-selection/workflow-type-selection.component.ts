import { Component, OnDestroy } from '@angular/core';
import { MatRadioChange } from '@angular/material/radio';
import { FormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { MatExpansionModule} from '@angular/material/expansion';
import { ILogger, LoggerFactory } from '@vsirotin/log4ts';
import { IAlternativeList, IEventType } from '../../../../models/capture/business-logic-model/current-event-business-logic-model/event-commons';
import * as uiItems from '../../../../../../assets/languages/features/components/capture/current-event/workflow-type-selection/lang/1/en-EN.json';
import { ILocalizationClient, ILocalizer, LocalizerFactory } from '@vsirotin/localizer';

const WF_TYPE_SELECTION_DIR = "assets/languages/features/components/capture/current-event/workflow-type-selection/lang";

@Component({
  selector: 'app-workflow-type-selection',
  standalone: true,
  imports: [ 
    MatExpansionModule,
    MatRadioModule, 
    FormsModule
  ],
  templateUrl: './workflow-type-selection.component.html',
  styleUrl: './workflow-type-selection.component.scss'
})
export class WorkflowTypeSelectionComponent  implements OnDestroy, ILocalizationClient<IAlternativeList>{

  isExpanded = true; 

  selectedAlternative!: IEventType;
  nameSelectedAlternative = "";
  title? : string;

  private logger: ILogger = LoggerFactory.getLogger("eu.sirotin.pritisan.WorkflowTypeSelectionComponent"); 
  private  ui: IAlternativeList = (uiItems as any).default;

   private localizer: ILocalizer;

  alternatives: IEventType[];      

  constructor() { 
   this.logger.debug("In constructor alternativeList: " + JSON.stringify(this.ui));

    this.localizer  =  LocalizerFactory.createLocalizer<IAlternativeList>(WF_TYPE_SELECTION_DIR, 1, this.ui, this);
    
      this.title = this.ui.groupLabel;
      this.alternatives = this.ui.alternatives;
      const index = this.ui.alternatives.findIndex(a => a.id == this.ui.currentAlternativeId);
      if(index >= 0){
        this.selectedAlternative = this.alternatives[index];
        this.nameSelectedAlternative = this.selectedAlternative.name;
      }
  }

  onSelectionChange(event: MatRadioChange) {
    this.logger.debug("onSelectionChange event: " + event);
    this.isExpanded = false; // collapse the panel after a selection is made
    // other code...
 //TODO   this.selectionProcessor.alternativeSelected(event.value);
    const id = event.value.id;
    const index = this.alternatives.findIndex(a => a.id == id);
      if(index >= 0){
        this.selectedAlternative = this.alternatives[index];
        this.nameSelectedAlternative = this.selectedAlternative.name;
      }
  }

   updateLocalization(data: IAlternativeList): void {
    this.logger.debug("Start of updateLocalization data=" + JSON.stringify(data));
    this.ui = data;
  }


  ngOnDestroy() {
    this.logger.debug("Start of ngDestroy");
    this.localizer.dispose();
  }
  
  
}
