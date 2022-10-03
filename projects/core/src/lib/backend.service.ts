import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable()
export class BackendService {
  public apiUrl = '';

  constructor(private http: HttpClient) {}

  connect(url: string, method: Method, params: any = []): Observable<any> {
    const endUrl = this.apiUrl + '/' + url;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
    });
    switch (method) {
      case Method.POST:
        return this.http.post(endUrl, JSON.stringify(params), {
          headers: headers,
        });
      case Method.PUT:
        return this.http.put(endUrl, JSON.stringify(params), {
          headers: headers,
        });
      case Method.PATCH:
        return this.http.patch(endUrl, JSON.stringify(params), {
          headers: headers,
        });
      case Method.DELETE:
        return this.http.delete(endUrl);
      default:
        return this.http.get(endUrl).pipe(map((r: any) => r.data));
    }
  }
}

export enum Method {
  GET,
  POST,
  PUT,
  PATCH,
  DELETE,
}
