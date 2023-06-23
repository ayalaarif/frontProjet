import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeAnneesComponent } from './liste-annees.component';

describe('ListeAnneesComponent', () => {
  let component: ListeAnneesComponent;
  let fixture: ComponentFixture<ListeAnneesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListeAnneesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeAnneesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
