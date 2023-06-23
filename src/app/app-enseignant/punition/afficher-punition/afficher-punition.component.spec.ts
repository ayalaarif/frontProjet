import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AfficherPunitionComponent } from './afficher-punition.component';

describe('AfficherPunitionComponent', () => {
  let component: AfficherPunitionComponent;
  let fixture: ComponentFixture<AfficherPunitionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AfficherPunitionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AfficherPunitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
