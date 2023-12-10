import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSavingPlanComponent } from './create-saving-plan.component';

describe('CreateSavingPlanComponent', () => {
  let component: CreateSavingPlanComponent;
  let fixture: ComponentFixture<CreateSavingPlanComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateSavingPlanComponent]
    });
    fixture = TestBed.createComponent(CreateSavingPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
