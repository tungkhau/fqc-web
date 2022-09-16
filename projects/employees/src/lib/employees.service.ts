import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { EmployeeDto } from './data/dtos/employee-dto';
import { Employee } from './data/models/emplyee.model';

@Injectable({
  providedIn: 'root',
})
export class EmployeesService {
  reloadEmployeePage: Subject<boolean> = new Subject<boolean>();

  reload() {
    this.reloadEmployeePage.next(true);
  }

  // employees: BehaviorSubject<Employee[]> = new BehaviorSubject<Employee[]>([]);

  // createEmployee(e: Employee) {
  //   this.employees.next([e].concat(this.employees.getValue()));
  // }

  parseDtoToModel(e: EmployeeDto) {
    let roleName = 'Nhân viên khác';

    if (e.role === 'ADMIN') {
      roleName = 'Quản trị hệ thống';
    } else if (e.role === 'SPECIALIST') {
      roleName = 'Quản trị kiểm phẩm';
    } else if (e.role === 'STAFF') {
      roleName = 'Nhân viên kiểm phẩm';
    }

    let status = e.active ? 'Đang hoạt động' : 'Đã vô hiệu hóa';

    return new Employee(
      e.id,
      e.code,
      e.name,
      e.role,
      roleName,
      e.active,
      status
    );
  }

  constructor() {}
}
