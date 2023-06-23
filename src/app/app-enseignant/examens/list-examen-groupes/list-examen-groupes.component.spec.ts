import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListExamenGroupesComponent } from './list-examen-groupes.component';

describe('ListExamenGroupesComponent', () => {
  let component: ListExamenGroupesComponent;
  let fixture: ComponentFixture<ListExamenGroupesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListExamenGroupesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListExamenGroupesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
