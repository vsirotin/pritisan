import { NestedTreeControl } from "@angular/cdk/tree";
import { MatTreeNestedDataSource } from "@angular/material/tree";

import { Logger } from '../../services/logging/logger';
import { ITreeSelectorUIModel } from '../../../features/models/capture/ui-model/current-event-processing-ui-model/event-type-setting-ui-model';


interface TreeNode {
  name: string;
  id: number;
  selected?: boolean;
  indeterminate?: boolean;
  children?: TreeNode[];
}

export class TreeSelectorComponent {

  treeControl = new NestedTreeControl<TreeNode>(node => node.children);
  dataSource = new MatTreeNestedDataSource<TreeNode>();

  constructor(
    private logger: Logger,
    private uiModel: ITreeSelectorUIModel) {
    this.uiModel.getTreeNodes().then(data => {
      this.logger.debug("TreeSelectorComponent: Data loaded: " + JSON.stringify(data));
      this.dataSource.data = data;
    });
   
  }

  hasChild = (_: number, node: TreeNode) =>
    !!node.children && node.children.length > 0;

  onNodeClick(node: TreeNode) {
    alert("TreeSelectorComponent: Node clicked: " + JSON.stringify(node));
    this.logger.debug("TreeSelectorComponent: Node clicked: " + JSON.stringify(node));
    this.uiModel.onTreeNodeSelected(node);
  }

}

