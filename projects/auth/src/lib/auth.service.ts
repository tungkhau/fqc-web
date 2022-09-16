import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user = new BehaviorSubject<{
    id: string;
    name: string;
    role: string;
    permissions: any;
  } | null>({
    id: 'BE2001',
    name: 'Nguyễn Văn Tèo',
    role: 'staff',
    permissions: { viewProducts: true, viewCustomers: true },
  });

  constructor() {}

  isAuthenticated() {
    return !this.user;
  }

  login() {
    this.user.next({
      id: 'BE2001',
      name: 'Nguyễn Văn Tèo',
      role: 'staff',
      permissions: { viewProducts: true, viewCustomers: true },
    });
  }
}
