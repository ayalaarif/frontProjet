import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnseignantNavbarComponent } from './enseignant-navbar.component';

describe('EnseignantNavbarComponent', () => {
  let component: EnseignantNavbarComponent;
  let fixture: ComponentFixture<EnseignantNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnseignantNavbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnseignantNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
