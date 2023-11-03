import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './components/login/login/login.component';
import { MainpageComponent } from './components/dashboard/mainpage/mainpage.component';

import { authGuard } from './auth.guard';
import { PageNotFoundComponent } from './components/errors/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', redirectTo:'/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: MainpageComponent, canActivate: [authGuard] },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
