import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterBulletinComponent } from './ajouter-bulletin.component';

describe('AjouterBulletinComponent', () => {
  let component: AjouterBulletinComponent;
  let fixture: ComponentFixture<AjouterBulletinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjouterBulletinComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AjouterBulletinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
