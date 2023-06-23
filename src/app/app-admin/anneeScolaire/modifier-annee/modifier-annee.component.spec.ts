import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierAnneeComponent } from './modifier-annee.component';

describe('ModifierAnneeComponent', () => {
  let component: ModifierAnneeComponent;
  let fixture: ComponentFixture<ModifierAnneeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifierAnneeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifierAnneeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
