import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AfficherNotesComponent } from './afficher-notes.component';

describe('AfficherNotesComponent', () => {
  let component: AfficherNotesComponent;
  let fixture: ComponentFixture<AfficherNotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AfficherNotesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AfficherNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
