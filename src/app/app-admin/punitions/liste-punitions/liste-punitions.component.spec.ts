import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListePunitionsComponent } from './liste-punitions.component';

describe('ListePunitionsComponent', () => {
  let component: ListePunitionsComponent;
  let fixture: ComponentFixture<ListePunitionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListePunitionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListePunitionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
