import { Injectable } from '@angular/core';
import { BackendService, Method } from 'core';
import { Observable } from 'rxjs';
import { EmployeeDto } from '../dtos/employee-dto';

@Injectable()
export class EmployeesConnectorService {
  private serviceName = 'employee';

  constructor(private backendService: BackendService) {}

  setApiUrl(url: string) {
    this.backendService.apiUrl = url;
  }

  fetch(): Observable<EmployeeDto[]> {
    const url = this.serviceName + '/employees';
    return this.backendService.connect(url, Method.GET);
  }

  create(employeeDto: EmployeeDto): Observable<any> {
    const url = this.serviceName + '/employees';
    return this.backendService.connect(url, Method.POST, employeeDto);
  }

  update(employeeId: string): Observable<any> {
    const url = this.serviceName + '/employees/' + employeeId;
    return this.backendService.connect(url, Method.PUT);
  }

  delete(employeeId: string): Observable<any> {
    const url = this.serviceName + '/employees/' + employeeId;
    return this.backendService.connect(url, Method.DELETE);
  }
}
