import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { EmployeeDto } from '../../data/dtos/employee-dto';
import { EmployeesConnectorService } from '../../data/services/employee-connector.service';
import { EmployeesService } from '../../employees.service';

@Component({
  selector: 'app-create-employee-dialog',
  templateUrl: './create-employee-dialog.component.html',
  styleUrls: ['./create-employee-dialog.component.scss'],
})
export class CreateEmployeeDialogComponent implements OnInit {
  createEmployeeForm = this.fb.group({
    code: '',
    name: '',
    address: '',
    taxCode: '',
    phone: '',
  });

  constructor(
    private dialogRef: MatDialog,
    private fb: FormBuilder,
    private employeesConnectorService: EmployeesConnectorService,
    private employeesService: EmployeesService
  ) {}

  ngOnInit(): void {}

  onCloseDialog() {
    this.dialogRef.closeAll();
  }

  onCreateEmployee({ value }: { value: any }) {
    const submitEmployee: EmployeeDto = {
      ...value,
    };

    this.employeesConnectorService
      .create(submitEmployee)
      .subscribe((data: any) => {
        console.log(data);

        // this.employeesService.addEmployee(value);
        // this.employeesService.reload();
      });
  }
}
