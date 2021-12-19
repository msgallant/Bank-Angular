import { Transaction } from "./Transaction";

export interface Account{
    id: number;
    cardNum: number;
    pinNum: number;
    chequeings: number;
    savings: number;
    transactions: Array<Transaction>;

    
}
