import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValiderPreinscriptionComponent } from './valider-preinscription.component';

describe('ValiderPreinscriptionComponent', () => {
  let component: ValiderPreinscriptionComponent;
  let fixture: ComponentFixture<ValiderPreinscriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValiderPreinscriptionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ValiderPreinscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
