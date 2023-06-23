import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterEmlpoiTempsComponent } from './ajouter-emlpoi-temps.component';

describe('AjouterEmlpoiTempsComponent', () => {
  let component: AjouterEmlpoiTempsComponent;
  let fixture: ComponentFixture<AjouterEmlpoiTempsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjouterEmlpoiTempsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AjouterEmlpoiTempsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
