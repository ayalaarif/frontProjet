import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeSessionsComponent } from './liste-sessions.component';

describe('ListeSessionsComponent', () => {
  let component: ListeSessionsComponent;
  let fixture: ComponentFixture<ListeSessionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListeSessionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeSessionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
