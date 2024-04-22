import { Component, OnInit } from '@angular/core';

import {FormsModule} from '@angular/forms';
import {MatRadioChange, MatRadioModule} from '@angular/material/radio';
import { Logger } from '../../../../../shared/services/logging/logger';
import { WorkflowTypeSelectionUIModel } from "../../../../models/capture/ui-model/current-event-ui-model/event-type-selecting-ui-model";
import { CurrentEventNotificationService } from '../current-event-notification-service';


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

  uiModel!:  WorkflowTypeSelectionUIModel;

  eventTypes!: string[];
  selectedEventType!: string;
  constructor(private logger: Logger, private captureNotificationService: CurrentEventNotificationService) { 
    this.uiModel = new WorkflowTypeSelectionUIModel(this.logger, captureNotificationService);
  }
  
  async ngOnInit() {
    this.uiModel.getEventTypes().then((eventTypes) => {
      this.logger.debug("WorkflowTypeSelectionComponent.ngOnInit Event types: " + eventTypes);
      this.eventTypes = eventTypes;
      this.logger.debug("Event types: " + this.eventTypes);
      this.selectedEventType = this.eventTypes[0];
      this.uiModel.updateSelectedEventType(this.selectedEventType);

    });
  }

  onSelectionChange(event: MatRadioChange) {
    this.uiModel.updateSelectedEventType(event.value);
  }
}
