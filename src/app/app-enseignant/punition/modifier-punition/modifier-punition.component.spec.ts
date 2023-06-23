import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierPunitionComponent } from './modifier-punition.component';

describe('ModifierPunitionComponent', () => {
  let component: ModifierPunitionComponent;
  let fixture: ComponentFixture<ModifierPunitionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifierPunitionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifierPunitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
