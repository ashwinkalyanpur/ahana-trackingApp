import {DecimalPipe} from '@angular/common';
import {Component, QueryList, ViewChildren} from '@angular/core';
import {Observable} from 'rxjs';

import {Ticket} from '../ticket-table';
import {TicketListService} from '../ticket-services';
import {NgbdSortableHeader, SortEvent} from '../sortable.directive';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-view-ticket',
  templateUrl: './view-ticket.component.html',
  styleUrls: ['./view-ticket.component.css'],
  providers: [TicketListService, DecimalPipe, NgbModalConfig, NgbModal]
})
export class ViewTicketComponent  {
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
  open1(resolved, country) {
    this.modalContent = country
    this.modalService.open(resolved, {ariaLabelledBy: 'modal-basic-title'});
  }
  open2(open, country) {
    this.modalContent = country
    this.modalService.open(open, {ariaLabelledBy: 'modal-basic-title'});
  }

  // open(content, country) {
  //   this.modalContent = country
  //   this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
  // }

  // open(closed, open, resolved, country) {
  //   this.modalContent = country
  //   this.modalService.open(closed, {ariaLabelledBy: 'modal-basic-title'});
  //   this.modalService.open(open, {ariaLabelledBy: 'modal-basic-title'});
  //   this.modalService.open(resolved, {ariaLabelledBy: 'modal-basic-title'});
  // }

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
