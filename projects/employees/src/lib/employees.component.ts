import { Component, OnInit } from '@angular/core';
import { Column, Button } from 'ast';
import { BehaviorSubject } from 'rxjs';

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

  constructor() {}

  ngOnInit(): void {}
}
