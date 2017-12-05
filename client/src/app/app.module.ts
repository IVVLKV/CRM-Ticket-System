import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './_custom_modules/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AuthenticationModule } from './_authentication/authentication.module';
import { appRouting } from './app.routes';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './_guards/auth-guard.service';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptorService } from './_authentication/auth-interceptor.service';
import { HeaderComponent } from './header/header.component'

import { TicketsService } from './_services/tickets.service';
import { TicketsActiveComponent } from './tickets-active/tickets-active.component';
import { TicketsInactiveComponent } from './tickets-inactive/tickets-inactive.component';
import { TicketsAddComponent } from './tickets-add/tickets-add.component';
import { TicketsEditComponent } from './tickets-edit/tickets-edit.component';
import { NotificationsService } from './_services/notifications.service';
import { PushNotificationsModule } from 'ng-push';
import { PushNotificationsService } from './_services/push-notifications.service';
import { FormsModule } from '@angular/forms';
import { TestTableComponent } from './test-table/test-table.component';
import { TicketsComponent } from './tickets/tickets.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    TicketsActiveComponent,
    TicketsInactiveComponent,
    TicketsAddComponent,
    TicketsEditComponent,
    TestTableComponent,
    TicketsComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    BrowserAnimationsModule,
    AuthenticationModule,
    appRouting,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    PushNotificationsModule
  ],
  providers: [
    PushNotificationsService,
    NotificationsService,
    TicketsService,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
