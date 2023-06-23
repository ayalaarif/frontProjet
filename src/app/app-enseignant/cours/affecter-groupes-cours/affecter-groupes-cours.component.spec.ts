import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AffecterGroupesCoursComponent } from './affecter-groupes-cours.component';

describe('AffecterGroupesCoursComponent', () => {
  let component: AffecterGroupesCoursComponent;
  let fixture: ComponentFixture<AffecterGroupesCoursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AffecterGroupesCoursComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AffecterGroupesCoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
