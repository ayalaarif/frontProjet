import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeEventsComponent } from './liste-events.component';

describe('ListeEventsComponent', () => {
  let component: ListeEventsComponent;
  let fixture: ComponentFixture<ListeEventsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListeEventsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
