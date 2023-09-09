import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  msgEmitter: EventEmitter<string> = new EventEmitter();

  sucessMsgEmitter : EventEmitter<string> = new EventEmitter();
  constructor() { }

  showError(msg : string){
    this.msgEmitter.emit(msg);
  }
  showSucess(msg : string){
    this.sucessMsgEmitter.emit(msg);

  }
}
