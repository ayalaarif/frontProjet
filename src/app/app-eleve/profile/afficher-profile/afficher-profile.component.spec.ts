import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AfficherProfileComponent } from './afficher-profile.component';

describe('AfficherProfileComponent', () => {
  let component: AfficherProfileComponent;
  let fixture: ComponentFixture<AfficherProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AfficherProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AfficherProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
