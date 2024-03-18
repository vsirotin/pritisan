import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepositoryNavigationComponent } from './repository-navigation.component';
import { By } from '@angular/platform-browser';
import { IRepositoryNavigationUIModel } from '../model/capture-ui-model';
import { IRepositoryBusinessLogicModel, RepositoryBusinessLogicModel, RepositoryNavigationAction } from '../model/capture-business-logic-model';

describe('RepositoryNavigationComponent', () => {
  let component: RepositoryNavigationComponent;
  let fixture: ComponentFixture<RepositoryNavigationComponent>;
  let repositoryNavigationUIModel: IRepositoryNavigationUIModel;
  let repositoryBusinessLogicModel: IRepositoryBusinessLogicModel;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RepositoryNavigationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RepositoryNavigationComponent);
    component = fixture.componentInstance;
    repositoryNavigationUIModel = component.uiModel

    let blModel = new RepositoryBusinessLogicModel();
    repositoryNavigationUIModel.repositoryNavigationBusinessLogicModel = blModel;
    repositoryBusinessLogicModel = repositoryNavigationUIModel.repositoryNavigationBusinessLogicModel;
    fixture.detectChanges();
  });

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
    const p = fixture.debugElement.query(By.css('p'));
    expect(p.nativeElement.textContent.trim()).toContain("new/0");
  });

  describe('by empty repository ', () => {
    
    it('should have text new/0', () => {
      const p = fixture.debugElement.query(By.css('p'));
      expect(p.nativeElement.textContent.trim()).toContain("new/0");
    });

    it('should have enabling FFFFFT where F-false (disabled) and T-true (enabled)', () => {
      const buttons = fixture.debugElement.queryAll(By.css('button'));
      expect(buttons.length).toBe(6);

      expect(buttons[0].nativeElement.disabled).toBe(true)
      expect(buttons[1].nativeElement.disabled).toBe(true)
      expect(buttons[2].nativeElement.disabled).toBe(true)
      expect(buttons[3].nativeElement.disabled).toBe(true)
      expect(buttons[4].nativeElement.disabled).toBe(true)
      expect(buttons[5].nativeElement.disabled).toBe(false)

    });

    describe('should by click on button new', () => {
      
      it('navigateTo by UIModel called', () => {
        const buttonNew = fixture.debugElement.queryAll(By.css('button'))[5];

         spyOn(component, 'navigateTo');
         buttonNew.nativeElement.click();
         expect(component.navigateTo).toHaveBeenCalledWith(RepositoryNavigationAction.NEW);
      });

      it('updateDefaultEvent by business modell called', () => {
        const buttonNew = fixture.debugElement.queryAll(By.css('button'))[5];
        spyOn(repositoryBusinessLogicModel, 'updateDefaultEvent');
        buttonNew.nativeElement.click();
        expect(repositoryBusinessLogicModel.updateDefaultEvent).toHaveBeenCalled();
      });

      it('new/0 presented', () => {
        const buttonNew = fixture.debugElement.queryAll(By.css('button'))[5];
        buttonNew.nativeElement.click();
        const p = fixture.debugElement.query(By.css('p'));
        expect(p.nativeElement.textContent.trim()).toContain("new/0");   
      });
    });

    describe('by filled repository ', () => {
      xit('should have formattted text like new/1001', () => {
        expect(component).toBeTruthy();
      });

      xit('should have enabling TTFFFT where F-false (disabled) and T-true (enabled)', () => {
        expect(component).toBeTruthy();
      });

      xit('should by click on + propose default event and have text new/1001', () => {
        expect(component).toBeTruthy();
      });

      xit('should correct process sequence of clicks <, <<, <, >>, >, >', () => {
        expect(component).toBeTruthy();
      });
    });

  });
});
