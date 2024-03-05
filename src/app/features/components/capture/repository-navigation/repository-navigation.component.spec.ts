import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepositoryNavigationComponent } from './repository-navigation.component';

describe('RepositoryNavigationComponent', () => {
  let component: RepositoryNavigationComponent;
  let fixture: ComponentFixture<RepositoryNavigationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RepositoryNavigationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RepositoryNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
