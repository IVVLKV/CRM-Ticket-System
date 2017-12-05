import { Component, OnInit, OnDestroy } from '@angular/core';
import { PushNotificationsService } from 'ng-push';
import { PushNotificationsService as NodePushService } from '../_services/push-notifications.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  connection
  ticketInfo 

  constructor(private nodePush: NodePushService, private _pushNotifications: PushNotificationsService) { }

  ngOnInit() {
    this._pushNotifications.requestPermission()
    this.connection = this.nodePush.createPushNotif().subscribe(ticketInfo => {
      this.ticketInfo = ticketInfo
      if(this.ticketInfo.data.active) {
        this.pushNotif()
      }
    })

  }
  
  ngOnDestroy() {
    this.connection.unsubscribe();

  }

  pushNotif() {
    this._pushNotifications.create(this.ticketInfo.data.number, {body: 'Developer: ' + this.ticketInfo.data.dev}).subscribe(
      res => console.log(res),
      err => console.log(err)
    )
  }

}
