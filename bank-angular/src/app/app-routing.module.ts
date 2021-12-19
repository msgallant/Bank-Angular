import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LogInPageComponent } from './components/log-in-page/log-in-page.component';
import { SignUpPageComponent } from './components/sign-up-page/sign-up-page.component';
import {MainAccountPageComponent} from './components/main-account-page/main-account-page.component'


const routes: Routes = [
  {path: 'Log-In', component: LogInPageComponent},
  {path: '',   redirectTo: '/Log-In', pathMatch: 'full' },
  {path: 'Register', component: SignUpPageComponent},
  {path: 'Main-Account-Page', component: MainAccountPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
