import { Component } from '@angular/core';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener, MatTreeModule } from '@angular/material/tree';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Logger } from '../../../../../shared/services/logging/logger';
import { EventTypeSettingUIModel, IEventTypeSettingUIModel } from '../../../../models/capture/ui-model/current-event-processing-ui-model/event-type-setting-ui-model';
import { CurrentEventChangeNotificationService } from '../../../../models/capture/ui-model/current-event-processing-ui-model/current-event-notification-service';
import { ICurrentEventProcessingNavigation } from '../../../../models/capture/ui-model/current-event-processing-ui-model/current-event-processing-ui-model';

interface EventTypeNode {
  name: string;
  children?: EventTypeNode[];
}


/** Flat node with expandable and level information */
interface EventType {
  expandable: boolean;
  name: string;
  level: number;
}


@Component({
  selector: 'app-event-type-setting',
  standalone: true,
  imports: [
    MatTreeModule, 
    MatButtonModule, 
    MatIconModule
  ],
  templateUrl: './event-type-setting.component.html',
  styleUrl: './event-type-setting.component.scss'
})
export class EventTypeSettingComponent {

  uiModel!: IEventTypeSettingUIModel;

  private _transformer = (node: EventTypeNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
    };
  };

  treeControl = new FlatTreeControl<EventType>(
    node => node.level,
    node => node.expandable,
  );

  treeFlattener = new MatTreeFlattener(
    this._transformer,
    node => node.level,
    node => node.expandable,
    node => node.children,
  );

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);


  hasChild = (_: number, node: EventType) => node.expandable;

  constructor(
    private logger: Logger, 
    private captureNotificationService: CurrentEventChangeNotificationService) {
    this.uiModel = new EventTypeSettingUIModel(logger, captureNotificationService);
    this.uiModel.getEventTypes().then(data => {
      this.logger.debug("ActivityTypeSelectingComponent: Data loaded: " + JSON.stringify(data));
      this.dataSource.data = data;
    });
   
  }

  onNodeClick(node: EventType) {
    this.logger.debug("ActivityTypeSelectingComponent: Node clicked: " + JSON.stringify(node));
    this.uiModel.onEventTypeSelected(node);
  }


}

