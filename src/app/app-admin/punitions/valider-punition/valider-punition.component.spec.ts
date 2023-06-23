import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValiderPunitionComponent } from './valider-punition.component';

describe('ValiderPunitionComponent', () => {
  let component: ValiderPunitionComponent;
  let fixture: ComponentFixture<ValiderPunitionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValiderPunitionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ValiderPunitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
