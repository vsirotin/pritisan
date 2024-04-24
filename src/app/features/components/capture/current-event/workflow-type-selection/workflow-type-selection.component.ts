import { Component, OnInit } from '@angular/core';

import {FormsModule} from '@angular/forms';
import {MatRadioChange, MatRadioModule} from '@angular/material/radio';
import { Logger } from '../../../../../shared/services/logging/logger';
import { WorkflowTypeSettingUIModel } from "../../../../models/capture/ui-model/current-event-processing-ui-model/workflow-type-setting-ui-model";
import { CurrentEventChangeNotificationService } from '../../../../models/capture/ui-model/current-event-processing-ui-model/current-event-notification-service';


@Component({
  selector: 'app-event-type-selecting',
  standalone: true,
  imports: [ 
    MatRadioModule, 
    FormsModule
  ],
  templateUrl: './workflow-type-selection.component.html',
  styleUrl: './workflow-type-selection.component.scss'
})
export class WorkflowTypeSelectionComponent implements OnInit{

  uiModel!:  WorkflowTypeSettingUIModel;

  eventTypes!: string[];
  selectedEventType!: string;
  constructor(private logger: Logger, private captureNotificationService: CurrentEventChangeNotificationService) { 
    this.uiModel = new WorkflowTypeSettingUIModel(this.logger, captureNotificationService);
  }
  
  async ngOnInit() {
    this.uiModel.getWorkflowNames().then((eventTypes) => {
      this.logger.debug("WorkflowTypeSelectionComponent.ngOnInit Event types: " + eventTypes);
      this.eventTypes = eventTypes;
      this.logger.debug("Event types: " + this.eventTypes);
      this.selectedEventType = this.eventTypes[0];
     // this.uiModel.changeSelectedWorkflowType(this.selectedEventType);

    });
  }

  onSelectionChange(event: MatRadioChange) {
    this.uiModel.changeSelectedWorkflowType(event.value);
  }
}
