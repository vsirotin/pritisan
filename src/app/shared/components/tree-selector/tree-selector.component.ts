import { FlatTreeControl } from "@angular/cdk/tree";
import { MatTreeFlattener, MatTreeFlatDataSource } from "@angular/material/tree";
import { ILogger, LoggerFactory } from '@vsirotin/log4ts';
import { ITreeSelectorUIModel } from '../../../features/models/capture/ui-model/current-event-processing-ui-model/event-type-setting-ui-model';

// Original TreeNode interface (as you have it)
interface TreeNode {
  name: string;
  id: number;
  selected?: boolean;
  indeterminate?: boolean;
  children?: TreeNode[];
}

// New interface for flat nodes
interface FlatTreeNode {
  name: string;
  id: number;
  level: number;
  expandable: boolean;
  selected?: boolean;
  indeterminate?: boolean;
  originalNode: TreeNode; // To preserve original node data and structure for logic
}

export class TreeSelectorComponent {
  private logger: ILogger = LoggerFactory.getLogger("eu.sirotin.pritisan.TreeSelectorComponent");

  // Transformer function for the MatTreeFlattener
  private transformer = (node: TreeNode, level: number): FlatTreeNode => {
    return {
      name: node.name,
      id: node.id,
      level: level,
      expandable: !!node.children && node.children.length > 0,
      selected: node.selected,
      indeterminate: node.indeterminate,
      originalNode: node // Store the original node
    };
  }

  // Tree control
  treeControl = new FlatTreeControl<FlatTreeNode>(
    node => node.level, // Function to get the level of a node
    node => node.expandable // Function to check if a node is expandable
  );

  // Tree flattener
  treeFlattener = new MatTreeFlattener<TreeNode, FlatTreeNode>(
    this.transformer,
    node => node.level,
    node => node.expandable,
    node => node.children
  );

  // Data source
  dataSource = new MatTreeFlatDataSource<TreeNode, FlatTreeNode>(this.treeControl, this.treeFlattener);

  constructor(private uiModel: ITreeSelectorUIModel) {
    this.uiModel.getTreeNodes().then(data => {
      this.logger.debug("TreeSelectorComponent: Data loaded: " + JSON.stringify(data));
      this.dataSource.data = data; // MatTreeFlatDataSource takes the nested data
    });
  }

  // No longer need hasChild as 'expandable' property on FlatTreeNode handles this.
  // The template will use treeControl.isExpanded(node) or similar.

  onNodeClick(flatNode: FlatTreeNode): void {
    // Use flatNode.originalNode if your uiModel expects the original TreeNode structure
    alert("TreeSelectorComponent: Node clicked: " + JSON.stringify(flatNode.originalNode));
    this.logger.debug("TreeSelectorComponent: Node clicked: " + JSON.stringify(flatNode.originalNode));
    this.uiModel.onTreeNodeSelected(flatNode.originalNode); 
    // You might need to update selection state on the flatNode as well for UI consistency
    // For example, if onTreeNodeSelected modifies the originalNode.selected,
    // you might need to re-evaluate the flat nodes or specific node.
  }
}

