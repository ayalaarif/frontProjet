import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTraveauxComponent } from './list-traveaux.component';

describe('ListTraveauxComponent', () => {
  let component: ListTraveauxComponent;
  let fixture: ComponentFixture<ListTraveauxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListTraveauxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListTraveauxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
