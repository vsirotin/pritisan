
import {MatRadioChange} from '@angular/material/radio';
import { IAlternative } from '../../../features/models/capture/business-logic-model/current-event-business-logic-model/event-commons';
import { Logger } from '../../services/logging/logger';
import { IAlternativeSelectionUIModel } from '../../../features/models/capture/ui-model/current-event-processing-ui-model/workflow-type-setting-ui-model';


export class AlternativeSelectionComponent {

  alternatives!: IAlternative[];
  selectedAlternative!: IAlternative;
  constructor(private logger: Logger,
    private uiModel:  IAlternativeSelectionUIModel) { 
    this.logger.debug("AlternativeSelectionComponent.constructor");
    this.uiModel.getAlternatives().then((alternatives) => {
      this.logger.debug("AlternativeSelectionComponent.onInitImpl alternatives: " + alternatives);
      this.alternatives = alternatives;
      this.logger.debug("Event types: " + this.alternatives);
      this.selectedAlternative = this.alternatives[0];
    });
  }

  onSelectionChange(event: MatRadioChange) {
    this.logger.debug("AlternativeSelectionComponent.onSelectionChange event: " + event);
    this.uiModel.alternativeSelected(event.value);
  }

  // protected async onInitImpl() {
  //   this.logger.debug("AlternativeSelectionComponent.onInitImpl");
  //   this.uiModel.getAlternatives().then((alternatives) => {
  //     this.logger.debug("AlternativeSelectionComponent.onInitImpl alternatives: " + alternatives);
  //     this.alternatives = alternatives;
  //     this.logger.debug("Event types: " + this.alternatives);
  //     this.selectedAlternative = this.alternatives[0];
  //   });
  // }
}
