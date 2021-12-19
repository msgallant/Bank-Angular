import { Component, OnInit } from '@angular/core';
import { Transaction } from 'src/app/interfaces/Transaction';
import { AccountService } from 'src/app/services/account.service';


@Component({
  selector: 'app-transaction-history-page',
  templateUrl: './transaction-history-page.component.html',
  styleUrls: ['./transaction-history-page.component.css']
})
export class TransactionHistoryPageComponent implements OnInit {
  allTransactions: Transaction[] = this.accountService.getLoggedInAcc().transactions;
  transactions: Transaction[] = [];
  
  constructor(private accountService:AccountService) { }

  ngOnInit(): void {
    this.getPast20Transactions();
  }
  getPast20Transactions()
  {
    const length = this.allTransactions.length;
    if (length > 20)
    {
      const startIndex = length - 20;
      let num = 0;
      for (let i = startIndex; i < length; i++)
      {
        this.transactions[num] = this.allTransactions[i];
        num++;
      }
    }
    else
    {
      this.transactions = this.allTransactions;
    }
  }
  
}
