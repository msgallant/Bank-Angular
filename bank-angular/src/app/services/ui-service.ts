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
      const b: boolean = storageService.getTransactionInProgress();
      this.transactionInProgress = b;
      this.setTransactionInProgress(b);
    }
  }

  setTransactionInProgress(inProgress: boolean)
  {
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
    return this.transactionInProgress;
  }
}
