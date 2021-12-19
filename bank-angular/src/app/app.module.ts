import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ButtonComponent } from './components/button/button.component';
import { LogInPageComponent } from './components/log-in-page/log-in-page.component';
import { AuthenticateCredentialsComponent } from './components/authenticate-credentials/authenticate-credentials.component';
import { SignUpPageComponent } from './components/sign-up-page/sign-up-page.component';
import { CreateCredentialsComponent } from './components/create-credentials/create-credentials.component';
import { MainAccountPageComponent } from './components/main-account-page/main-account-page.component';
import { TransactionHistoryPageComponent } from './components/transaction-history-page/transaction-history-page.component';
import { MoneyAccountPageComponent } from './components/money-account-page/money-account-page.component';
import { TransactionPageComponent } from './components/transaction-page/transaction-page.component';
import { TransactionItemComponent } from './components/transaction-item/transaction-item.component';
import { HeaderComponent } from './components/header/header.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    ButtonComponent,
    LogInPageComponent,
    AuthenticateCredentialsComponent,
    SignUpPageComponent,
    CreateCredentialsComponent,
    MainAccountPageComponent,
    TransactionHistoryPageComponent,
    MoneyAccountPageComponent,
    TransactionPageComponent,
    TransactionItemComponent,
    HeaderComponent,
    SideBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
