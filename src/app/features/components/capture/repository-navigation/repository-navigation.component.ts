import { Component, OnInit } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { IRepositoryNavigationUIModel, IRepositoryPresentationModel, RepositoryNavigationUIModel } from '../model/capture/capture-ui-model';
import { RepositoryNavigationAction } from '../model/capture/capture-business-logic-model';
import { Logger } from '../../../../shared/services/logging/logger';

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
export class RepositoryNavigationComponent implements IRepositoryPresentationModel, OnInit {
  RNA = RepositoryNavigationAction;

  uiModel!: IRepositoryNavigationUIModel;
  countEvents!: number;
  currentEvent!: string;

  constructor(private logger: Logger) {
    this.uiModel = new RepositoryNavigationUIModel(logger);
    this.uiModel.setPresenter(this);
  }

  ngOnInit(): void {
    let result = this.uiModel.getRepositoryMetaData();
    this.logger.debug("RepositoryNavigationComponent.ngOnInit result: " + result);
    this.countEvents = result.count;
    this.currentEvent = this.currentEventToString(result.currentEventPosition);
  }

  setRepositoryMetaData(count: number, currentEventPosition: number): void {
    console.log("RepositoryNavigationComponent.setRepositoryMetaData count: ", count, " currentEventPosition: ", currentEventPosition);
    this.countEvents = count;
    this.currentEvent = this.currentEventToString(currentEventPosition);
  }

  navigateTo(element: RepositoryNavigationAction) {
    this.uiModel.navigateTo(element);   
  }

  isDisabled(element: RepositoryNavigationAction ): boolean {
    return this.uiModel.isDisabled(element);
  }
  
  private currentEventToString(currentEventAsNumber: number): string {
    console.log("RepositoryNavigationComponent.currentEventToString currentEventAsNumber: " + currentEventAsNumber);
    if (currentEventAsNumber === -1) {
      return "new";
    }
    return currentEventAsNumber.toString();
  } 
 

  

}
