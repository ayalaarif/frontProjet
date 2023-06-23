import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AfficherEmploiComponent } from './afficher-emploi.component';

describe('AfficherEmploiComponent', () => {
  let component: AfficherEmploiComponent;
  let fixture: ComponentFixture<AfficherEmploiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AfficherEmploiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AfficherEmploiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
