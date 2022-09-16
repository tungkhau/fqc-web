import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Column, Button } from 'ast';
import { BehaviorSubject } from 'rxjs';
import { Employee } from './data/models/emplyee.model';
import { EmployeesConnectorService } from './data/services/employee-connector.service';
import { EmployeesService } from './employees.service';
import { CreateEmployeeDialogComponent } from './fragments/create-employee-dialog/create-employee-dialog.component';

@Component({
  selector: 'epl-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss'],
})
export class EmployeesComponent implements OnInit {
  employeeData: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

  employeeTableColumns: Column[] = [
    {
      name: 'code',
      header: 'MÃ NHÂN VIÊN',
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
      name: 'roleName',
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

  constructor(
    public dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private employeeConnectorService: EmployeesConnectorService,
    private employeesService: EmployeesService
  ) {
    this.activatedRoute.data.subscribe((data) => {
      this.employeeConnectorService.setApiUrl(data['apiUrl']);
    });
  }

  ngOnInit(): void {
    this.employeeConnectorService.fetch().subscribe((data) => {
      this.employeeData.next(
        data.map((e, i) => {
          this.buttons.push([
            {
              title: '',
              text: 'Chỉnh sửa',
              icon: 'fa-pen-to-square',
              iconColor: null,
              action: () => {
                console.log('edit');
              },
            },
            {
              title: '',
              text: 'Reset password',
              icon: 'fa-lock',
              iconColor: null,
              action: () => {
                console.log('reset');
              },
            },
            {
              title: '',
              text: 'Vô hiệu hóa',
              icon: 'fa-power-off',
              iconColor: null,
              action: () => {
                this.onDeactivateEmployee(i);
                console.log('deactivate');
              },
            },
          ]);

          return this.employeesService.parseDtoToModel(e);
        })
      );
    });

    this.employeesService.reloadEmployeePage.subscribe((data) => {
      this.ngOnInit();
    });
  }

  onCreateEmployee() {
    const dialogRef = this.dialog.open(CreateEmployeeDialogComponent);
  }

  onDeactivateEmployee(i: number) {}
}
