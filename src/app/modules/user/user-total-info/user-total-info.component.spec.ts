import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserTotalInfoComponent } from './user-total-info.component';

describe('UserTotalInfoComponent', () => {
  let component: UserTotalInfoComponent;
  let fixture: ComponentFixture<UserTotalInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserTotalInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserTotalInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
