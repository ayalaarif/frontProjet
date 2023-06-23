import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AfficherEnseignantsComponent } from './afficher-enseignants.component';

describe('AfficherEnseignantsComponent', () => {
  let component: AfficherEnseignantsComponent;
  let fixture: ComponentFixture<AfficherEnseignantsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AfficherEnseignantsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AfficherEnseignantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
