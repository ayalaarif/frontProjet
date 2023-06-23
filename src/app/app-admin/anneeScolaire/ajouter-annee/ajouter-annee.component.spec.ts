import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterAnneeComponent } from './ajouter-annee.component';

describe('AjouterAnneeComponent', () => {
  let component: AjouterAnneeComponent;
  let fixture: ComponentFixture<AjouterAnneeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjouterAnneeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AjouterAnneeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
