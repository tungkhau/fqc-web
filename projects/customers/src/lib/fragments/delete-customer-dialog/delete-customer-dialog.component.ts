import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CustomersService } from '../../customers.service';
import { Customer } from '../../data/models/customer.model';
import { CustomersConnectorService } from '../../data/services/customer-connector.service';

@Component({
  selector: 'epl-delete-customer-dialog',
  templateUrl: './delete-customer-dialog.component.html',
  styleUrls: ['./delete-customer-dialog.component.scss'],
})
export class DeleteCustomerDialogComponent implements OnInit {
  data: any[] = [{ ...this.dialogData.customer }];
  headers: string[] = [
    'ID',
    'TÊN KHÁCH HÀNG',
    'TÊN ĐẦY ĐỦ',
    'ĐỊA CHỈ',
    'MÃ SỐ THUẾ',
    'SĐT',
  ];
  attributes: string[] = [
    'id',
    'name',
    'fullName',
    'address',
    'taxCode',
    'phoneNumber',
  ];

  constructor(
    private dialogRef: MatDialog,
    @Inject(MAT_DIALOG_DATA) public dialogData: { customer: Customer },
    private customersConnectorService: CustomersConnectorService,
    private customersService: CustomersService
  ) {}

  ngOnInit(): void {}

  onCloseDialog() {
    this.dialogRef.closeAll();
  }

  onDelete() {
    this.customersConnectorService
      .delete(this.dialogData.customer.id)
      .subscribe((data) => {
        this.customersService.reload();
      });
  }
}
