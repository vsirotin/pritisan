import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WelcomeComponentGalery } from './welcome-galery.component';

describe('WelcomeComponent', () => {
  let component: WelcomeComponentGalery;
  let fixture: ComponentFixture<WelcomeComponentGalery>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WelcomeComponentGalery]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WelcomeComponentGalery);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
