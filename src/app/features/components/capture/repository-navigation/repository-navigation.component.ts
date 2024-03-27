import { Component, OnInit } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { RepositoryNavigationUIModel } from '../model/capture/ui-model/repository-navigation-ui-model';
import { IRepositoryNavigationUIModel } from '../model/capture/ui-model/repository-navigation-ui-model';
import { IRepositoryNavigationPresenter } from '../model/capture/ui-model/repository-navigation-ui-model';
import { RepositoryNavigationAction } from "../model/capture/business-logic-model/repository-navigation-business-logic-model";
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
export class RepositoryNavigationComponent implements IRepositoryNavigationPresenter, OnInit {
  RNA = RepositoryNavigationAction;

  uiModel!: IRepositoryNavigationUIModel;
  countEvents!: number;
  currentEvent!: string;

  constructor(private logger: Logger) {
    this.logger.debug("RepositoryNavigationComponent.constructor");
    this.uiModel = new RepositoryNavigationUIModel(logger);
    this.uiModel.setPresenter(this);
  }

  ngOnInit(): void {
    this.logger.debug("RepositoryNavigationComponent.ngOnInit");
    let result = this.uiModel.getRepositoryMetaData();
    this.logger.debug("RepositoryNavigationComponent.ngOnInit result: " + result);
    this.countEvents = result.count;
    this.currentEvent = this.currentEventToString(result.currentEventPosition);
  }

  setRepositoryMetaData(count: number, currentEventPosition: number): void {
    this.logger.debug("RepositoryNavigationComponent.setRepositoryMetaData count: " + count + " currentEventPosition: " + currentEventPosition);
    this.currentEvent = this.currentEventToString(currentEventPosition);
  }

  navigateTo(element: RepositoryNavigationAction) {
    this.logger.debug("RepositoryNavigationComponent.navigateTo element: " + element);
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
