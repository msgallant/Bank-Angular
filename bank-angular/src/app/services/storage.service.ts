import { Injectable } from '@angular/core';
import { Account } from '../interfaces/Account';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private loggedInAccStorage : string = "loggedInAcc";
  private transactionInProgressStorage: string = "transactionInProgress";
  private showMoneyAccStorage: string = "showMoneyAcc";
  private showTransactionHistoryStorage: string = "showTransactionHistory";
  private transactionTypeStorage: string = "transactionType";
  private accountTypeStorage: string = "accountType";
  private localStorageErrorJSONstring: string;
  constructor() {
    const errorObj = {
      error: "No such object exists in local storage"
    }
    this.localStorageErrorJSONstring = JSON.stringify(errorObj);
   }

  store(storageName: string, data: any)
  {
    localStorage.setItem(storageName, JSON.stringify(data));
  }
  retrieve(storageName: string): any
  {
    let data = localStorage.getItem(storageName) || this.localStorageErrorJSONstring;
    return JSON.parse(data);
  }
  storeLoggedInAcc(data: Account)
  {
    this.store(this.loggedInAccStorage, data);
  }
  getLoggedInAcc(): any
  {
    return this.retrieve(this.loggedInAccStorage);
  }
  storeTransactionInProgress(data: boolean)
  {
    this.store(this.transactionInProgressStorage, data);
  }
  getTransactionInProgress(): any
  {
    return this.retrieve(this.transactionInProgressStorage);
  }
  storeShowMoneyAcc(data: boolean)
  {
    this.store(this.showMoneyAccStorage, data);
  }
  getShowMoneyAcc(): any
  {
    return this.retrieve(this.showMoneyAccStorage);
  }
  storeShowTransactionHistory(data: boolean)
  {
    this.store(this.showTransactionHistoryStorage, data);
  }
  getShowTransactionHistory(): any
  {
    return this.retrieve(this.showTransactionHistoryStorage);
  }
  storeTransactionType(data: string)
  {
    this.store(this.transactionTypeStorage, data);
  }
  getTrasactionType(): any
  {
    return this.retrieve(this.transactionTypeStorage);
  }
  storeAccountType(data: string)
  {
    this.store(this.accountTypeStorage, data);
  }
  getAccountType(): any
  {
    return this.retrieve(this.accountTypeStorage);
  }

  clearLocalStorage()
  {
    localStorage.clear();
  }
}
