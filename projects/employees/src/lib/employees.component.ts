import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Column, Button } from 'ast';
import { BehaviorSubject } from 'rxjs';
import { CreateEmployeeDialogComponent } from './fragments/create-employee-dialog/create-employee-dialog.component';
import { DeactivateEmployeeDialogComponent } from './fragments/deactivate-employee-dialog/deactivate-employee-dialog.component';
import { ResetEmployeePasswordDialogComponent } from './fragments/reset-employee-password-dialog/reset-employee-password-dialog.component';

@Component({
  selector: 'epl-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss'],
})
export class EmployeesComponent implements OnInit {
  employeeData: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

  employeeTableColumns: Column[] = [
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
      name: 'name',
      header: 'TÊN NHÂN VIÊN',
      width: '30%',
      headerAlign: 'left',
      dataAlign: 'left',
      isFilterable: true,
      isSortable: false,
    },
    {
      name: 'role',
      header: 'CHỨC VỤ',
      width: '20%',
      headerAlign: 'left',
      dataAlign: 'left',
      isFilterable: true,
      isSortable: false,
    },
    {
      name: 'status',
      header: 'TRẠNG THÁI',
      width: '20%',
      headerAlign: 'left',
      dataAlign: 'left',
      isFilterable: true,
      isSortable: false,
    },
  ];

  buttons: Button[][] = [];

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {}

  onCreateEmployee() {
    const dialogRef = this.dialog.open(DeactivateEmployeeDialogComponent);
  }
}
