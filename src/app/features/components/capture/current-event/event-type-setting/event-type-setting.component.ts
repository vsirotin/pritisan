// import { Component } from '@angular/core';
// import {MatTreeModule} from '@angular/material/tree';
// import { MatCheckboxModule } from '@angular/material/checkbox';

// import { MatButtonModule } from '@angular/material/button';
// import { MatIconModule } from '@angular/material/icon';
// import { TreeSelectorComponent } from '../../../../../shared/components/tree-selector/tree-selector.component';
import { ILogger, LoggerFactory } from '@vsirotin/log4ts';
//import { CurrentEventProcessingUIFactory } from '../../../../models/capture/ui-model/current-event-processing-ui-model/current-event-processing-ui-factory';

import {ArrayDataSource} from '@angular/cdk/collections';
import {CdkTree, CdkTreeModule} from '@angular/cdk/tree';
import {ChangeDetectionStrategy, Component, ViewChild} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {timer} from 'rxjs';
import {mapTo} from 'rxjs/operators';

/**
 * Food data with nested structure.
 * Each node has a name and an optional list of children.
 */
interface NestedFoodNode {
  name: string;
  id: string;
  children?: NestedFoodNode[];
}

function flattenNodes(nodes: NestedFoodNode[]): NestedFoodNode[] {
  const flattenedNodes = [];
  for (const node of nodes) {
    flattenedNodes.push(node);
    if (node.children) {
      flattenedNodes.push(...flattenNodes(node.children));
    }
  }
  return flattenedNodes;
}

@Component({
  selector: 'app-event-type-setting',
  standalone: true,
  imports: [
     CdkTreeModule, MatButtonModule, MatIconModule
  ],
   changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './event-type-setting.component.html',
  styleUrl: './event-type-setting.component.scss'
})

//TODO Move logic into the special class
export class EventTypeSettingComponent  {
onNodeClick(node: any) {
  alert("TreeSelectorComponent: Node clicked: " + JSON.stringify(node));
}

   @ViewChild(CdkTree)

  private logger1: ILogger = LoggerFactory.getLogger("eu.sirotin.pritisan.EventTypeSettingComponent");

//   constructor() {
//     super(CurrentEventProcessingUIFactory.getEventTypeSettingUIModel());  
//     this.logger1.debug("EventTypeSettingComponent.constructor");
//   }
// }

  tree!: CdkTree<NestedFoodNode>;

  //childrenAccessor = (dataNode: NestedFoodNode) => timer(1).pipe(mapTo(dataNode.children ?? []));
  childrenAccessor = (dataNode: NestedFoodNode) => dataNode.children ?? [];

  dataSource = new ArrayDataSource(EXAMPLE_DATA);

  hasChild = (_: number, node: NestedFoodNode) => !!node.children?.length;

  getParentNode(node: NestedFoodNode) {
    for (const parent of flattenNodes(EXAMPLE_DATA)) {
      if (parent.children?.includes(node)) {
        return parent;
      }
    }

    return null;
  }

  shouldRender(node: NestedFoodNode) {
    // let parent = this.getParentNode(node);
    // while (parent) {
    //   if (!this.tree.isExpanded(parent)) {
    //     return false;
    //   }
    //   parent = this.getParentNode(parent);
    // }
    return true;
  }
}



const EXAMPLE_DATA: NestedFoodNode[] = [
  {
    name: 'Fruit',
    id: '123',
    children: [{name: 'Apple', id: '1'}, {name: 'Banana', id: '2'}, {name: 'Banana', id: '4'}, {name: 'Fruit loops', id: '3'}],
  },
  {
    name: 'Vegetables',
    id: '11',
    children: [
      {
        name: 'Green',
        id: '5',
        children: [{name: 'Broccoli', id: '6'}, {name: 'Brussels sprouts', id: '7'}],
      },
      {
        name: 'Orange',
        id: '8',
        children: [{name: 'Pumpkins', id: '9'}, {name: 'Carrots', id: '10'}],
      },
    ],
  },
];

