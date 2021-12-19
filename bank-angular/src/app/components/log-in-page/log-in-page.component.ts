import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'
import { AccountService } from 'src/app/services/account.service';
import { Credentials } from 'src/app/interfaces/Credentials';
import { Account } from 'src/app/interfaces/Account';

@Component({
  selector: 'app-log-in-page',
  templateUrl: './log-in-page.component.html',
  styleUrls: ['./log-in-page.component.css']
})
export class LogInPageComponent implements OnInit {

  accounts: Account[] = [];
  constructor(private router:Router, 
    private accountService:AccountService) { }

  ngOnInit(): void {
    this.accountService.getAccounts().subscribe(
      (accounts) => this.accounts = accounts);
  }

  //this gets the account that's logged in right now
  getAccount(credentials: Credentials): Account
  {
      let acc: Account[] = [];
      if (credentials.cardNum)
      {
        acc = this.accounts
        .filter(a => 
          {
            return a.cardNum === credentials.cardNum
          }
         );
      }

      return acc[0];
  }

  authenticateCredentials(credentials: Credentials)
  {
    const acc: Account =  this.getAccount(credentials);
    //need to actualy authenticate credentials
    console.log("implement checking acc here in log-in-page");
    if (acc != null)
    {
      if (acc.pinNum == credentials.pinNum) //successful log in
      {
        this.accountService.setLoggedInAcc(acc);
        this.router.navigate(['/Main-Account-Page']);
      }
      else //wrong pin number
      {
        alert('Your pin number is incorrect');
      }
      
    }
    else
    {
      alert("This account doesn't exist");
    }

  }
}
