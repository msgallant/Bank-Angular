import { Component, Input, Output, EventEmitter, OnInit, ComponentFactoryResolver } from '@angular/core';
import { Account } from 'src/app/interfaces/Account';
import { AccountService } from 'src/app/services/account.service';
import { DatePipe } from '@angular/common';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-transaction-page',
  templateUrl: './transaction-page.component.html',
  styleUrls: ['./transaction-page.component.css'],
  providers: [DatePipe]
})
export class TransactionPageComponent implements OnInit {
  @Output() onCompletedTransaction = new EventEmitter();
  @Input()
  transactionType!: string; //deposit or withdraw
  @Input() 
  accountType!: string;// chequeings or savings

  amount!: number; //amount of money to be deposited/withdrawn
  acc: Account = this.accountService.getLoggedInAcc();
  newBalance!: number;
  money!: number;

  constructor(private accountService:AccountService,
    private datePipe: DatePipe, private storageService: StorageService) { 
      //in case user refreshes the page
      
    }

  ngOnInit(): void {
      this.transactionType = this.storageService.getTrasactionType();
      this.accountType = this.storageService.getAccountType();
  }

  onSubmit()
  {
    if (!this.amount)
    {
      alert('No amount entered');
      return;
    }
    const success: Boolean = this.makeTransaction();
    if (!success)
    {
      alert('There is insufficient funds');
    }
    else //valid transaction was commited
    {
      this.recordTransaction();
      this.accountService.updateAcc(this.acc).subscribe(); //upate database
      this.storageService.storeLoggedInAcc(this.acc); //keep user logged in if refresh page
      this.onCompletedTransaction.emit();
    }
    
    
  }
  //records this transaction, so user can view it if
  //they click on transaction history button
  recordTransaction()
  {
    const theDate = new Date();
    const currentDate: string = this.datePipe
        .transform(theDate, 'yyyy-MM-dd') || "n/a";

    const transaction =
    {
      accountType: this.accountType,
      amount: this.money,
      newBalance: this.newBalance,
      date: currentDate
    }
    //let theTransaction: Transaction = transaction;
    this.acc.transactions.push(transaction);
    
     
  }
  makeTransaction(): Boolean
  {
    this.money = this.amount;
    if (this.transactionType == "withdraw")
    {//so it's negative if they're withdrawing
      this.money= this.amount*(-1);
    }
    return this.commitTransaction();
  }
  commitTransaction(): Boolean
  {
    if (this.accountType == "Savings")
    {
      this.newBalance= this.acc.savings + this.money;
      if (this.isValidTransaction(this.newBalance))
      {
        this.acc.savings = this.newBalance;
        return true;
      }
      
    }
    else if (this.accountType == "Chequeings")
    {
      this.newBalance = this.acc.chequeings + this.money;
      if (this.isValidTransaction(this.newBalance))
      {
        this.acc.chequeings = this.newBalance;
        return true;
      }
      
    }
    return false;
  }
  //making sure user not trying to withdraw more money than they have currently
  //in their account
  isValidTransaction(newAmount: number): boolean{
    if (newAmount > 0)
    {
      return true;
    }
    return false;
  }

  //this is so user can see how much account already has inside
  //of it when deciding how much to either deposit or withdraw
  getCurrentBalanceOfAcc(): number
  {
    if (this.accountType == "Savings")
    {
      return this.acc.savings;
    }
    else if (this.accountType == "Chequeings")
    {
      return this.acc.chequeings;
    }
    return -1;
  }

  
}
