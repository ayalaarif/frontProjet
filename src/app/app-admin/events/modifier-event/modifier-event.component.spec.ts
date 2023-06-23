import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierEventComponent } from './modifier-event.component';

describe('ModifierEventComponent', () => {
  let component: ModifierEventComponent;
  let fixture: ComponentFixture<ModifierEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifierEventComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifierEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
