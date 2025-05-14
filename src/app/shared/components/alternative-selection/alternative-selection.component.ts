import {MatRadioChange} from '@angular/material/radio';
import { IEventType } from '../../../features/models/capture/business-logic-model/current-event-business-logic-model/event-commons';
import { ILogger, LoggerFactory } from '@vsirotin/log4ts';
import { IAlternativeSelectionUIModel } from '../../../features/models/capture/ui-model/current-event-processing-ui-model/workflow-type-setting-ui-model';

export class AlternativeSelectionComponent {
  isExpanded = true; 
  alternatives!: IEventType[];
  selectedAlternative!: IEventType;
  nameSelectedAlternative = "";
  title? : string;
  private logger: ILogger = LoggerFactory.getLogger("eu.sirotin.pritisan.AlternativeSelectionComponent");
  constructor(private uiModel:  IAlternativeSelectionUIModel) { 
    this.logger.debug("AlternativeSelectionComponent.constructor");
    this.uiModel.getAlternatives().then((alternativeList) => {
      this.logger.debug("AlternativeSelectionComponent.onInitImpl alternatives: " + alternativeList);

      this.title = alternativeList.titleForAlternativeSelection;
      this.alternatives = alternativeList.alternatives;
      const index = alternativeList.alternatives.findIndex(a => a.id == alternativeList.currentAlternativeId);
      if(index >= 0){
        this.selectedAlternative = this.alternatives[index];
        this.nameSelectedAlternative = this.selectedAlternative.name;
      }
    });
  }

  onSelectionChange(event: MatRadioChange) {
    this.logger.debug("AlternativeSelectionComponent.onSelectionChange event: " + event);
    this.isExpanded = false; // collapse the panel after a selection is made
    // other code...
    this.uiModel.alternativeSelected(event.value);
    const id = event.value.id;
    const index = this.alternatives.findIndex(a => a.id == id);
      if(index >= 0){
        this.selectedAlternative = this.alternatives[index];
        this.nameSelectedAlternative = this.selectedAlternative.name;
      }
  }

}
