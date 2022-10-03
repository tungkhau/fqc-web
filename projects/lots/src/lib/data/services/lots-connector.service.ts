import { Injectable } from '@angular/core';
import { BackendService, Method } from 'core';
import { Observable } from 'rxjs';
import { LotDto } from '../dtos/lot-dto';

@Injectable()
export class LotsConnectorService {
  private serviceName = '';

  constructor(private backendService: BackendService) {}

  setApiUrl(url: string) {
    this.backendService.apiUrl = url;
  }

  fetch(): Observable<LotDto[]> {
    const url = 'lots';
    return this.backendService.connect(url, Method.GET);
  }

  create(lotDto: LotDto): Observable<any> {
    const url = 'lots';
    return this.backendService.connect(url, Method.POST, lotDto);
  }

  update(lotId: string, lotDto: LotDto): Observable<any> {
    const url = 'lots/' + lotId;
    return this.backendService.connect(url, Method.PUT, lotDto);
  }

  delete(lotId: string): Observable<any> {
    const url = 'lots/' + lotId;
    return this.backendService.connect(url, Method.DELETE);
  }
}
