import {AfterViewInit, Component, ViewChild} from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { LiveAnnouncer } from '@angular/cdk/a11y';

import { MatSort, Sort, MatSortModule}  from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RunningEventsUIModel } from '../model/capture-ui-model';

export interface PeriodicElement {
  duration: number;
  start: string;
  type: string;
  details: string;
}
const ELEMENT_DATA: PeriodicElement[] = [
  {duration: 10.1, start: 'Hydrogen', type: 'some  type 1', details: 'H-gR'},
  {duration: 2, start: 'Helium', type: 'some  type 12', details: 'H.dr'},
  {duration: 1.3, start: 'Lithium', type: 'some  type 5', details: 'Li.dd'},
  {duration: 0.4, start: 'Beryllium', type: 'some  type 14', details: 'Be'},
];

@Component({
  selector: 'app-running-events',
  standalone: true,
imports: [
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule, 
    MatSortModule
    ],
  templateUrl: './running-events.component.html',
  styleUrl: './running-events.component.scss'
})
export class RunningEventsComponent implements AfterViewInit {
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  uiModel!: RunningEventsUIModel;

  constructor(private _liveAnnouncer: LiveAnnouncer) {}

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
}