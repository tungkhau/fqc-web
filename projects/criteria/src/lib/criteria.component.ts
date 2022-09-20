import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Column, Button } from 'ast';
import { BehaviorSubject } from 'rxjs';
import { CreateCriteriaDialogComponent } from './fragments/create-criteria-dialog/create-criteria-dialog.component';

@Component({
  selector: 'cri-criteria',
  templateUrl: './criteria.component.html',
  styleUrls: ['./criteria.component.scss'],
})
export class CriteriaComponent implements OnInit {
  productData: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

  productTableColumns: Column[] = [
    {
      name: 'id',
      header: 'ID',
      width: '20%',
      headerAlign: 'left',
      dataAlign: 'left',
      isFilterable: false,
      isSortable: true,
    },
    {
      name: 'code',
      header: 'MÃ HÀNG',
      width: '20%',
      headerAlign: 'left',
      dataAlign: 'left',
      isFilterable: false,
      isSortable: true,
    },
    {
      name: 'name',
      header: 'MẶT HÀNG',
      width: '30%',
      headerAlign: 'left',
      dataAlign: 'left',
      isFilterable: true,
      isSortable: false,
    },
    {
      name: 'customer',
      header: 'KHÁCH HÀNG',
      width: '20%',
      headerAlign: 'left',
      dataAlign: 'left',
      isFilterable: true,
      isSortable: false,
    },
  ];

  buttons: Button[][] = [];

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {}

  onCreateCriteria(): void {
    const dialog = this.dialog.open(CreateCriteriaDialogComponent);
  }
}
