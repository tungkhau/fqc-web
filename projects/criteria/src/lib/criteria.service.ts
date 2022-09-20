import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CriteriaService {
  constructor() {}

  reloadSubject: Subject<boolean> = new Subject<boolean>();

  reload() {
    this.reloadSubject.next(true);
  }
}
