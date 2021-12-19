import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Credentials } from 'src/app/interfaces/Credentials';

@Component({
  selector: 'app-authenticate-credentials',
  templateUrl: './authenticate-credentials.component.html',
  styleUrls: ['./authenticate-credentials.component.css']
})
export class AuthenticateCredentialsComponent implements OnInit {

  @Output() onAuthenticateCredentials: EventEmitter<Credentials> = new EventEmitter();
  cardNum!: number;
  pinNum!: number;
  constructor() { }

  ngOnInit(): void {
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

    const userCredentials = {
      cardNum: this.cardNum,
      pinNum: this.pinNum
    }
    this.onAuthenticateCredentials.emit(userCredentials);

    
  }
}
