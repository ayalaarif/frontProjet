import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterNiveauComponent } from './ajouter-niveau.component';

describe('AjouterNiveauComponent', () => {
  let component: AjouterNiveauComponent;
  let fixture: ComponentFixture<AjouterNiveauComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjouterNiveauComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AjouterNiveauComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
