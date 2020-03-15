
import {Injectable, PipeTransform} from '@angular/core';

import {BehaviorSubject, Observable, of, Subject} from 'rxjs';

import {Track} from './track';
import {TRACKLIST} from './track-list';
import {DecimalPipe} from '@angular/common';
import {debounceTime, delay, switchMap, tap} from 'rxjs/operators';
import {SortDirection} from '../sortable.directive';

interface SearchResult {
        tracklists: Track[];
        total: number;
      }

interface State {
  page: number;
  pageSize: number;
  searchTerm: string;
  sortColumn: string;
  sortDirection: SortDirection;
}

function compare(v1, v2) {
  return v1 < v2 ? -1 : v1 > v2 ? 1 : 0;
}

function sort(tracklists: Track[], column: string, direction: string): Track[] {
  if (direction === '') {
    return tracklists;
  } else {
    return [...tracklists].sort((a, b) => {
      const res = compare(a[column], b[column]);
      return direction === 'asc' ? res : -res;
    });
  }
}

function matches(track: Track, term: string, pipe: PipeTransform) {
  return track.client.toLowerCase().includes(term.toLowerCase())
  || track.country.toLowerCase().includes(term.toLowerCase())
  || track.state.toLowerCase().includes(term.toLowerCase())
  || track.city.toLowerCase().includes(term.toLowerCase())
  || track.address.toLowerCase().includes(term.toLowerCase())
  || pipe.transform(track.id).includes(term);
}
@Injectable({providedIn: 'root'})
export class TrackListService {
  private _loading$ = new BehaviorSubject<boolean>(true);
  private _search$ = new Subject<void>();
  private _tracklists$ = new BehaviorSubject<Track[]>([]);
  private _total$ = new BehaviorSubject<number>(0);

  private _state: State = {
    page: 1,
    pageSize: 10,
    searchTerm: '',
    sortColumn: '',
    sortDirection: ''
  };

  constructor(private pipe: DecimalPipe) {
    this._search$.pipe(
      tap(() => this._loading$.next(true)),
      debounceTime(200),
      switchMap(() => this._search()),
      delay(200),
      tap(() => this._loading$.next(false))
    ).subscribe(result => {
      this._tracklists$.next(result.tracklists);
      this._total$.next(result.total);
    });

    this._search$.next();
  }

  get tracklists$() { return this._tracklists$.asObservable(); }
  get total$() { return this._total$.asObservable(); }
  get loading$() { return this._loading$.asObservable(); }
  get page() { return this._state.page; }
  get pageSize() { return this._state.pageSize; }
  get searchTerm() { return this._state.searchTerm; }

  set page(page: number) { this._set({page}); }
  set pageSize(pageSize: number) { this._set({pageSize}); }
  set searchTerm(searchTerm: string) { this._set({searchTerm}); }
  set sortColumn(sortColumn: string) { this._set({sortColumn}); }
  set sortDirection(sortDirection: SortDirection) { this._set({sortDirection}); }

  private _set(patch: Partial<State>) {
    Object.assign(this._state, patch);
    this._search$.next();
  }

  private _search(): Observable<SearchResult> {
    const {sortColumn, sortDirection, pageSize, page, searchTerm} = this._state;

    // 1. sort
    let tracklists = sort(TRACKLIST, sortColumn, sortDirection);

    // 2. filter
    tracklists = tracklists.filter(tracklist => matches(tracklist, searchTerm, this.pipe));
    const total = tracklists.length;

    // 3. paginate
    tracklists = tracklists.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
    return of({tracklists, total});
  }
}


