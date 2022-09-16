import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetEmployeePasswordDialogComponent } from './deactivate-employee-dialog.component';

describe('ResetEmployeePasswordDialogComponent', () => {
  let component: ResetEmployeePasswordDialogComponent;
  let fixture: ComponentFixture<ResetEmployeePasswordDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ResetEmployeePasswordDialogComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetEmployeePasswordDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
