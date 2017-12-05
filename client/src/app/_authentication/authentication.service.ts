import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/delay';
import { Router } from '@angular/router';
import { AuthCookieHandlerService } from './auth-cookie-handler.service';
import { NotificationsService } from '../_services/notifications.service';

@Injectable()
export class AuthenticationService {

  options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
  };

  constructor(private http: HttpClient, private router: Router, private authCookie: AuthCookieHandlerService, private notification: NotificationsService) { }
  
    login(formValue) {
        this.http.post('http://localhost:3000/auth/login', formValue, this.options)
            .delay(2000)
            .subscribe (data => {
                this.authCookie.setAuth(JSON.stringify(data));
                console.log('Success:' + JSON.stringify(data))
                this.router.navigate(['/tickets']).then(() => {
                    this.notification.notification('You are logged in', null)
                });
            },
            (err) => {
                console.log(err)
            })
    }

    logout() {
        this.authCookie.deleteAuth()
        //this.notification.notification('Logged out successfully', null)
    }

    register(registrationForm) {
      console.log(registrationForm)
        this.http.post('http://localhost:3000/auth/register', registrationForm)
        .subscribe (data => {
            console.log(data)
            this.router.navigate(['/login']).then(() => {
                this.notification.notification('Registration successfull', null)
            });
        },
        (err) => {
            console.log(err)
        })
    }

    getAuthorizationToken() {
        let userAuthDetails = JSON.parse(this.authCookie.getAuth())
        return userAuthDetails.token
    }

    getUsername(): string {
        let user = JSON.parse(this.authCookie.getAuth())
        if(user) {
            return user.user
        } else {
            return;
        }
    }

}
