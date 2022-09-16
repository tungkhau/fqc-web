import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { StaffDto } from './data/dtos/staff-dto';
import { Staff } from './data/models/staff.model';

@Injectable({
  providedIn: 'root',
})
export class StaffsService {
  reloadStaffPage: Subject<boolean> = new Subject<boolean>();

  reload() {
    this.reloadStaffPage.next(true);
  }

  // staffs: BehaviorSubject<Staff[]> = new BehaviorSubject<Staff[]>([]);

  // createStaff(e: Staff) {
  //   this.staffs.next([e].concat(this.staffs.getValue()));
  // }

  parseDtoToModel(e: StaffDto) {
    let roleName = 'Nhân viên khác';

    if (e.role === 'ADMIN') {
      roleName = 'Quản trị hệ thống';
    } else if (e.role === 'SPECIALIST') {
      roleName = 'Quản trị kiểm phẩm';
    } else if (e.role === 'STAFF') {
      roleName = 'Nhân viên kiểm phẩm';
    }

    let status = e.active ? 'Đang hoạt động' : 'Đã vô hiệu hóa';

    return new Staff(e.id, e.code, e.name, e.role, roleName, e.active, status);
  }

  parseModelToDto(e: Staff) {
    let roleName = 'Nhân viên khác';

    if (e.role === 'ADMIN') {
      roleName = 'Quản trị hệ thống';
    } else if (e.role === 'SPECIALIST') {
      roleName = 'Quản trị kiểm phẩm';
    } else if (e.role === 'STAFF') {
      roleName = 'Nhân viên kiểm phẩm';
    }

    let status = e.active ? 'Đang hoạt động' : 'Đã vô hiệu hóa';

    return new Staff(e.id, e.code, e.name, e.role, roleName, e.active, status);
  }

  constructor() {}
}
