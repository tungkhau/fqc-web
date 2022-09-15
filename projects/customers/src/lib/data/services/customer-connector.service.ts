import { Injectable } from '@angular/core';
import { BackendService, Method } from 'core';
import { Observable } from 'rxjs';
import { CustomerDto } from '../dtos/customer-dto';

@Injectable()
export class CustomersConnectorService {
  private serviceName = 'customer';

  constructor(private backendService: BackendService) {}

  setApiUrl(url: string) {
    this.backendService.apiUrl = url;
  }

  fetch(): Observable<CustomerDto[]> {
    const url = this.serviceName + '/customers';
    return this.backendService.connect(url, Method.GET);
  }

  create(customerDto: CustomerDto): Observable<any> {
    const url = this.serviceName + '/customers';
    return this.backendService.connect(url, Method.POST, customerDto);
  }

  update(customerId: string): Observable<any> {
    const url = this.serviceName + '/customers/' + customerId;
    return this.backendService.connect(url, Method.PUT);
  }

  delete(customerId: string): Observable<any> {
    const url = this.serviceName + '/customers/' + customerId;
    return this.backendService.connect(url, Method.DELETE);
  }
}
