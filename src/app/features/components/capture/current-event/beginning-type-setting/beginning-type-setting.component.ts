import { Component, OnInit } from '@angular/core';
import { MatRadioChange, MatRadioModule } from '@angular/material/radio';
import { FormsModule } from '@angular/forms';
import { IAlternativeSelectionUIModel } from '../../../../models/capture/ui-model/current-event-processing-ui-model/beginning-type-setting-ui-model';
import { IEventType } from '../../../../models/capture/business-logic-model/current-event-business-logic-model/event-commons';
import { ILogger, LoggerFactory } from '@vsirotin/log4ts';

@Component({
  selector: 'app-beginning-type-setting',
  standalone: true,
  imports: [
    MatRadioModule, 
    FormsModule],
  templateUrl: './beginning-type-setting.component.html',
  styleUrl: './beginning-type-setting.component.scss'
})
export class BeginningTypeSettingComponent implements OnInit{

  uiModel!:  IAlternativeSelectionUIModel;

  beginTypes!: IEventType[];
  private logger: ILogger = LoggerFactory.getLogger("eu.sirotin.pritisan.BeginningTypeSettingComponent");
  selectedEventType!: IEventType;
  constructor() { 
   // this.uiModel = CurrentEventProcessingUIFactory.getBeginningTypeSettingUIModel(this.logger);
  }
  
  async ngOnInit() {
    this.uiModel.getAlternatives().then((beginTypes) => {
      this.logger.debug("BeginningTypeSettingComponent.ngOnInit Event types: " + beginTypes);
      // this.beginTypes = beginTypes;
      // this.logger.debug("Event types: " + this.beginTypes);
      // this.selectedEventType = this.beginTypes[0];
    });
  }

  onSelectionChange(event: MatRadioChange) {
    this.uiModel.alternativeSelected(event.value);
  }
}
