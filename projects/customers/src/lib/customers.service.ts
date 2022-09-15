import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { CustomerDto } from './data/dtos/customer-dto';

@Injectable({
  providedIn: 'root',
})
export class CustomersService {
  customers: BehaviorSubject<CustomerDto[]> = new BehaviorSubject<
    CustomerDto[]
  >([]);

  editingCustomer: any;

  // addCustomer(newCustomer: CustomerDto) {
  //   this.customers.next([...this.customers.getValue(), newCustomer]);
  // }

  reloadSubject: Subject<boolean> = new Subject<boolean>();

  reload() {
    this.reloadSubject.next(true);
  }

  constructor() {}
}
