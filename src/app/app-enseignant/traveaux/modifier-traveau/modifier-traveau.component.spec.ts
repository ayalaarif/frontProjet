import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierTraveauComponent } from './modifier-traveau.component';

describe('ModifierTraveauComponent', () => {
  let component: ModifierTraveauComponent;
  let fixture: ComponentFixture<ModifierTraveauComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifierTraveauComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifierTraveauComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
