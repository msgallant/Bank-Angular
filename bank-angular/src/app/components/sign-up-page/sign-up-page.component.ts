import { Component, OnInit} from '@angular/core';
import { Account } from 'src/app/interfaces/Account';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-sign-up-page',
  templateUrl: './sign-up-page.component.html',
  styleUrls: ['./sign-up-page.component.css']
})
export class SignUpPageComponent implements OnInit {
  accountList: Account[] = [];
  goToLogInPage: boolean = false; //set to true when player successfuly makes a new acc

  
  constructor(private accountService: AccountService ) { 
      
    }

  ngOnInit(): void {
    this.accountService.getAccounts().subscribe(
      (accountList) => (this.accountList = accountList));
  }

  createAccount(account: Account)
  {
    this.accountService
    .createAccount(account)
    .subscribe(
      (account) => 
      (this.accountList.push(account)));

      this.goToLogInPage = !this.goToLogInPage;

  }
 
}
