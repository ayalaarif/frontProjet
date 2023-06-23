import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandePreinscriptionComponent } from './demande-preinscription.component';

describe('DemandePreinscriptionComponent', () => {
  let component: DemandePreinscriptionComponent;
  let fixture: ComponentFixture<DemandePreinscriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DemandePreinscriptionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DemandePreinscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
