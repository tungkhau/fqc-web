import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CriteriaService } from '../../criteria.service';
import { CriteriaConnectorService } from '../../data/services/criteria-connector.service';

@Component({
  selector: 'app-create-customer-dialog',
  templateUrl: './create-criteria-dialog.component.html',
  styleUrls: ['./create-criteria-dialog.component.scss'],
})
export class CreateCriteriaDialogComponent implements OnInit {
  createCriteriaForm = this.fb.group({
    name: '',
    unit: 'YARD',
    gradeRequestDTOList: this.fb.array([this.fb.group({ allowedPoint: 0 })]),
  });

  unit: string = 'YARD';

  constructor(
    private dialogRef: MatDialog,
    private fb: FormBuilder,
    private criteriaConnectorService: CriteriaConnectorService,
    private criteriaService: CriteriaService
  ) {}

  ngOnInit(): void {}

  onCloseDialog() {
    this.dialogRef.closeAll();
  }

  getGrades() {
    return this.createCriteriaForm.get('gradeRequestDTOList') as FormArray;
  }

  getChar(i: number) {
    return String.fromCharCode(65 + i);
  }

  onChangeUnit($event: any) {
    this.unit = $event.target.value;
    this.createCriteriaForm.get('unit')?.setValue($event.target.value);
  }

  onRemoveGrade() {
    this.getGrades().removeAt(this.getGrades().length - 1);
  }

  onAddGrade() {
    this.getGrades().push(this.fb.group({ allowedPoint: 0 }));
  }

  onCreateCriteria({ value }: { value: any }) {
    const submitCriteria = { ...value };

    console.log(submitCriteria);

    this.criteriaConnectorService
      .create(submitCriteria)
      .subscribe((data: any) => {
        this.criteriaService.reload();
        if (data.result === 'OK') this.onCloseDialog();
      });
  }
}
