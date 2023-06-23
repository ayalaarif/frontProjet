import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileEnseignantComponent } from './profile-enseignant.component';

describe('ProfileEnseignantComponent', () => {
  let component: ProfileEnseignantComponent;
  let fixture: ComponentFixture<ProfileEnseignantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileEnseignantComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileEnseignantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
