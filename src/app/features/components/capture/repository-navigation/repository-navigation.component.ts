import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { IRepositoryNavigationUIModel, IRepositoryPresentationModel, RepositoryNavigationUIModel } from '../model/capture-ui-model';
import { RepositoryNavigationAction } from '../model/capture-business-logic-model';

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
  RNA = RepositoryNavigationAction;

  uiModel: IRepositoryNavigationUIModel = new RepositoryNavigationUIModel();

  constructor() {
    this.uiModel.setPresenter(this);
  }
  private currentEventAsNumber: number = -1;
  countEvents: number = 0;
  
  currentEventPosition(): string {
    if (this.currentEventAsNumber === -1) {
      return "new";
    }
    return this.currentEventAsNumber.toString();
  } 

  setRepositoryMetaData(count: number, currentEventPosition: number): void {
    this.countEvents = count;
    this.currentEventAsNumber = currentEventPosition;
  }

  navigateTo(where: string) {
    this.uiModel.navigateTo(where);   
  }

  isDisabled(element: RepositoryNavigationAction ): boolean {
    return this.uiModel.isDisabled(element);
  }

}
