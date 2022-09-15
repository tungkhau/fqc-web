import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TblDataComponent } from './tbl-data.component';

describe('TblDataComponent', () => {
  let component: TblDataComponent;
  let fixture: ComponentFixture<TblDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TblDataComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TblDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
