import { Component, OnInit } from '@angular/core';
import { MatRadioChange, MatRadioModule } from '@angular/material/radio';
import { FormsModule } from '@angular/forms';
import { IBeginningTypeSettingUIModel } from '../../../../models/capture/ui-model/current-event-processing-ui-model/beginning-type-setting-ui-model';
import { Logger } from '../../../../../shared/services/logging/logger';
import { CurrentEventProcessingUIFactory } from '../../../../models/capture/ui-model/current-event-processing-ui-model/current-event-processing-ui-factory';

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

  uiModel!:  IBeginningTypeSettingUIModel;

  eventTypes!: string[];
  selectedEventType!: string;
  constructor(private logger: Logger) { 
    this.uiModel = CurrentEventProcessingUIFactory.getBeginningTypeSettingUIModel(this.logger);
  }
  
  async ngOnInit() {
    this.uiModel.getAlternativeNames().then((eventTypes) => {
      this.logger.debug("WorkflowTypeSelectionComponent.ngOnInit Event types: " + eventTypes);
      this.eventTypes = eventTypes;
      this.logger.debug("Event types: " + this.eventTypes);
      this.selectedEventType = this.eventTypes[0];
    });
  }

  onSelectionChange(event: MatRadioChange) {
    this.uiModel.changeSelectedAlternative(event.value);
  }
}
