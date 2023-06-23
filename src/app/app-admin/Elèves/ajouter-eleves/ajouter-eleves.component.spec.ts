import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterElevesComponent } from './ajouter-eleves.component';

describe('AjouterElevesComponent', () => {
  let component: AjouterElevesComponent;
  let fixture: ComponentFixture<AjouterElevesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjouterElevesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AjouterElevesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
