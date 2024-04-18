import { Component, OnInit } from '@angular/core';

import {FormsModule} from '@angular/forms';
import {MatRadioChange, MatRadioModule} from '@angular/material/radio';
import { Logger } from '../../../../../shared/services/logging/logger';
import { EventTypeSelectingUIModel } from "../../../../models/capture/ui-model/current-event-ui-model/event-type-selecting-ui-model";
import { CurrentEventNotificationService } from '../current-event-notification-service';
import { IEventType } from '../../../../models/capture/business-logic-model/current-event-business-logic-model/event-commons';


@Component({
  selector: 'app-event-type-selecting',
  standalone: true,
  imports: [ 
    MatRadioModule, 
    FormsModule
  ],
  templateUrl: './event-type-selecting.component.html',
  styleUrl: './event-type-selecting.component.scss'
})
export class EventTypeSelectingComponent implements OnInit{

  uiModel!:  EventTypeSelectingUIModel;

  eventTypes!: string[];
  selectedEventType!: string;
  constructor(private logger: Logger, private captureNotificationService: CurrentEventNotificationService) { 
    this.uiModel = new EventTypeSelectingUIModel(this.logger, captureNotificationService);
  }
  
  async ngOnInit() {
    this.uiModel.getEventTypes().then((eventTypes) => {
      this.logger.debug("EventTypeSelectingComponent.ngOnInit Event types: " + eventTypes);
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
