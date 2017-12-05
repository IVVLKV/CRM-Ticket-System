import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { TicketsService } from '../_services/tickets.service';

@Component({
  selector: 'app-tickets-add',
  templateUrl: './tickets-add.component.html',
  styleUrls: ['./tickets-add.component.css']
})
export class TicketsAddComponent {

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
    files: new FormControl()
  });

  constructor(private tickets: TicketsService) { }

  addTicket() {
    this.tickets.addTicket(this.ticketForm.value)
  }
  
}
