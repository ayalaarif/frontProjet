import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AfficherParentComponent } from './afficher-parent.component';

describe('AfficherParentComponent', () => {
  let component: AfficherParentComponent;
  let fixture: ComponentFixture<AfficherParentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AfficherParentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AfficherParentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
