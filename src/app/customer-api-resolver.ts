import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable()
export class CustomerAPIResolver implements Resolve<string> {
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): string | Observable<string> | Promise<string> {
    return 'http://192.168.1.7:8000';
  }
}
