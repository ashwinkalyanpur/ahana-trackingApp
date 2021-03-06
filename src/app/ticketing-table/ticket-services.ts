
import {Injectable, PipeTransform} from '@angular/core';

import {BehaviorSubject, Observable, of, Subject} from 'rxjs';

import {Ticket} from './ticket-table';
import {TICKETLIST} from './ticket-list';
import {DecimalPipe} from '@angular/common';
import {debounceTime, delay, switchMap, tap} from 'rxjs/operators';
import {SortDirection} from '../sortable.directive';

interface SearchResult {
        ticketlists: Ticket[];
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

function sort(ticketlists: Ticket[], column: string, direction: string): Ticket[] {
  if (direction === '') {
    return ticketlists;
  } else {
    return [...ticketlists].sort((a, b) => {
      const res = compare(a[column], b[column]);
      return direction === 'asc' ? res : -res;
    });
  }
}

function matches(ticket: Ticket, term: string, pipe: PipeTransform) {
  return ticket.client.toLowerCase().includes(term.toLowerCase())
  || ticket.city.toLowerCase().includes(term.toLowerCase())
  || pipe.transform(ticket.ticketNumber).includes(term)
  || pipe.transform(ticket.id).includes(term);

}
@Injectable({providedIn: 'root'})
export class TicketListService {
  private _loading$ = new BehaviorSubject<boolean>(true);
  private _search$ = new Subject<void>();
  private _ticketlists$ = new BehaviorSubject<Ticket[]>([]);
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
      this._ticketlists$.next(result.ticketlists);
      this._total$.next(result.total);
    });

    this._search$.next();
  }

  get ticketlists$() { return this._ticketlists$.asObservable(); }
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
    let ticketlists = sort(TICKETLIST, sortColumn, sortDirection);

    // 2. filter
    ticketlists = ticketlists.filter(ticketlist => matches(ticketlist, searchTerm, this.pipe));
    const total = ticketlists.length;

    // 3. paginate
    ticketlists = ticketlists.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
    return of({ticketlists, total});
  }
}


