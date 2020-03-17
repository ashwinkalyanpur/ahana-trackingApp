import {DecimalPipe} from '@angular/common';
import {Component, QueryList, ViewChildren} from '@angular/core';
import {Observable} from 'rxjs';

import {Ticket} from '../ticket-table';
import {TicketListService} from '../ticket-services';
import {NgbdSortableHeader, SortEvent} from '../sortable.directive';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-assign-ticket',
  templateUrl: './assign-ticket.component.html',
  styleUrls: ['./assign-ticket.component.css'],
  providers: [TicketListService, DecimalPipe, NgbModalConfig, NgbModal]
})
export class AssignTicketComponent  {
  modalContent ='';
  model = 1;
  ticketlists$: Observable<Ticket[]>;
  total$: Observable<number>;

  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;

  constructor(public service: TicketListService, config: NgbModalConfig, private modalService: NgbModal) {
    this.ticketlists$ = service.ticketlists$;
    this.total$ = service.total$;
    config.backdrop = 'static';
    config.keyboard = false;
  }

  onSort({column, direction}: SortEvent) {
    // resetting other headers
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    this.service.sortColumn = column;
    this.service.sortDirection = direction;
  }

  ngOnInit() {
  }
  open(content, country) {
    this.modalContent = country
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
  }

  getColor(country) { (2)
    switch (country) {
      case 'open':
        return 'green';
      case 'close':
        return 'blue';
      case 'resolved':
        return 'red';
    }
  }
}