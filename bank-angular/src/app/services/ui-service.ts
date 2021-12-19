import { Injectable } from '@angular/core';
import {Observable, of, Subject} from 'rxjs';
import { localStorageError } from '../interfaces/LocalStorageError';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class UiService {

  private transactionInProgress: boolean = false;
  private subject = new Subject<any>();
  constructor(private storageService: StorageService) {
    const errorMsg = '{"error":"No such object exists in local storage"}'
    if (!(storageService.getTransactionInProgress() as localStorageError).error)
    {
      console.log("stringify: " + JSON.stringify(storageService.getTransactionInProgress()));
      const b: boolean = storageService.getTransactionInProgress();
      this.transactionInProgress = b;
      console.log("found in storage, b is: " + b);
      this.setTransactionInProgress(b);
    }
    console.log("transaction in progress? " + this.transactionInProgress);
  }

  setTransactionInProgress(inProgress: boolean)
  {
    console.log("setting transact in prog to: " + inProgress);
    this.transactionInProgress = inProgress;
    this.subject.next(this.transactionInProgress);
    this.storageService.storeTransactionInProgress(this.transactionInProgress);
  }
  getTransactionInProgressObserver(): Observable<any>
  {
    //const obs = of(this.transactionInProgress); 
    //return obs;
    return this.subject.asObservable();
  }
  getTransactionInProgress(): boolean
  {
    console.log("UI service sending progress as: " + this.transactionInProgress);
    return this.transactionInProgress;
  }
}
