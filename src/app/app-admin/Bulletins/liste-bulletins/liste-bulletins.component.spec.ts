import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeBulletinsComponent } from './liste-bulletins.component';

describe('ListeBulletinsComponent', () => {
  let component: ListeBulletinsComponent;
  let fixture: ComponentFixture<ListeBulletinsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListeBulletinsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeBulletinsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
