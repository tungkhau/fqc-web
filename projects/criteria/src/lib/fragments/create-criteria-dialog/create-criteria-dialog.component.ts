import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
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
    checkpoints: this.fb.array([0]),
  });

  constructor(
    private dialogRef: MatDialog,
    private fb: FormBuilder,
    private criteriaConnectorService: CriteriaConnectorService,
    private criteriaService: CriteriaService
  ) {
    console.log(this.createCriteriaForm.get('checkpoints'));
  }

  ngOnInit(): void {}

  onCloseDialog() {
    this.dialogRef.closeAll();
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
