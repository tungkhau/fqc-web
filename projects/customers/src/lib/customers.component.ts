import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Button, Column } from 'ast-ast';
import { BehaviorSubject } from 'rxjs';
import { CustomersService } from './customers.service';
import { CustomersConnectorService } from './data/services/customer-connector.service';
import { EditCustomerDialogComponent } from './fragments/edit-customer-dialog/edit-customer-dialog.component';
import { CreateCustomerDialogComponent } from './fragments/create-customer-dialog/create-customer-dialog.component';

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
      name: 'address',
      header: 'ĐỊA CHỈ',
      width: '30%',
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

  onOpenCreateCustomerDialog() {
    console.log('open');

    const dialogRef = this.dialog.open(CreateCustomerDialogComponent);
    console.log(dialogRef);
  }

  onEditCustomer(i: number) {
    this.customersService.editingCustomer = {
      ...this.customerData.getValue()[i],
    };

    const dialogRef = this.dialog.open(EditCustomerDialogComponent);
  }

  onDeleteCustomer(i: number) {}
}
