import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { IRepositoryPresentationModel, RepositoryNavigationUIModel } from '../model/capture-ui-model';

@Component({
  selector: 'app-repository-navigation',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './repository-navigation.component.html',
  styleUrl: './repository-navigation.component.scss'
})
export class RepositoryNavigationComponent implements IRepositoryPresentationModel {

  uiModel = new RepositoryNavigationUIModel();

  constructor() {
    this.uiModel.presenter = this;
  }

  currentEventPosition: string = "2";
  countEvents: number = 0;

  setRepositoryMetaData(count: number, currentEventPosition: number): void {
    this.countEvents = count;
    this.currentEventPosition = currentEventPosition.toString();
  }

  navigateTo(where: string) {
    this.uiModel.navigateTo(where);   
  }


}
