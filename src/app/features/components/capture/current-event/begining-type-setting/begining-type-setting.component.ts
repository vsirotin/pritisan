import { Component, OnInit } from '@angular/core';
import { IWorkflowTypeSettingUIModel } from '../../../../models/capture/ui-model/current-event-processing-ui-model/workflow-type-setting-ui-model';
import { Logger } from '../../../../../shared/services/logging/logger';
import { CurrentEventProcessingUIFactory } from '../../../../models/capture/ui-model/current-event-processing-ui-model/cCurrent-event-processing-ui-factory';
import { MatRadioChange, MatRadioModule } from '@angular/material/radio';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-begining-type-setting',
  standalone: true,
  imports: [
    MatRadioModule, 
    FormsModule],
  templateUrl: './begining-type-setting.component.html',
  styleUrl: './begining-type-setting.component.scss'
})
export class BeginingTypeSettingComponent implements OnInit{

  uiModel!:  IWorkflowTypeSettingUIModel;

  eventTypes!: string[];
  selectedEventType!: string;
  constructor(private logger: Logger) { 
    this.uiModel = CurrentEventProcessingUIFactory.getWorkflowTypeSettingUIModel(this.logger);
  }
  
  async ngOnInit() {
    this.uiModel.getWorkflowNames().then((eventTypes) => {
      this.logger.debug("WorkflowTypeSelectionComponent.ngOnInit Event types: " + eventTypes);
      this.eventTypes = eventTypes;
      this.logger.debug("Event types: " + this.eventTypes);
      this.selectedEventType = this.eventTypes[0];
    });
  }

  onSelectionChange(event: MatRadioChange) {
    this.uiModel.changeSelectedWorkflowType(event.value);
  }
}
