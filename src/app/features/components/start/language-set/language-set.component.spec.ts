import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LanguageSetComponent } from './language-set.component';

describe('LanguageSetComponent', () => {
  let component: LanguageSetComponent;
  let fixture: ComponentFixture<LanguageSetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LanguageSetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LanguageSetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
