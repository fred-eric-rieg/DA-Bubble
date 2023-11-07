import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './components/login/login/login.component';
import { MainpageComponent } from './components/dashboard/mainpage/mainpage.component';

import { authGuard } from './auth.guard';
import { PageNotFoundComponent } from './components/errors/page-not-found/page-not-found.component';
import { ChannelboxComponent } from './components/dashboard/channelbox/channelbox.component';
import { ContactboxComponent } from './components/dashboard/contactbox/contactbox/contactbox.component';
import { ThreadboxComponent } from './components/dashboard/threadbox/threadbox/threadbox.component';
import { ResetComponent } from './components/login/reset/reset/reset.component';
import { RegisterComponent } from './components/login/register/register/register.component';

const routes: Routes = [
  { path: '', redirectTo:'/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'reset', component: ResetComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: MainpageComponent, 
    children: [
    { path: 'channel/:id', component: ChannelboxComponent, canActivate: [authGuard] },
    { path: 'directmessage/:id', component: ChannelboxComponent, canActivate: [authGuard] },
    { path: 'threads', component: ThreadboxComponent, canActivate: [authGuard] },
    { path: 'contacts', component: ContactboxComponent, canActivate: [authGuard] }
  ], canActivate: [authGuard] },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
