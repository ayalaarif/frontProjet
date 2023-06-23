import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AfficherBulletinComponent } from './afficher-bulletin.component';

describe('AfficherBulletinComponent', () => {
  let component: AfficherBulletinComponent;
  let fixture: ComponentFixture<AfficherBulletinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AfficherBulletinComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AfficherBulletinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
