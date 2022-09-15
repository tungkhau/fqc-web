import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'test';

  routes: {
    icon: string;
    text: string;
    path: string;
  }[] = [
    { icon: 'fa-box', path: 'products', text: 'MẶT HÀNG' },
    { icon: 'fa-user-tie', path: 'customers', text: 'KHÁCH HÀNG' },
    { icon: 'fa-star', path: 'standards', text: 'TIÊU CHUẨN' },
    { icon: 'fa-scroll', path: 'lots', text: 'LOT' },
    { icon: 'fa-users', path: 'employees', text: 'NHÂN VIÊN' },
    { icon: 'fa-clock-rotate-left', path: 'history', text: 'LỊCH SỬ' },
  ];
}
