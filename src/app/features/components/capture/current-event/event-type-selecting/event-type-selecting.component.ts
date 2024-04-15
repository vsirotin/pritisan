import { Component, OnInit } from '@angular/core';

import {FormsModule} from '@angular/forms';
import {MatRadioChange, MatRadioModule} from '@angular/material/radio';
import { Logger } from '../../../../../shared/services/logging/logger';
import { EventTypeSelectingUIModel } from "../../model/capture/ui-model/event-type-selecting-ui-model";
import { CaptureNotificationService } from '../../capture-notification-service';


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
  constructor(private logger: Logger, private captureNotificationService: CaptureNotificationService) { 
    this.uiModel = new EventTypeSelectingUIModel(this.logger, captureNotificationService);
  }
  
  async ngOnInit() {
    this.uiModel.getEventTypes().then((eventTypes) => {
      this.eventTypes = eventTypes;
      this.logger.debug("Event types: " + this.eventTypes);
      this.selectedEventType = this.eventTypes[0];

    });
  }

  onSelectionChange(event: MatRadioChange) {
    this.uiModel.updateSelectedEventType(event.value);
  }
}
