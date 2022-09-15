import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CustomersService } from '../../customers.service';
import { CustomerDto } from '../../data/dtos/customer-dto';
import { CustomersConnectorService } from '../../data/services/customer-connector.service';

@Component({
  selector: 'app-create-customer-dialog',
  templateUrl: './create-customer-dialog.component.html',
  styleUrls: ['./create-customer-dialog.component.scss'],
})
export class CreateCustomerDialogComponent implements OnInit {
  createCustomerForm = this.fb.group({
    code: this.fb.group({
      char0: '',
      char1: '',
      char2: '',
    }),
    name: '',
    address: '',
    taxCode: '',
    phone: '',
  });

  constructor(
    private dialogRef: MatDialog,
    private fb: FormBuilder,
    private customersConnectorService: CustomersConnectorService,
    private customersService: CustomersService
  ) {}

  ngOnInit(): void {}

  onCloseDialog() {
    this.dialogRef.closeAll();
  }

  onCreateCustomer({ value }: { value: any }) {
    const submitCustomer: CustomerDto = {
      ...value,
      code:
        this.createCustomerForm.controls['code'].value.char0 +
        this.createCustomerForm.controls['code'].value.char1 +
        this.createCustomerForm.controls['code'].value.char2,
    };

    this.customersConnectorService
      .create(submitCustomer)
      .subscribe((data: any) => {
        console.log(data);

        // this.customersService.addCustomer(value);
        this.customersService.reload();
      });
  }
}
