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
    checkpoints: this.fb.array([100]),
  });

  unit: string = 'YARD';

  constructor(
    private dialogRef: MatDialog,
    private fb: FormBuilder,
    private criteriaConnectorService: CriteriaConnectorService,
    private criteriaService: CriteriaService
  ) {
    console.log(this.getCheckpoints().controls);
  }

  ngOnInit(): void {}

  onCloseDialog() {
    this.dialogRef.closeAll();
  }

  getCheckpoints() {
    return this.createCriteriaForm.get('checkpoints') as FormArray;
  }

  getChar(i: number) {
    return String.fromCharCode(65 + i);
  }

  onChangeUnit($event: any) {
    this.unit = $event.target.value;
    this.createCriteriaForm.get('unit')?.setValue($event.target.value);
  }

  onRemoveCheckpoint() {
    this.getCheckpoints().removeAt(this.getCheckpoints().length - 1);
  }

  onAddCheckpoint() {
    this.getCheckpoints().push(this.fb.control(0));
  }

  onCreateCriteria({ value }: { value: any }) {
    const submitCriteria = {};

    this.criteriaConnectorService
      .create(submitCriteria)
      .subscribe((data: any) => {
        console.log(data);

        // this.customersService.addCustomer(value);
        this.criteriaService.reload();
      });
  }
}
