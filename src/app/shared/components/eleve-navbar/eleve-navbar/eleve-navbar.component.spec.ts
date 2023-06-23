import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EleveNavbarComponent } from './eleve-navbar.component';

describe('EleveNavbarComponent', () => {
  let component: EleveNavbarComponent;
  let fixture: ComponentFixture<EleveNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EleveNavbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EleveNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
