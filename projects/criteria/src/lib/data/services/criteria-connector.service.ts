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
    const url = 'criteria';
    return this.backendService.connect(url, Method.GET);
  }

  create(criteriaDto: CriteriaDto): Observable<any> {
    const url = 'criteria';
    return this.backendService.connect(url, Method.POST, criteriaDto);
  }

  update(criteriaId: string, criteriaDto: CriteriaDto): Observable<any> {
    const url = 'criteria/' + criteriaId;
    return this.backendService.connect(url, Method.PUT, criteriaDto);
  }

  delete(criteriaId: string): Observable<any> {
    const url = 'criteria/' + criteriaId;
    return this.backendService.connect(url, Method.DELETE);
  }
}
