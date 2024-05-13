import { Component } from '@angular/core';
// import { FlatTreeControl } from '@angular/cdk/tree';
// import { MatTreeFlatDataSource, MatTreeFlattener, MatTreeModule } from '@angular/material/tree';
// import { MatIconModule } from '@angular/material/icon';
// import { MatButtonModule } from '@angular/material/button';
import { NestedTreeControl } from "@angular/cdk/tree";
import { MatTreeNestedDataSource } from "@angular/material/tree";
import { SelectionModel } from "@angular/cdk/collections";
import { FlatTreeControl } from "@angular/cdk/tree";
import {MatTreeModule} from '@angular/material/tree';
import { MatTreeFlatDataSource, MatTreeFlattener} from "@angular/material/tree";
import { MatCheckboxModule } from '@angular/material/checkbox';
import { Logger } from '../../../../../shared/services/logging/logger';
import { EventTypeSettingUIModel, ITreeSelectorUIModel } from '../../../../models/capture/ui-model/current-event-processing-ui-model/event-type-setting-ui-model';
import { ICurrentEventProcessingNavigation } from '../../../../models/capture/ui-model/current-event-processing-ui-model/current-event-processing-ui-model';
import { CurrentEventProcessingUIFactory } from '../../../../models/capture/ui-model/current-event-processing-ui-model/current-event-processing-ui-factory';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TreeSelectorComponent } from '../../../../../shared/components/tree-selector/tree-selector.component';




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


  constructor(
  logger: Logger) {
    super(logger, CurrentEventProcessingUIFactory.getEventTypeSettingUIModel(logger));  
    logger.debug("EventTypeSettingComponent.constructor");
  }
}

