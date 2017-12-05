import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Injectable()
export class NotificationsService {

  constructor(public snackBar: MatSnackBar) { }

  notification(msg, confirmation) {
    this.snackBar.open(msg, confirmation, {
        duration: 4500,
    });
  }

}
