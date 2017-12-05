import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs/Rx';
import { DataSource } from '@angular/cdk/collections';
import { TicketsService } from '../_services/tickets.service';
import { MatSort } from '@angular/material';
import { PushNotificationsService as NodePushService } from '../_services/push-notifications.service';

@Component({
  selector: 'app-tickets-active',
  templateUrl: './tickets-active.component.html',
  styleUrls: ['./tickets-active.component.css']
})
export class TicketsActiveComponent implements OnInit {

  displayedColumns = ['number', 'status', 'deadline', 'category', 'dev', 'qa', 'priority', 'designer', 'files', 'notes' ];
  exampleDatabase: ExampleHttpDao | null;
  dataSource: ExampleDataSource | null;
  connection

  @ViewChild(MatSort) sort: MatSort;

  constructor(private ticketsService: TicketsService, private router: Router, private nodePush: NodePushService) {}

  ngOnInit() {
    this.exampleDatabase = new ExampleHttpDao(this.ticketsService);
    this.dataSource = new ExampleDataSource(this.exampleDatabase!, this.sort);
    this.connection = this.nodePush.createPushNotif().subscribe(data => {
      this.dataSource = new ExampleDataSource(this.exampleDatabase!, this.sort);
    })
  }

  editTicket(ticketID) {
    this.router.navigate(['/tickets/edit-ticket', { id: ticketID }]);
  }
}

export class ExampleHttpDao {
  constructor(private ticketsService: TicketsService) {}

  getTickets() {
    return this.ticketsService.getActiveTickets()
  }
}

export class ExampleDataSource extends DataSource<any> {

  constructor(private exampleDatabase: ExampleHttpDao, private sort: MatSort) {
    super();
  }

  connect(): Observable<any[]> {
    const displayDataChanges = [
      this.sort.sortChange
    ];

    return Observable.merge(...displayDataChanges)
      .startWith(null)
      .switchMap(() => {
        return this.exampleDatabase.getTickets()
      })
      .map(data => {
        if (!this.sort.active || this.sort.direction == '') { return data; }

        return data.sort((a, b) => {
          let propertyA: number|string|Date = '';
          let propertyB: number|string|Date = '';

          switch (this.sort.active) {
            case 'number': [propertyA, propertyB] = [a.number, b.number]; break;
            case 'status': [propertyA, propertyB] = [a.status, b.status]; break;
            case 'requestor': [propertyA, propertyB] = [a.requestor, b.requestor]; break;
            case 'dev': [propertyA, propertyB] = [a.dev, b.dev]; break;
            case 'qa': [propertyA, propertyB] = [a.qa, b.qa]; break;
            case 'priority': [propertyA, propertyB] = [a.priority, b.priority]; break;
            case 'designer': [propertyA, propertyB] = [a.designer, b.designer]; break;
            case 'deadline': [propertyA, propertyB] = [new Date(a.deadline), new Date(b.deadline)]; break;
          }

          let valueA = isNaN(+propertyA) ? propertyA : +propertyA;
          let valueB = isNaN(+propertyB) ? propertyB : +propertyB;

          return (valueA < valueB ? -1 : 1) * (this.sort.direction == 'asc' ? 1 : -1);
        });
      })
  }

  disconnect() {}

}
