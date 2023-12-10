import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavingPlanComponent } from './saving-plan.component';

describe('SavingPlanComponent', () => {
  let component: SavingPlanComponent;
  let fixture: ComponentFixture<SavingPlanComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SavingPlanComponent]
    });
    fixture = TestBed.createComponent(SavingPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
