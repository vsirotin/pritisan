import {AfterViewInit, Component, ViewChild} from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule} from '@angular/material/expansion';
import {MatCheckboxModule} from '@angular/material/checkbox';

import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';


import { LiveAnnouncer } from '@angular/cdk/a11y';

import { MatSort, Sort, MatSortModule}  from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { IRunningEvent, IRunningEventsUIModel, RunningEventsUIModel } from '../model/capture/ui-model/running-events-ui-model';
import { SelectionModel } from '@angular/cdk/collections';
import { Logger } from '../../../../shared/services/logging/logger';


const ELEMENT_DATA: IRunningEvent[] = [];

@Component({
  selector: 'app-running-events',
  standalone: true,
imports: [
    MatCheckboxModule,
    MatExpansionModule,
    MatToolbarModule,
    MatSelectModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule, 
    MatSortModule
    ],
  templateUrl: './running-events.component.html',
  styleUrl: './running-events.component.scss'
})
export class RunningEventsComponent implements  AfterViewInit {
  isExpanded: boolean = true;
  countRunningEvents = 0;
  areButtonsDisabled = true;

  displayedColumns: string[] = ['select', 'duration', 'start', 'description'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  uiModel! : IRunningEventsUIModel;

  selection = new SelectionModel<IRunningEvent>(true, []);

  constructor(private logger: Logger, private _liveAnnouncer: LiveAnnouncer) {
    this.logger.debug("RunningEventsComponent.constructor");
    this.uiModel = new RunningEventsUIModel(logger);
    this.uiModel.runningEventsPresentationChanged$.subscribe((events) => {
      this.logger.debug("RunningEventsComponent.constructor. Running events: " + JSON.stringify(events));
      this.dataSource.data = events;
      this.countRunningEvents = events.length;
      this.isExpanded = this.countRunningEvents > 0;
    });

    this.selection.changed.subscribe((event) => {
      if(this.selection.selected.length > 0) {
        this.areButtonsDisabled = false;
        this.uiModel.selectRunningEvent(this.selection.selected[0]);
      } else {
        this.areButtonsDisabled = true;
      }
      
    });
  }

  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  /** Announce the change in sort state for assistive technology. */
  announceSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: IRunningEvent): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.duration + 1}`;
  }

  onComplete() {
    const selectedIds = this.selection.selected.map((event) => event.id);
    this.logger.debug("RunningEventsComponent.onComplete onCompleteSelected: " + selectedIds);
    this.uiModel.completeEventsWithIds(selectedIds);
  }

  onDelete() {
    const selectedIds = this.selection.selected.map((event) => event.id);
    this.logger.debug("RunningEventsComponent.onDelete selectedIds: " + selectedIds);
    this.uiModel.deleteEventsWithIds(selectedIds);
  }

  onCancel() {
    this.logger.debug("RunningEventsComponent.onCancel");
    this.selection.clear();
  }

}