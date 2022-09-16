import { Injectable } from '@angular/core';
import { BackendService, Method } from 'core';
import { Observable } from 'rxjs';
import { StaffDto } from '../dtos/staff-dto';

@Injectable()
export class StaffsConnectorService {
  private serviceName = '';

  constructor(private backendService: BackendService) {}

  setApiUrl(url: string) {
    this.backendService.apiUrl = url;
  }

  fetch(): Observable<StaffDto[]> {
    const url = 'staffs';
    return this.backendService.connect(url, Method.GET);
  }

  create(staffDto: StaffDto): Observable<any> {
    const url = 'staffs';
    return this.backendService.connect(url, Method.POST, staffDto);
  }

  update(staffId: string, staffDto: StaffDto): Observable<any> {
    const url = 'staffs/' + staffId;
    return this.backendService.connect(url, Method.PUT, staffDto);
  }

  patch(staffId: string): Observable<any> {
    const url = 'staffs/' + staffId;
    return this.backendService.connect(url, Method.PATCH, {});
  }

  delete(staffId: string): Observable<any> {
    const url = 'staffs/' + staffId;
    return this.backendService.connect(url, Method.DELETE);
  }
}
