import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AffecterGroupeComponent } from './affecter-groupe.component';

describe('AffecterGroupeComponent', () => {
  let component: AffecterGroupeComponent;
  let fixture: ComponentFixture<AffecterGroupeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AffecterGroupeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AffecterGroupeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
