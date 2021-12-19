import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';
import {Router} from '@angular/router';
import { UiService } from 'src/app/services/ui-service'; 
import {Subscription} from 'rxjs';
import { StorageService } from 'src/app/services/storage.service';
import { localStorageError } from 'src/app/interfaces/LocalStorageError';

@Component({
  selector: 'app-main-account-page',
  templateUrl: './main-account-page.component.html',
  styleUrls: ['./main-account-page.component.css']
})
export class MainAccountPageComponent implements OnInit {
  balance!: Number;
  accName!: string;
  showMoneyAcc: boolean = false;
  showTransactionHistory: boolean = false;
  subscription: Subscription;

  //this is for the cose button if program is on transaction page
  //and they click it, it should bring them to moneyAccountPage
  //if they are on moneyAccountPage, it should bring them to this page
  transactionInProgress!: boolean;

  constructor(private accountService:AccountService,
    private router:Router, private uiService: UiService,
    private storageService: StorageService) 
    { 
      if (!(storageService.getShowMoneyAcc() as localStorageError).error)
      {
        const b: boolean = this.storageService.getShowMoneyAcc();
        this.showMoneyAcc = b;
        console.log("main acc show money b is: --" + b);
      }
      if (!(storageService.getShowTransactionHistory() as localStorageError).error)
      {
        const b: boolean = this.storageService.getShowTransactionHistory();
        this.showTransactionHistory = b;
      }
      console.log("main acc on init show money acc result: " + this.showMoneyAcc);
      console.log("MAIN acc getting trans in progress observer");
      //subscribe will give back the true or false value
      this.subscription = this.uiService
      .getTransactionInProgressObserver()
      .subscribe(
        (value) => (this.transactionInProgress = value));

        console.log("main acc trans in progress result: " + this.transactionInProgress);
    }

  ngOnInit(): void {
  }

  showChequeings()
  {
    this.showSpecificMoneyAccountPage("Chequeings");
  }
  showSavings()
  {
    this.showSpecificMoneyAccountPage("Savings");
  }
  showSpecificMoneyAccountPage(accType: string)
  {
    this.accName = accType;
    this.storageService.storeAccountType(accType);
    this.updateShowMoneyAcc(true);
  }

  showAccountTransactionHistory()
  {
    this.storageService.storeShowTransactionHistory(true);
    this.showTransactionHistory = true;
  }

  close()
  {
    if (this.showTransactionHistory == true)
    {
      this.storageService.storeShowTransactionHistory(false);
      this.showTransactionHistory = false;
    }
    else if (this.showMoneyAcc == true)
    {
      //this.router.navigate(['/Main-Account-Page']);
      //if they were trying to deposit/withdraw money from
      //an account and pressed the close button
      //then they should go back to the money account page
      //not this page (main account page) :
      if (!this.transactionInProgress)
      {
        this.updateShowMoneyAcc(false);
      }
      else
      {
        this.uiService.setTransactionInProgress(false);
      }
    }
    else //just on main screen, so when press the close button user logs out
    {
      this.router.navigate(['/Log-In']);
      this.storageService.clearLocalStorage();
    }
  }
  //the transactionInProgress in Uiervice will help the close button
  //ecide what to display next to the user if clicked
  //it helps since if they are in the middle of typing how much money
  //they want to deposit or withraw the close button goes back
  //to givin the menu options to deposit or withdraw or for that account
  //otherwise they are already on the menu options and when the close button
  //is pressed it guides them back to main account menu options which are
  //choosing to press either savings, chequeings or transaction history
  updateCloseButton(inProgress: boolean)
  {
    this.uiService.setTransactionInProgress(inProgress)
  }

  //show money account page or show base stuff for main acc page
  updateShowMoneyAcc(status: boolean)
  {
    this.showMoneyAcc = status;
    this.storageService.storeShowMoneyAcc(status);
  }

}
