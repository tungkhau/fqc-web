import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CustomerDto } from 'projects/customers/src/lib/data/dtos/customer-dto';
import { CustomersService } from 'customers';
import { CustomersConnectorService } from '../../data/services/criteria-connector.service';
import { Customer } from '../../data/models/criteria.model';

@Component({
  selector: 'app-edit-customer-dialog',
  templateUrl: './edit-customer-dialog.component.html',
  styleUrls: ['./edit-customer-dialog.component.scss'],
})
export class EditCustomerDialogComponent implements OnInit {
  editCustomerForm = this.fb.group({
    code: this.fb.group({
      char0: this.data.customer.code.slice(0, 1),
      char1: this.data.customer.code.slice(1, 2),
      char2: this.data.customer.code.slice(2, 3),
    }),
    name: this.data.customer.name,
    fullName: this.data.customer.fullName,
    address: this.data.customer.address || '',
    taxCode: this.data.customer.taxCode || '',
    phoneNumber: this.data.customer.phoneNumber || '',
  });

  constructor(
    private dialogRef: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: { customer: Customer },
    private fb: FormBuilder,
    private customersService: CustomersService,
    private customersConnectorService: CustomersConnectorService
  ) {}

  ngOnInit(): void {}

  onCloseDialog() {
    this.dialogRef.closeAll();
  }

  onUpdateCustomer({ value }: { value: CustomerDto }) {
    const submitCustomer = {
      address: value.address,
      taxCode: value.taxCode,
      phoneNumber: value.phoneNumber,
    };

    if (value.id) {
      this.customersConnectorService
        .update(value.id, submitCustomer)
        .subscribe((data: any) => {
          this.customersService.reload();
        });
    }
  }
}
