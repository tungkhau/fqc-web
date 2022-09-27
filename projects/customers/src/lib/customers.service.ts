import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { CustomerDto } from './data/dtos/customer-dto';
import { CustomersConnectorService } from './data/services/customer-connector.service';

@Injectable({
  providedIn: 'root',
})
export class CustomersService {
  reloadSubject: Subject<boolean> = new Subject<boolean>();

  reload() {
    this.reloadSubject.next(true);
  }
}
