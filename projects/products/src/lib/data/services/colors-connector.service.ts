import { Injectable } from '@angular/core';
import { BackendService, Method } from 'core';
import { Observable } from 'rxjs';
import { ColorDto } from '../dtos/color-dto';

@Injectable()
export class ColorsConnectorService {
  private serviceName = '';

  constructor(private backendService: BackendService) {}

  setApiUrl(url: string) {
    this.backendService.apiUrl = url;
  }

  fetch(): Observable<ColorDto[]> {
    const url = 'colors';
    return this.backendService.connect(url, Method.GET);
  }

  create(colorDto: ColorDto): Observable<any> {
    const url = 'colors';
    return this.backendService.connect(url, Method.POST, colorDto);
  }

  update(colorId: string, colorDto: ColorDto): Observable<any> {
    const url = 'colors/' + colorId;
    return this.backendService.connect(url, Method.PUT, colorDto);
  }

  delete(colorId: string): Observable<any> {
    const url = 'colors/' + colorId;
    return this.backendService.connect(url, Method.DELETE);
  }
}
