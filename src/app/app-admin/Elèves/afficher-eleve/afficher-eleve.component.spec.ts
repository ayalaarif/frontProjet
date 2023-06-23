import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AfficherEleveComponent } from './afficher-eleve.component';

describe('AfficherEleveComponent', () => {
  let component: AfficherEleveComponent;
  let fixture: ComponentFixture<AfficherEleveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AfficherEleveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AfficherEleveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
