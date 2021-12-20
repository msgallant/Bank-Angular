import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import { StorageService } from './storage.service';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import { Account } from '../interfaces/Account';

const httpOptions= {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  }),
};

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private apiUrl = 'http://localhost:5000/Accounts';
  private loggedInAcc!: Account;

  constructor(private http:HttpClient, 
    private storageService: StorageService) {
      if ((storageService.getLoggedInAcc() as Account).cardNum)
      {
        this.loggedInAcc = storageService.getLoggedInAcc();
      }

   }

  getAccounts(): Observable<Account[]>
  {
    return this.http.get<Account[]>(this.apiUrl);
  }

  setLoggedInAcc(acc: Account)
  {
    this.storageService.storeLoggedInAcc(acc);
    this.loggedInAcc = acc;
  }
  getLoggedInAcc(): Account
  {
    return this.loggedInAcc;
  }

  createAccount(account: Account):Observable<Account>
  {
    return this.http.post<Account>(this.apiUrl, account,
      httpOptions);
  }

  updateAcc(acc: Account):Observable<Account>
  {
    const url = `${this.apiUrl}/${acc.id}`;
    return this.http.put<Account>(url, acc, httpOptions);
  }

}
