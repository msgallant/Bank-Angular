import { Injectable } from '@angular/core';
import { Account } from '../interfaces/Account';
import { AccountService } from './account.service';

@Injectable({
  providedIn: 'root'
})
export class CardNumGeneratorService {

  accounts: Account[] = [];
  constructor(private accountService: AccountService ) {
   }
   ngOnInit(): void {
    this.accountService.getAccounts().subscribe(
      (accounts) => this.accounts = accounts);
  }
  generateUniqueCardNum(): number
  {
    let unique: boolean = false;
    let num: number = -1;
    while (!unique)
    {
      num = this.generateCardNum();
      unique = this.checkIfUniqueCardNum(num)

    }
    return num;
  }
  generateCardNum(): number
  {
    const max = 99999999;
    const min = 10000000;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  checkIfUniqueCardNum(num: number): boolean
  {
    if (this.accounts.some(a => a.cardNum === num))
    {
      //alreay exists, not unique
      return false;
    }
    return true;
  }
}
