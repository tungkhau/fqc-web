import { Injectable } from '@angular/core';
import { BackendService, Method } from 'core';
import { Observable } from 'rxjs';
import { MeasurementDto } from '../dtos/measurement-dto';

@Injectable()
export class MeasurementsConnectorService {
  private serviceName = '';

  constructor(private backendService: BackendService) {}

  setApiUrl(url: string) {
    this.backendService.apiUrl = url;
  }

  fetch(): Observable<MeasurementDto[]> {
    const url = 'measurements';
    return this.backendService.connect(url, Method.GET);
  }

  create(measurementDto: MeasurementDto): Observable<any> {
    const url = 'measurements';
    return this.backendService.connect(url, Method.POST, measurementDto);
  }

  update(
    measurementId: string,
    measurementDto: MeasurementDto
  ): Observable<any> {
    const url = 'measurements/' + measurementId;
    return this.backendService.connect(url, Method.PUT, measurementDto);
  }

  delete(measurementId: string): Observable<any> {
    const url = 'measurements/' + measurementId;
    return this.backendService.connect(url, Method.DELETE);
  }
}
