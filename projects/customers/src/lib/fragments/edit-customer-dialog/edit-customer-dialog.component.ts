import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CustomerDto } from 'projects/customers/src/lib/data/dtos/customer-dto';
import { CustomersService } from 'customers';

@Component({
  selector: 'app-edit-customer-dialog',
  templateUrl: './edit-customer-dialog.component.html',
  styleUrls: ['./edit-customer-dialog.component.scss'],
})
export class EditCustomerDialogComponent implements OnInit {
  createCustomerForm = this.fb.group({
    code: this.fb.group({
      char0: this.customersService.editingCustomer.code.substr(0, 1),
      char1: this.customersService.editingCustomer.code.substr(1, 1),
      char2: this.customersService.editingCustomer.code.substr(2, 1),
    }),
    name: this.customersService.editingCustomer.name,
    address: this.customersService.editingCustomer.address || '',
    taxCode: this.customersService.editingCustomer.taxCode || '',
    phoneNumber: this.customersService.editingCustomer.phoneNumber || '',
  });

  constructor(
    private dialogRef: MatDialog,
    private fb: FormBuilder,
    private customersService: CustomersService
  ) {}

  ngOnInit(): void {}

  onCloseDialog() {
    this.dialogRef.closeAll();
  }

  onUpdateCustomer({ value }: { value: CustomerDto }) {
    console.log({
      ...value,
      code:
        this.createCustomerForm.controls['code'].value.char0 +
        this.createCustomerForm.controls['code'].value.char1 +
        this.createCustomerForm.controls['code'].value.char2,
    });
  }
}
