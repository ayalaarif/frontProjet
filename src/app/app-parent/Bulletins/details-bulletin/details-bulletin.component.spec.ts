import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsBulletinComponent } from './details-bulletin.component';

describe('DetailsBulletinComponent', () => {
  let component: DetailsBulletinComponent;
  let fixture: ComponentFixture<DetailsBulletinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsBulletinComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsBulletinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
