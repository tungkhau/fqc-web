import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Button, Column } from 'ast';
import { BehaviorSubject } from 'rxjs';
import { CustomersService } from './customers.service';
import { CustomersConnectorService } from './data/services/customer-connector.service';
import { EditCustomerDialogComponent } from './fragments/edit-customer-dialog/edit-customer-dialog.component';
import { CreateCustomerDialogComponent } from './fragments/create-customer-dialog/create-customer-dialog.component';
import { DeleteCustomerDialogComponent } from './fragments/delete-customer-dialog/delete-customer-dialog.component';

@Component({
  selector: 'ctm-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss'],
})
export class CustomersComponent implements OnInit {
  customerData: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

  customerTableColumns: Column[] = [
    {
      name: 'code',
      header: 'MÃ KH',
      width: '8%',
      headerAlign: 'left',
      dataAlign: 'left',
      isFilterable: false,
      isSortable: true,
    },
    {
      name: 'name',
      header: 'TÊN KHÁCH HÀNG',
      width: '20%',
      headerAlign: 'left',
      dataAlign: 'left',
      isFilterable: true,
      isSortable: false,
    },
    {
      name: 'fullName',
      header: 'TÊN ĐẦY ĐỦ',
      width: '20%',
      headerAlign: 'left',
      dataAlign: 'left',
      isFilterable: true,
      isSortable: false,
    },
    {
      name: 'address',
      header: 'ĐỊA CHỈ',
      width: '20%',
      headerAlign: 'left',
      dataAlign: 'left',
      isFilterable: true,
      isSortable: false,
    },
    {
      name: 'taxCode',
      header: 'MÃ SỐ THUẾ',
      width: '10%',
      headerAlign: 'left',
      dataAlign: 'left',
      isFilterable: true,
      isSortable: false,
    },
    {
      name: 'phone',
      header: 'ĐIỆN THOẠI',
      width: '15%',
      headerAlign: 'left',
      dataAlign: 'left',
      isFilterable: true,
      isSortable: false,
    },
  ];

  buttons: Button[][] = [];

  constructor(
    private customersConnectorService: CustomersConnectorService,
    private customersService: CustomersService,
    private activatedRoute: ActivatedRoute,
    public dialog: MatDialog
  ) {
    this.activatedRoute.data.subscribe((data) => {
      this.customersConnectorService.setApiUrl(data['apiUrl']);
    });
  }

  ngOnInit(): void {
    this.customersConnectorService.fetch().subscribe((data) => {
      this.customerData.next(data);
    });
  }

  fakeCustomer = {
    id: '123',
    code: '123',
    name: '123',
    fullName: '123',
    address: '123',
    taxCode: '123',
    phoneNumber: '123',
  };
  onOpenCreateCustomerDialog() {
    const dialogRef = this.dialog.open(DeleteCustomerDialogComponent, {
      data: { customer: this.fakeCustomer },
    });
  }

  onEditCustomer(i: number) {
    const dialogRef = this.dialog.open(EditCustomerDialogComponent, {
      data: { customer: this.fakeCustomer },
    });
  }

  onDeleteCustomer(i: number) {
    const dialogRef = this.dialog.open(DeleteCustomerDialogComponent, {
      data: { customer: this.fakeCustomer },
    });
  }
}
