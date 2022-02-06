import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FilterService {
  private _localFilter = localStorage.getItem('framework-filter') || '';

  private _filterSource = new BehaviorSubject<string>(this._localFilter);
  public filter$ = this._filterSource.asObservable();

  constructor() {}

  setFilter(filter: string) {
    localStorage.setItem('framework-filter', filter);
    this._filterSource.next(filter);
  }
}
