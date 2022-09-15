import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user = new BehaviorSubject<{
    name: string | null;
    role: string | null;
    permissions: any;
  }>({ name: null, role: null, permissions: null });

  constructor() {}

  isAuthenticated() {
    return !this.user;
  }

  login() {
    this.user.next({
      name: 'Nguyễn Văn Tèo',
      role: 'employee',
      permissions: { viewProducts: true, viewCustomers: true },
    });
  }
}
