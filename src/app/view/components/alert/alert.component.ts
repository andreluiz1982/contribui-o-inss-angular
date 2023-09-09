import { Component, OnInit } from '@angular/core';
import { ErrorService } from 'src/app/service/error.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {

  constructor(private errorService : ErrorService) { }

  msg = '';
  successMsg = '';
  ngOnInit(): void {
    this.errorService.msgEmitter.subscribe(r => {

      if(r){
        this.msg = r;
        setTimeout(()=> {
          this.msg = '';
        }, 8000);
      }
    })

    this.errorService.sucessMsgEmitter.subscribe(r => {

      if(r){
        this.successMsg = r;
        setTimeout(()=> {
          this.successMsg = '';
        }, 1500);
      }
    })
  }

}
