import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';

@Injectable()
export class PushNotificationsService {

  private url = 'http://localhost:3000';  
  private socket;

  public connection;

  constructor() { }

  addTicket(ticketInfo){
    this.socket.emit('add-ticket', ticketInfo);    
  }

  updateTicket(ticketInfo){
    this.socket.emit('update-ticket', ticketInfo);    
  }

  deleteTicket(ticketInfo){
    this.socket.emit('delete-ticket', ticketInfo);    
  }
  
  createPushNotif() {
    let observable = new Observable(observer => {
      this.socket = io(this.url);
      this.socket.on('ticketAdd', (data) => {
        observer.next(data);    
      });
      this.socket.on('ticketUpdate', (data) => {
        observer.next(data);    
      });
      this.socket.on('ticketDelete', (data) => {
        observer.next(data);    
      });
      return () => {
        this.socket.disconnect();
      };  
    })     
    return observable;
  }  

}
