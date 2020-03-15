import {DecimalPipe} from '@angular/common';
import {Component, QueryList, ViewChildren} from '@angular/core';
import {Observable, from} from 'rxjs';
import { AdminTicket } from  './admin-ticket';
import { AdminListService } from './admin.services';
import {NgbdSortableHeader, SortEvent} from './sortable.directive';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import { ErrorMessage } from 'ng-bootstrap-form-validation';

@Component({
  selector: 'app-admin-approval',
  templateUrl: './admin-approval.component.html',
  styleUrls: ['./admin-approval.component.css'],
  providers: [AdminListService, DecimalPipe, NgbModalConfig, NgbModal]
})
export class AdminApprovalComponent {

  modalContent ='';
  modalContentdata='';
  model = 1;
  ticketlists$: Observable<AdminTicket[]>;
  total$: Observable<number>;
  formGroup: FormGroup; 

  customErrorMessages: ErrorMessage[] = [
    {
      error: 'required',
      format: (label, error) => `${label.toUpperCase()}  id is mandatory!`
    }, {
      error: 'pattern',
      format: (label, error) => `${label.toUpperCase()} to be validated`
    }
  ];


  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;

  constructor(public service: AdminListService, config: NgbModalConfig, private modalService: NgbModal) {
    this.ticketlists$ = service.ticketlists$;
    this.total$ = service.total$;
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
    this.formGroup = new FormGroup({
      Email: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)
      ]), 
      Description: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(200)
      ]),
      MNumber: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10),
        Validators.pattern( /[0-9\+\-\ ]/)
      ])
    });
  }
  openLg(approvalStatus, country) {
    this.modalContent = country
    // this.modalService.open(approvalStatus, {ariaLabelledBy: 'modal-basic-title'});
    this.modalService.open(approvalStatus, { size: 'lg' });
  }
  open(notApproved, country) {
    this.modalContentdata = country
    this.modalService.open(notApproved, {ariaLabelledBy: 'modal-basic-title'});
    // this.modalService.open(approvalStatus, { size: 'lg' });
  }

  onSubmit() {
    console.log(this.formGroup);
  }
  onReset() {
    this.formGroup.reset();
  }
}
