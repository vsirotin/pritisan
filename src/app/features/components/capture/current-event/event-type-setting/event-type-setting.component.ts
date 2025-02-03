import { Component } from '@angular/core';
import {MatTreeModule} from '@angular/material/tree';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TreeSelectorComponent } from '../../../../../shared/components/tree-selector/tree-selector.component';
import { ILogger, LoggerFactory } from '@vsirotin/log4ts';
import { CurrentEventProcessingUIFactory } from '../../../../models/capture/ui-model/current-event-processing-ui-model/current-event-processing-ui-factory';

@Component({
  selector: 'app-event-type-setting',
  standalone: true,
  imports: [
     MatTreeModule, 
     MatButtonModule, 
     MatIconModule,
     MatCheckboxModule
  ],
  templateUrl: '../../../../../shared/components/tree-selector/tree-selector.component.html',
  styleUrl: '../../../../../shared/components//tree-selector/tree-selector.component.scss'
})

export class EventTypeSettingComponent  extends TreeSelectorComponent{


  private logger1: ILogger = LoggerFactory.getLogger("eu.sirotin.pritisan.EventTypeSettingComponent");

  constructor() {
    super(CurrentEventProcessingUIFactory.getEventTypeSettingUIModel());  
    this.logger1.debug("EventTypeSettingComponent.constructor");
  }
}

