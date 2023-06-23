import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AffecterNotesComponent } from './affecter-notes.component';

describe('AffecterNotesComponent', () => {
  let component: AffecterNotesComponent;
  let fixture: ComponentFixture<AffecterNotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AffecterNotesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AffecterNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
