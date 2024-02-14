import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainComponent } from './main.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from "@angular/router/testing";
import { Logger } from '../../../shared/services/logging/logger';
import { Localizer } from '../../../shared/classes/localization/localizer';
import { MAIN_SOURCE_DIR } from './main.component';


describe('MainComponent', () => {
  const logger: Logger = new Logger();
  const localizer: Localizer = new Localizer(MAIN_SOURCE_DIR, 1, logger);
  
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainComponent, BrowserModule, BrowserAnimationsModule, RouterTestingModule],
      providers: [{provide: Localizer, useValue: localizer}, {provide: Logger, useValue: logger}]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

   it('should create', () => {
    expect(component).toBeTruthy();
  }); 
});
