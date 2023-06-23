import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarquerAbsencesComponent } from './marquer-absences.component';

describe('MarquerAbsencesComponent', () => {
  let component: MarquerAbsencesComponent;
  let fixture: ComponentFixture<MarquerAbsencesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarquerAbsencesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MarquerAbsencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
