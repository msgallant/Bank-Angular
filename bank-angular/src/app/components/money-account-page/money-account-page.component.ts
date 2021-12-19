import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';
import { Account } from 'src/app/interfaces/Account';
import {Router} from '@angular/router';
import { UiService } from 'src/app/services/ui-service'; 
import {Subscription} from 'rxjs';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-money-account-page',
  templateUrl: './money-account-page.component.html',
  styleUrls: ['./money-account-page.component.css']
})
export class MoneyAccountPageComponent implements OnInit {
  @Output() onTransactionInProgress: EventEmitter<boolean> = new EventEmitter();
  @Input()
  showTransactionPage: boolean = false;
  @Input() 
  accountType!: string;// chequeings or savings
  transactionType!: string;//deposit or withdraw

  acc: Account = this.accountService.getLoggedInAcc();
  balance!: Number;
  subscription: Subscription;
  

  constructor(private accountService:AccountService,
    private router:Router, private uiService: UiService,
    private storageService: StorageService) 
    {
      //in case user refreshes page and the program loses information/state
      //main account page will have just stored it, so it
      //will never return a LocalStorageError interface

      //subscribe will give back the true or false value
      this.subscription = this.uiService
      .getTransactionInProgressObserver()
      .subscribe(
        (value) => (this.showTransactionPage = value));
        console.log("money acc show transact page: " + this.showTransactionPage);
    }

  ngOnInit(): void {
    this.showTransactionPage = this.uiService.getTransactionInProgress();
    this.accountType =this.storageService.getAccountType();
  }

  toggleDersiredMoneyAccount()
  {
    console.log("LOGIC: finding...");
    if (this.accountType === "Chequeings")
    {
      this.toggleChequeings();
    }
    else if (this.accountType === "Savings")
    {
      this.toggleSavings();
    }
  }
  toggleChequeings()
  {
    console.log("chequeings");
    this.balance = this.acc.chequeings;
  }
  toggleSavings()
  {
    console.log("savings");
    this.balance = this.acc.savings;
  }

  onDeposit()
  {
    this.displayTransactionOption("deposit");
  }

  onWithdraw()
  {
    this.displayTransactionOption("withdraw");
  }
  displayTransactionOption(transactionType: string)
  {
    this.storageService.storeTransactionType(transactionType);
    this.transactionType=transactionType;
    //tells main account page that transaction in progress
    //so if person clicks on close then it changes 
    //showTransactionPage to false
    //so the html in this component dispays
    //the right buttons
    this.onTransactionInProgress.emit(true);

  }
  goBackToMenu()
  {
    //tells main account page that transaction in progress
    //so if person clicks on close then it doesn't
    //display money account page.html anymore and displays
    //the other stuff in main account page.html
    this.onTransactionInProgress.emit(false);
  }

}
