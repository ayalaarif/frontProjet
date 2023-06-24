import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursAutreEtudiantComponent } from './cours-autre-etudiant.component';

describe('CoursAutreEtudiantComponent', () => {
  let component: CoursAutreEtudiantComponent;
  let fixture: ComponentFixture<CoursAutreEtudiantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoursAutreEtudiantComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursAutreEtudiantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
