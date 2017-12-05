import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './_guards/auth-guard.service';

import { LoginComponent } from './_authentication/login/login.component';
import { RegisterComponent } from './_authentication/register/register.component';
import { HomeComponent } from './home/home.component';
import { TicketsActiveComponent } from './tickets-active/tickets-active.component';
import { TicketsInactiveComponent } from './tickets-inactive/tickets-inactive.component';
import { TicketsAddComponent } from './tickets-add/tickets-add.component';
import { TicketsEditComponent } from './tickets-edit/tickets-edit.component';
import { TestTableComponent } from './test-table/test-table.component';
import { TicketsComponent } from './tickets/tickets.component';

const appRoutes: Routes = [
    { path: '', redirectTo: 'tickets', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'tickets', component: TicketsComponent, canActivate: [AuthGuard], children: [
        { path: '', redirectTo: 'active-tickets', pathMatch: 'full' },
        { path: 'active-tickets', component: TicketsActiveComponent },
        { path: 'inactive-tickets', component: TicketsInactiveComponent },
        { path: 'add-ticket', component: TicketsAddComponent },
        { path: 'edit-ticket', component: TicketsEditComponent },
        { path: 'test', component: TestTableComponent }
    ]}
]

export const appRouting = RouterModule.forRoot(appRoutes);
