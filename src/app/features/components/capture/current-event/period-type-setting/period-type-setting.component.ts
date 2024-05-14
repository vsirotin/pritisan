import { Component, OnInit } from '@angular/core';
import { MatRadioChange, MatRadioModule } from '@angular/material/radio';
import { FormsModule } from '@angular/forms';
import { IAlternative } from '../../../../models/capture/business-logic-model/current-event-business-logic-model/event-commons';
import { Logger } from '../../../../../shared/services/logging/logger';
import { CurrentEventProcessingUIFactory } from '../../../../models/capture/ui-model/current-event-processing-ui-model/current-event-processing-ui-factory';
import { IAlternativeSelectionUIModel } from '../../../../models/capture/ui-model/current-event-processing-ui-model/workflow-type-setting-ui-model';

@Component({
  selector: 'app-period-type-setting',
  standalone: true,
  imports: [ 
    MatRadioModule,
    FormsModule],
  templateUrl: './period-type-setting.component.html',
  styleUrl: './period-type-setting.component.scss'
})
export class PeriodTypeSettingComponent implements OnInit{

  uiModel!:  IAlternativeSelectionUIModel;

  eventTypes!: IAlternative[];
  selectedEventType!: IAlternative;
  constructor(private logger: Logger) { 
    this.uiModel = CurrentEventProcessingUIFactory.getBeginningTypeSettingUIModel(this.logger);
  }
  
  async ngOnInit() {
    this.uiModel.getAlternatives().then((eventTypes) => {
      this.logger.debug("WorkflowTypeSelectionComponent.ngOnInit Event types: " + eventTypes);
      this.eventTypes = eventTypes;
      this.logger.debug("Event types: " + this.eventTypes);
      this.selectedEventType = this.eventTypes[0];
    });
  }

  onSelectionChange(event: MatRadioChange) {
    this.uiModel.alternativeSelected(event.value);
  }
}
