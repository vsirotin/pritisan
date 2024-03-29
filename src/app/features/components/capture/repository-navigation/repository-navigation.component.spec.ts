import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepositoryNavigationComponent } from './repository-navigation.component';
import { By } from '@angular/platform-browser';
import { IRepositoryNavigationUIModel } from '../model/capture/ui-model/repository-navigation-ui-model';
import { RepositoryNavigationAction } from "../model/capture/business-logic-model/repository-navigation-business-logic-model";
import { NEW_EVENT_PODITION } from "../model/capture/business-logic-model/repository-navigation-business-logic-model";
import { RepositoryBusinessLogicModel } from "../model/capture/business-logic-model/repository-navigation-business-logic-model";
import { IRepositoryBusinessLogicModel } from "../model/capture/business-logic-model/repository-navigation-business-logic-model";
import { Logger } from '../../../../shared/services/logging/logger';
import { IMetaDataPersistence, MetaDataPersistence } from '../../../../shared/classes/db/time-series-db';
import { IRepositoryMetaDataExt } from "../model/capture/capture-common-interfaces";

describe('RepositoryNavigationComponent', () => {
  let component: RepositoryNavigationComponent;
  let fixture: ComponentFixture<RepositoryNavigationComponent>;
  let repositoryNavigationUIModel: IRepositoryNavigationUIModel;
  let repositoryBusinessLogicModel: IRepositoryBusinessLogicModel;
  let metaDataDB: IMetaDataPersistence;

  let p: any;
  let buttons: any;

  let buttonPreviousPage: any;
  let buttonPrevious: any;
  let buttonNext: any;
  let buttonNextPage: any;
  let buttonLast: any;
  let buttonNew: any;

  let logger: Logger

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RepositoryNavigationComponent]
    })
    .compileComponents();

    
    fixture = TestBed.createComponent(RepositoryNavigationComponent);
    component = fixture.componentInstance;
    repositoryNavigationUIModel = component.uiModel

    logger = new Logger();

    let blModel = new RepositoryBusinessLogicModel(logger);

    class MetaDataPersistenceMock extends MetaDataPersistence {
      override async readMetaData(): Promise<IRepositoryMetaDataExt>{
        return {currentEventPosition: NEW_EVENT_PODITION, countEvents: 0, pageSize: 10};
      }
    }

    metaDataDB = new MetaDataPersistenceMock(logger);
    blModel.metaDataDB = metaDataDB;

    await repositoryNavigationUIModel.setRepositoryNavigationBusinessLogicModel(blModel)

   
    repositoryBusinessLogicModel = repositoryNavigationUIModel.getRepositoryNavigationBusinessLogicModel();

    p = fixture.debugElement.query(By.css('p'));

    buttons = fixture.debugElement.queryAll(By.css('button'));

    buttonPreviousPage = buttons[0];
    buttonPrevious = buttons[1];
    buttonNext = buttons[2];
    buttonNextPage = buttons[3];
    buttonLast = buttons[4];
    buttonNew = buttons[5];

    await component.ngOnInit();
    fixture.detectChanges();
  });

  describe('default settings ', () => {

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should have UI model', () => {  
      expect(repositoryNavigationUIModel).toBeTruthy();
    });

    it('should have business logic model', () => {  
      expect(repositoryBusinessLogicModel).toBeTruthy();
    });

    it('should have 6 buttons with given icons', () => {
      const buttons = fixture.debugElement.queryAll(By.css('button'));
      expect(buttons.length).toBe(6);


      const expectedIcons = [
        'keyboard_double_arrow_left',
        'keyboard_arrow_left', 
        'keyboard_arrow_right', 
        'keyboard_double_arrow_right',
        'last_page', 
        'more_time'];

        buttons.forEach((button, index) => {
        expect(button.nativeElement.textContent.trim()).toContain(expectedIcons[index]);
      });
    });

    it('should have text in given format', () => {
      expect(p.nativeElement.textContent.trim()).toContain("new/0");
    });

  });

  describe('by empty repository ', () => {
    
    it('should have text new/0', () => {
     
      expect(p.nativeElement.textContent.trim()).toContain("new/0");
    });

    it('should have enabling FFFFFT where F-false (disabled) and T-true (enabled)', () => {

      expect(buttons.length).toBe(6);

      expect(buttonPreviousPage.nativeElement.disabled).toBe(true)
      expect(buttonPrevious.nativeElement.disabled).toBe(true)
      expect(buttonNext.nativeElement.disabled).toBe(true)
      expect(buttonNextPage.nativeElement.disabled).toBe(true)
      expect(buttonLast.nativeElement.disabled).toBe(true)
      expect(buttonNew.nativeElement.disabled).toBe(false)

    });

    describe('should by click on button new', () => {
      
      it('navigateTo by UIModel called', () => {
         spyOn(component, 'navigateTo');
         buttonNew.nativeElement.click();
         expect(component.navigateTo).toHaveBeenCalledWith(RepositoryNavigationAction.NEW);
      });

      it('updateDefaultEvent by business modell called', () => {
        spyOn(metaDataDB, 'readEvent');
        buttonNew.nativeElement.click();
        expect(metaDataDB.readEvent).toHaveBeenCalledWith(NEW_EVENT_PODITION);
      });

      it('new/0 presented', () => {
        buttonNew.nativeElement.click();
        expect(p.nativeElement.textContent.trim()).toContain("new/0");   
      });
    });
  });

  describe('by filled repository and currentEvent is new', () => {

    class MetaDataPersistenceMock2 extends MetaDataPersistence {
      override async readMetaData(): Promise<IRepositoryMetaDataExt>{
        return {currentEventPosition: NEW_EVENT_PODITION, countEvents: 1001, pageSize: 10};
      }
    }

    beforeEach(async () => {
      let blModel = new RepositoryBusinessLogicModel(logger);
      metaDataDB = new MetaDataPersistenceMock2(logger);
      blModel.metaDataDB = metaDataDB;

      await repositoryNavigationUIModel.setRepositoryNavigationBusinessLogicModel(blModel);
      repositoryBusinessLogicModel = repositoryNavigationUIModel.getRepositoryNavigationBusinessLogicModel();

      await component.ngOnInit();
      fixture.detectChanges();
    });

    it('should have formattted text like new/1001', () => {
      expect(p.nativeElement.textContent.trim()).toContain("new/1001");  
    });

    it('should have enabling TTFFFT where F-false (disabled) and T-true (enabled)', () => {
      const buttons = fixture.debugElement.queryAll(By.css('button'));
      expect(buttons.length).toBe(6);

      expect(buttonPreviousPage.nativeElement.disabled).toBe(false)
      expect(buttonPrevious.nativeElement.disabled).toBe(false)
      expect(buttonNext.nativeElement.disabled).toBe(true)
      expect(buttonNextPage.nativeElement.disabled).toBe(true)
      expect(buttonLast.nativeElement.disabled).toBe(true)
      expect(buttonNew.nativeElement.disabled).toBe(false)

    });

    describe('should by click on button new', () => {
      
      it('navigateTo by UIModel called', () => {
         spyOn(component, 'navigateTo');
         buttonNew.nativeElement.click();
         expect(component.navigateTo).toHaveBeenCalledWith(RepositoryNavigationAction.NEW);
      });

      it('updateDefaultEvent by business modell called', () => {
        spyOn(metaDataDB, 'readEvent');
        buttonNew.nativeElement.click();
        expect(metaDataDB.readEvent).toHaveBeenCalledWith(NEW_EVENT_PODITION);
      });

      it('new/0 presented', async () => {
        buttonNew.nativeElement.click();
        await fixture.whenStable();
        fixture.detectChanges();
        expect(p.nativeElement.textContent.trim()).toContain("new/1001");   
      });
    });


    it('should correct process click <', async () => {
      buttonPrevious.nativeElement.click(); 
      await fixture.whenStable();
      fixture.detectChanges();
      expect(p.nativeElement.textContent.trim()).toContain("1001/1001");

    });

    it('should correct process click <<', async () => {

      buttonPreviousPage.nativeElement.click();
      await fixture.whenStable();
      fixture.detectChanges();
      expect(p.nativeElement.textContent.trim()).toContain("991/1001");  
      
    });

    it('should correct process click on LAST', async () => {

      buttonPreviousPage.nativeElement.click();
      await fixture.whenStable();
      fixture.detectChanges();

      buttonLast.nativeElement.click();
      await fixture.whenStable();
      fixture.detectChanges();
      expect(p.nativeElement.textContent.trim()).toContain("1001/1001");  
      
    });
  });

  describe('by filled repository and currentEvent is in the middle', () => {

    beforeEach(async () => {
      let blModel = new RepositoryBusinessLogicModel(logger);
      
      class MetaDataPersistenceMock3 extends MetaDataPersistence {

        override async readMetaData(): Promise<IRepositoryMetaDataExt>{
          return {currentEventPosition: 500, countEvents: 1001, pageSize: 10};
        }
      }

      metaDataDB = new MetaDataPersistenceMock3(logger);
      blModel.metaDataDB = metaDataDB;

      await repositoryNavigationUIModel.setRepositoryNavigationBusinessLogicModel(blModel);
      component.uiModel = repositoryNavigationUIModel;
      repositoryBusinessLogicModel = repositoryNavigationUIModel.getRepositoryNavigationBusinessLogicModel();

      await component.ngOnInit();
      fixture.detectChanges();
    });

    describe('and default settings', () => {

      it('should have formattted text like 500/1001', () => {
        expect(p.nativeElement.textContent.trim()).toContain("500/1001");  
      });

      it('should have enabling FFFFFF where F-false (disabled) and T-true (enabled)', () => {

        expect(buttonPreviousPage.nativeElement.disabled).toBe(false)
        expect(buttonPrevious.nativeElement.disabled).toBe(false)
        expect(buttonNext.nativeElement.disabled).toBe(false)
        expect(buttonNextPage.nativeElement.disabled).toBe(false)
        expect(buttonLast.nativeElement.disabled).toBe(false)
        expect(buttonNew.nativeElement.disabled).toBe(false)

      });
    });

    describe('should by click on button new', () => {
      
      it('navigateTo by UIModel called', () => {
         spyOn(component, 'navigateTo');
         buttonNew.nativeElement.click();
         expect(component.navigateTo).toHaveBeenCalledWith(RepositoryNavigationAction.NEW);
      });

      it('updateDefaultEvent by business modell called', () => {

        spyOn(metaDataDB, 'readEvent');
        buttonNew.nativeElement.click();
        expect(metaDataDB.readEvent).toHaveBeenCalledWith(NEW_EVENT_PODITION);
      });

      it('new/1001 presented', async () => {
        buttonNew.nativeElement.click();
        await fixture.whenStable();
        fixture.detectChanges();
        expect(p.nativeElement.textContent.trim()).toContain("new/1001");   
      });
    });

    describe('by other buttons', () => {

      it('should correct process click <', async () => {
        buttonPrevious.nativeElement.click(); 
        await fixture.whenStable();
        fixture.detectChanges();
        expect(p.nativeElement.textContent.trim()).toContain("499/1001");

      });

      it('should correct process click <<', async() => {

        buttonPreviousPage.nativeElement.click();
        await fixture.whenStable();
        fixture.detectChanges();
        expect(p.nativeElement.textContent.trim()).toContain("490/1001");  
        
      });

      it('should correct process click >', async() => {
        buttonNext.nativeElement.click(); 
        await fixture.whenStable();
        fixture.detectChanges();
        expect(p.nativeElement.textContent.trim()).toContain("501/1001");

      });

      it('should correct process click >>', async() => {

        buttonNextPage.nativeElement.click();
        await fixture.whenStable();
        fixture.detectChanges();
        expect(p.nativeElement.textContent.trim()).toContain("510/1001");  
        
      });

      it('should correct process click on LAST',async () => {

        buttonLast.nativeElement.click();
        await fixture.whenStable();
        fixture.detectChanges();
        expect(p.nativeElement.textContent.trim()).toContain("1001/1001");  
        
      });
    });
  });
});




