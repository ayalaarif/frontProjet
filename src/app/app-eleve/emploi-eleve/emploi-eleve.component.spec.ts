import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmploiEleveComponent } from './emploi-eleve.component';

describe('EmploiEleveComponent', () => {
  let component: EmploiEleveComponent;
  let fixture: ComponentFixture<EmploiEleveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmploiEleveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmploiEleveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
