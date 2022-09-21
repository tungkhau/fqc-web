import { Injectable } from '@angular/core';
import { BackendService, Method } from 'core';
import { Observable } from 'rxjs';
import { CriteriaDto } from '../dtos/criteria-dto';

@Injectable()
export class CriteriaConnectorService {
  private serviceName = '';

  constructor(private backendService: BackendService) {}

  setApiUrl(url: string) {
    this.backendService.apiUrl = url;
  }

  fetch(): Observable<CriteriaDto[]> {
    const url = 'criterials';
    return this.backendService.connect(url, Method.GET);
  }

  create(customerDto: CriteriaDto): Observable<any> {
    const url = 'criterials';
    return this.backendService.connect(url, Method.POST, customerDto);
  }

  update(customerId: string, customerDto: CriteriaDto): Observable<any> {
    const url = 'criterials/' + customerId;
    return this.backendService.connect(url, Method.PUT, customerDto);
  }

  delete(customerId: string): Observable<any> {
    const url = 'criterials/' + customerId;
    return this.backendService.connect(url, Method.DELETE);
  }
}
