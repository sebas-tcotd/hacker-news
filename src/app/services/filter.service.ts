import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

/** Service that provides functionalities to the components that perform the filtering by framework. */
@Injectable({
  providedIn: 'root',
})
export class FilterService {
  /** The filter stored in LocalStorage. */
  private _localFilter = localStorage.getItem('framework-filter') || '';

  /** Subject that emits the value of the filter in LocalStorage. */
  private _filterSource = new BehaviorSubject<string>(this._localFilter);

  /** Observer of the filter Subject. */
  public filter$ = this._filterSource.asObservable();

  constructor() {}

  /**
   * Saves the framework word in LocalStorage.
   * @param filter The framework word to be saved in LocalStorage.
   */
  saveFilter(filter: string): void {
    localStorage.setItem('framework-filter', filter);
    this._filterSource.next(filter);
  }
}
