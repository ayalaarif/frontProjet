import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierSessionComponent } from './modifier-session.component';

describe('ModifierSessionComponent', () => {
  let component: ModifierSessionComponent;
  let fixture: ComponentFixture<ModifierSessionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifierSessionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifierSessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
