import { Component, OnInit } from '@angular/core';

import {FormsModule} from '@angular/forms';
import {MatRadioChange, MatRadioModule} from '@angular/material/radio';
import { Logger } from '../../../../../shared/services/logging/logger';
import { IWorkflowTypeSettingUIModel } from "../../../../models/capture/ui-model/current-event-processing-ui-model/workflow-type-setting-ui-model";
import { CurrentEventProcessingUIFactory } from '../../../../models/capture/ui-model/current-event-processing-ui-model/current-event-processing-ui-factory';


@Component({
  selector: 'app-workflow-type-selection',
  standalone: true,
  imports: [ 
    MatRadioModule, 
    FormsModule
  ],
  templateUrl: './workflow-type-selection.component.html',
  styleUrl: './workflow-type-selection.component.scss'
})
export class WorkflowTypeSelectionComponent implements OnInit{

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
