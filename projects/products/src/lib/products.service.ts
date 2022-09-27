import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { CustomerDto } from './data/dtos/customer-dto';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  customerList: CustomerDto[] = [];

  reloadSubject: Subject<boolean> = new Subject<boolean>();

  reload() {
    this.reloadSubject.next(true);
  }
}
