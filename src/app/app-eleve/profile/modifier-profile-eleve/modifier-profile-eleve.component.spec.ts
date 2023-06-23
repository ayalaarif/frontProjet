import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierProfileEleveComponent } from './modifier-profile-eleve.component';

describe('ModifierProfileEleveComponent', () => {
  let component: ModifierProfileEleveComponent;
  let fixture: ComponentFixture<ModifierProfileEleveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifierProfileEleveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifierProfileEleveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
