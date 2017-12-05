import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { PushNotificationsService } from 'ng-push';
import { PushNotificationsService as NodePushService } from '../_services/push-notifications.service';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class TicketsComponent implements OnInit {

  connection
  ticketInfo 

  constructor(private nodePush: NodePushService, private _pushNotifications: PushNotificationsService) { }

  ngOnInit() {
    this._pushNotifications.requestPermission()
    this.connection = this.nodePush.createPushNotif().subscribe(ticketInfo => {
      this.ticketInfo = ticketInfo
      this.pushNotif()
    })

  }
  
  ngOnDestroy() {
    this.connection.unsubscribe();

  }

  pushNotif() {
    if(this.ticketInfo.data){
      this._pushNotifications.create(this.ticketInfo.data.number, {body: 'Developer: ' + this.ticketInfo.data.dev}).subscribe(
        res => console.log(res),
        err => console.log(err)
      )
    }
  }

}
