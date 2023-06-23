import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierNiveauComponent } from './modifier-niveau.component';

describe('ModifierNiveauComponent', () => {
  let component: ModifierNiveauComponent;
  let fixture: ComponentFixture<ModifierNiveauComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifierNiveauComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifierNiveauComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
