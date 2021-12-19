import { Component, OnInit, Output, EventEmitter  } from '@angular/core';
import { Account } from 'src/app/interfaces/Account';
import { Transaction } from 'src/app/interfaces/Transaction';
import { CardNumGeneratorService } from 'src/app/services/card-num-generator.service';


@Component({
  selector: 'app-create-credentials',
  templateUrl: './create-credentials.component.html',
  styleUrls: ['./create-credentials.component.css']
})
export class CreateCredentialsComponent implements OnInit {

  @Output() onCreateCredentials: EventEmitter<Account> = new EventEmitter();
  cardNum!: number;
  pinNum!: number;
  confirmPinNum!: number;

  constructor(private cardNumGeneratorService: CardNumGeneratorService) { }

  ngOnInit(): void {
    this.cardNum = this.cardNumGeneratorService.generateUniqueCardNum();
  }

  onSubmit()
  {
    if (!this.cardNum)
    {
      alert('Please enter your card number');
      return;
    }
    if (!this.pinNum)
    {
      alert('Please enter your pin number');
      return;
    }
    if (!this.confirmPinNum)
    {
      alert('Please enter your pin number again');
      return;
    }
    if (this.pinNum != this.confirmPinNum)
    {
      alert("Your pin number doesn't match");
      return;
    }
    const transactionsList: Array<Transaction> = [];

    const newAccount = {
      id: this.cardNum,
      cardNum: this.cardNum,
      pinNum: this.pinNum,
      chequeings: 0,
      savings: 0,
      transactions: transactionsList
    }
    this.onCreateCredentials.emit(newAccount);
    
    

  }

  
}

