import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { NotificationsService } from '../_services/notifications.service';
import { PushNotificationsService as NodePushService }  from './push-notifications.service';

import { Ticket }  from '../_models/ticket';


@Injectable()
export class TicketsService {

  tickets = []
  ticketInfo
  connection;

  options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
  };

  constructor(private http: HttpClient, private notification: NotificationsService, private push: NodePushService, private router: Router) { }

  getActiveTickets() {
    return this.http.get<any[]>('http://localhost:3000/api/tickets?active=true')
  }
  getInactiveTickets() {
    return this.http.get<any[]>('http://localhost:3000/api/tickets?active=false')
  }

  addTicket(formValue) {
    this.http.post('http://localhost:3000/api/tickets/', formValue, this.options)
        .subscribe (data => {
            this.ticketInfo = data
            this.push.addTicket(this.ticketInfo);
            this.router.navigate(['/tickets']).then(() => {
                this.notification.notification('New ticket added successfuly', null)
            });
        },
        (err) => {
            console.log(err)
        })
  }

  getTicket(id) {
    return this.http.get('http://localhost:3000/api/tickets/' + id)
  }

  updateTicket(id, formValue) {
    this.http.put('http://localhost:3000/api/tickets/' + id, formValue, this.options)
      .subscribe (data => {
          this.ticketInfo = data
          this.push.updateTicket(this.ticketInfo);
          this.router.navigate(['/tickets']).then(() => {
              this.notification.notification('Ticket updated', null)
          });
      },
      (err) => {
          console.log(err)
      })
  }

  deleteTicket(id) {
    this.http.delete('http://localhost:3000/api/tickets/' + id)
      .subscribe (data => {
          this.ticketInfo = data
          this.push.deleteTicket(this.ticketInfo);
          this.router.navigate(['/tickets']).then(() => {
              this.notification.notification('Ticket deleted', null)
          });
      },
      (err) => {
          console.log(err)
      })
  }

}
