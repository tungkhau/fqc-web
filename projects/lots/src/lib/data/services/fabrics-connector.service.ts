import { Injectable } from '@angular/core';
import { BackendService, Method } from 'core';
import { Observable } from 'rxjs';
import { FabricDto } from '../dtos/fabric-dto';

@Injectable()
export class FabricsConnectorService {
  private serviceName = '';

  constructor(private backendService: BackendService) {}

  setApiUrl(url: string) {
    this.backendService.apiUrl = url;
  }

  fetch(): Observable<FabricDto[]> {
    const url = 'fabrics';
    return this.backendService.connect(url, Method.GET);
  }

  create(fabricDto: FabricDto): Observable<any> {
    const url = 'fabrics';
    return this.backendService.connect(url, Method.POST, fabricDto);
  }

  update(fabricId: string, fabricDto: FabricDto): Observable<any> {
    const url = 'fabrics/' + fabricId;
    return this.backendService.connect(url, Method.PUT, fabricDto);
  }

  delete(fabricId: string): Observable<any> {
    const url = 'fabrics/' + fabricId;
    return this.backendService.connect(url, Method.DELETE);
  }
}
