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
import { EventTypeSettingUIModel, IEventTypeSettingUIModel } from '../../../../models/capture/ui-model/current-event-processing-ui-model/event-type-setting-ui-model';
import { ICurrentEventProcessingNavigation } from '../../../../models/capture/ui-model/current-event-processing-ui-model/current-event-processing-ui-model';
import { CurrentEventProcessingUIFactory } from '../../../../models/capture/ui-model/current-event-processing-ui-model/current-event-processing-ui-factory';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

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

interface FoodNode {
  name: string;
  id?: number;
  selected?: boolean;
  indeterminate?: boolean;
  children?: FoodNode[];
}

const TREE_DATA: FoodNode[] = [
  {
    name: "Fruit2",
    children: [
      { name: "Apple", id: 1 },
      { name: "Banana", id: 2 },
      { name: "Fruit loops", id: 3 }
    ]
  },
  {
    name: "Vegetables",
    children: [
      {
        name: "Green",
        children: [
          { name: "Broccoli", id: 4 },
          { name: "Brussel sprouts", id: 5 }
        ]
      },
      {
        name: "Orange",
        children: [{ name: "Pumpkins", id: 6 }, { name: "Carrots", id: 7 }]
      }
    ]
  }
];


@Component({
  selector: 'app-event-type-setting',
  standalone: true,
  imports: [
     MatTreeModule, 
     MatButtonModule, 
     MatIconModule,
     MatCheckboxModule
  ],
  templateUrl: './event-type-setting.component.html',
  styleUrl: './event-type-setting.component.scss'
})
export class EventTypeSettingComponent {

  uiModel!: IEventTypeSettingUIModel;

  treeControl = new NestedTreeControl<FoodNode>(node => node.children);
  dataSource = new MatTreeNestedDataSource<FoodNode>();


  constructor(
    private logger: Logger) {
    this.uiModel = CurrentEventProcessingUIFactory.getEventTypeSettingUIModel(this.logger);
    this.uiModel.getEventTypes().then(data => {
      this.logger.debug("ActivityTypeSelectingComponent: Data loaded: " + JSON.stringify(data));
      this.dataSource.data = data;
    });

    this.dataSource.data = TREE_DATA;
   
  }

  hasChild = (_: number, node: FoodNode) =>
    !!node.children && node.children.length > 0;

  onNodeClick(node: EventType) {
    alert("ActivityTypeSelectingComponent: Node clicked: " + JSON.stringify(node));
    this.logger.debug("ActivityTypeSelectingComponent: Node clicked: " + JSON.stringify(node));
    this.uiModel.onEventTypeSelected(node);
  }

}

