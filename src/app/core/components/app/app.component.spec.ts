import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { BrowserModule, By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LocalizerFactory } from '@vsirotin/localizer';
import { StartComponent } from '../../../features/components/start/start.component';


describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  async function createComponent() {
    await TestBed.configureTestingModule({
      imports: [AppComponent, BrowserModule, BrowserAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }

  beforeEach(async () => {

   localStorage.clear(); // Clear local storage before each test
    

  });

  afterAll(() => {
   // localStorage.clear(); // Clear local storage after all tests
  });
  

  xit('should create the app', async () => {
    await createComponent();
    expect(component).toBeTruthy();
  });


  it('if language not set then language-set component should be presented for user', async () => {
  
    let currentLanguageIsSaved = LocalizerFactory.isCurentLanguageSaved();
    expect(currentLanguageIsSaved).toBeFalse();

    await createComponent();
    
    // Check if the language-set component is present in the DOM
    const languageSetElement = fixture.debugElement.query(By.css('app-language-set'));
    expect(languageSetElement).toBeTruthy();
  });

  xit('if language set then welcome component should be presented for user', async () => {
  
    localStorage.setItem("CurrentLanguage", "en-US");
    localStorage.setItem("KEY_USER_LANGUAGE_SET", "true");
    await createComponent();
    component.ngOnInit();
    // Check if the language-set component is present in the DOM
    console.log("fixture.debugElemen", fixture.debugElement);
    const welcomer = fixture.debugElement.query(By.css('app-welcome'));
    console.log("welcomer", welcomer);
    expect(welcomer).toBeTruthy();
  });

});
