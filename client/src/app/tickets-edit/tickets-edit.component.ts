import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { TicketsService } from '../_services/tickets.service';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-tickets-edit',
  templateUrl: './tickets-edit.component.html',
  styleUrls: ['./tickets-edit.component.css']
})
export class TicketsEditComponent implements OnInit {

  ticketId
  ticketData

  devs = [
    'Ivo',
    'Annie',
    'Rosti',
    'Shefa',
    'Angel',
    'Lewbaca'
  ];

  deadline = [

  ];

  ticketForm = new FormGroup ({
    link: new FormControl(),
    number: new FormControl(),
    status: new FormControl(),
    requestor: new FormControl(),
    dev: new FormControl(),
    qa: new FormControl(),
    priority: new FormControl(),
    designer: new FormControl(),
    deadline: new FormControl(),
    category: new FormControl(),
    notes: new FormControl(),
    files: new FormControl(),
    active: new FormControl()
  });

  constructor(private route: ActivatedRoute, private tickets: TicketsService, public dialog: MatDialog) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.ticketId = id
    this.tickets.getTicket(id)
      .subscribe(ticket => {
        this.ticketData = ticket

        this.ticketForm.setValue({
          link: this.ticketData.link,
          number: this.ticketData.number,
          status: this.ticketData.status,
          requestor: this.ticketData.requestor,
          dev: this.ticketData.dev,
          qa: this.ticketData.qa,
          priority: this.ticketData.priority,
          designer: this.ticketData.designer,
          active: this.ticketData.active,
          deadline: this.ticketData.deadline,
          files: this.ticketData.files,
          notes: this.ticketData.notes,
          category: this.ticketData.category,
        });
      });
  }

  updateTicket() {
    this.tickets.updateTicket(this.ticketId, this.ticketForm.value)
  }

  deleteTicket() {
    if(confirm("Are you sure to delete " + this.ticketData.number)) {
      this.tickets.deleteTicket(this.ticketId)
    }
  }

}
