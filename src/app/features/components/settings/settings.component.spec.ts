import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SettingsComponent } from './settings.component';
import { BrowserModule, By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from "@angular/router/testing";

describe('SettingsComponent', () => {
  let component: SettingsComponent;
  let fixture: ComponentFixture<SettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SettingsComponent, BrowserModule, BrowserAnimationsModule, RouterTestingModule]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('By start (by Default)...', () => {

    it('should have default label', () => {
      const matCardTitleDebugElement = fixture.debugElement.query(By.css('mat-card-title'));
      const matCardTitleElement = matCardTitleDebugElement.nativeElement;
      expect(matCardTitleElement.textContent).toEqual('Settings'); 
    });

    it('should have two buttons with default labels', () => {
      const expandButton1 = fixture.debugElement.query(By.css('button[mat-button]:nth-child(1)'));
      expect(expandButton1.nativeElement.textContent).toContain('Expand All');

      const expandButton2 = fixture.debugElement.query(By.css('button[mat-button]:nth-child(2)'));
      expect(expandButton2.nativeElement.textContent).toContain('Collapse All');
    });

    it('should have three sub-components with icons and default labels', () => {
      const panelTitles = fixture.debugElement.queryAll(By.css('mat-panel-title'));
      const panelDescriptions = fixture.debugElement.queryAll(By.css('mat-panel-description'));

      expect(panelTitles.length).toBe(3);
      expect(panelDescriptions.length).toBe(3);

      const expectedIconAndTitles = [
        'language Language', 
        'palette Appearence', 
        'rule_folder Rules'];

      panelTitles.forEach((title, index) => {
        expect(title.nativeElement.textContent).toContain(expectedIconAndTitles[index]);
      });

      const expectedDescriptions = [
        'English  English', 
        'Set appearence options', 
        'Set rules for automatic data deletion, etc.'];

      panelDescriptions.forEach((description, index) => {
        expect(description.nativeElement.textContent).toContain(expectedDescriptions[index]);
      });
    });
  });

  describe('After language changing...', () => {

    xit('after lamguage selection should have three sub-components with icons and labels in selected language', () => {
    });
  });
});
