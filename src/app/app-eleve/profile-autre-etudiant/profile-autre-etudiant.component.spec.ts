import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileAutreEtudiantComponent } from './profile-autre-etudiant.component';

describe('ProfileAutreEtudiantComponent', () => {
  let component: ProfileAutreEtudiantComponent;
  let fixture: ComponentFixture<ProfileAutreEtudiantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileAutreEtudiantComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileAutreEtudiantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
