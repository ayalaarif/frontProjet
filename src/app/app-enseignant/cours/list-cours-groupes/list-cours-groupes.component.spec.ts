import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCoursGroupesComponent } from './list-cours-groupes.component';

describe('ListCoursGroupesComponent', () => {
  let component: ListCoursGroupesComponent;
  let fixture: ComponentFixture<ListCoursGroupesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListCoursGroupesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListCoursGroupesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
