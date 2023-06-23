import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterTraveauComponent } from './ajouter-traveau.component';

describe('AjouterTraveauComponent', () => {
  let component: AjouterTraveauComponent;
  let fixture: ComponentFixture<AjouterTraveauComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjouterTraveauComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AjouterTraveauComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
