import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UvDetailsComponent } from './uv-details.component';

describe('UvDetailsComponent', () => {
  let component: UvDetailsComponent;
  let fixture: ComponentFixture<UvDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UvDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UvDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
