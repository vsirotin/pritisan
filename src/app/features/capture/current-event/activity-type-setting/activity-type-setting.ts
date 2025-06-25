import { ILogger, LoggerFactory } from '@vsirotin/log4ts';
import {ArrayDataSource} from '@angular/cdk/collections';
import {CdkTree, CdkTreeModule} from '@angular/cdk/tree';
import {ChangeDetectionStrategy, Component, OnDestroy, ViewChild} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { ILocalizationClient, LocalizerFactory } from '@vsirotin/localizer';
import * as uiItems from '../../../../../assets/languages/masterdata/lang/1/en-US.json';
import { CaptureController, IUpdateActityTypeReceiver } from '../../controller/capture-controller';
import { IActityTypeProvider, IActivityType } from '../../../models/capture/business-logic-model/current-event-business-logic-model/event-commons';
import { MatExpansionModule } from '@angular/material/expansion';
import { CommonModule } from '@angular/common';

// Interface for nested ontology of activity types
interface INestedOntologyNode {
  name: string;
  id: string;
  children?: INestedOntologyNode[];
}

const ACTIVITY_TYPES_LANG_DIR = "assets/languages/masterdata/lang";

// Component for selecting activity types in the application
// It uses a tree structure to display the activity types and allows the user to select one.
// It implements IActityTypeProvider to provide the selected activity type to the controller.
// It also implements ILocalizationClient to update the UI based on localization changes.
// The component uses Angular CDK Tree for displaying the hierarchical structure of activity types.
// It is part of the master data management feature in the application.
@Component({
  selector: 'app-event-type-setting',
  standalone: true,
  imports: [
    CommonModule,
     CdkTreeModule, 
     MatButtonModule, 
     MatIconModule,
     MatExpansionModule
  ],
   changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './activity-type-setting.html',
  styleUrl: './activity-type-setting.scss'
})


export class ActivityTypeSettingComponent  implements  IActityTypeProvider, ILocalizationClient<INestedOntologyNode[]>, OnDestroy{

  // --- Variables presented in UI ---
  @ViewChild(CdkTree)

  isExpanded: boolean = true; // Controls the expansion state of the tree
  title: string = "Activity Type: TODO"; // Title of the component
  nameSelectedAlternative: string = ""; // Name of the selected activity type

  // The tree structure representing the activity types
  ui: INestedOntologyNode[] = (uiItems as any).default;
  tree!: CdkTree<INestedOntologyNode>;

  // The accessor functions for the tree structure
  childrenAccessor = (dataNode: INestedOntologyNode) => dataNode.children ?? [];

  // The data source for the tree structure
  dataSource = new ArrayDataSource(this.ui);

  // Function to check if a node has children
  hasChild = (_: number, node: INestedOntologyNode) => !!node.children?.length;
  
  // Selected activity type ID and name
  selectedActivityTypeId: string = "";
  selectedActivityTypeName: string = "";

  //--- Common services ---
  private localizer  =  LocalizerFactory.createLocalizer<INestedOntologyNode[]>(ACTIVITY_TYPES_LANG_DIR, 1, this.ui, this);
  private logger: ILogger = LoggerFactory.getLogger("eu.sirotin.pritisan.EventTypeSettingComponent");

  // ---- Controller for processing selected activity type ---
  private updateActityTypeReceiver: IUpdateActityTypeReceiver;

  constructor() {
    this.logger.debug("In constructor ui: " + JSON.stringify(this.ui));
    CaptureController.setActivityTypeProvider(this);

    //TODO implements hier collapce of view after selection and presentation selected wiev with bold or simular
    this.updateActityTypeReceiver = CaptureController.getUpdateActityTypeReceiver();
  }

  // --- Processing of user actions ---

  // This method is called when the user clicks on a node in the tree.
  // It updates the selected activity type .
  onNodeClick(node: any) {
    this.logger.debug("onNodeClick node: " + JSON.stringify(node));
    this.selectedActivityTypeId = node.id as string;
    this. selectedActivityTypeName = node.name as string;
    this.isExpanded = false; // collapse the panel after a selection is made
  }

  // -- UI-relevant functions 

  isSelected(node: INestedOntologyNode): boolean {
    return this.selectedActivityTypeId === node.id;
  }


  //-- Implemention of interfaces for providing selected activity type to the controller ---

  //Implementation of IActityTypeProvider interface ---

  // This method is called to get the currently selected activity type.
  // It returns an object containing the selected activity type ID and name.
  getActivityType(): IActivityType {
    return {activityTypeId: this.selectedActivityTypeId, activityName: this.selectedActivityTypeName};
  }

  // Implementation of ILocalizationClient interface
  updateLocalization(data: INestedOntologyNode[]): void {
    this.logger.debug("updateLocalization data: " + JSON.stringify(data));
    this.ui = data;
  }

  //--- Lifecycle hooks ---
  // This method is called when the component is destroyed.
  // It disposes the localizer to free resources.
  // It is important to call this method to avoid memory leaks.
  // It is called automatically by Angular when the component is destroyed.
  ngOnDestroy() {
    this.logger.debug("ngOnDestroy");
    this.localizer.dispose();
  }

}
