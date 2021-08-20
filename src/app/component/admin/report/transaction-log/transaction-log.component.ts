import { Component, OnInit } from '@angular/core';
import { ApiService } from "src/app/service/api.service";
import { NgxUiLoaderService } from "ngx-ui-loader";

@Component({
  selector: 'app-transaction-log',
  templateUrl: './transaction-log.component.html',
  styleUrls: ['./transaction-log.component.css']
})
export class TransactionLogComponent implements OnInit {

  constructor(private _api:ApiService, private _loader:NgxUiLoaderService) { }

  ngOnInit(): void {
    this.getTransactionLogData();
  }

  public transactionLog : any = [];
  getTransactionLogData(){
    this._loader.startLoader('loader');
    this._api.getAllTransactionLog().subscribe(
      res => {
        this.transactionLog = res;
        $(document).ready(function() {
          setTimeout(function(){ $('.table').DataTable(); }, 1500);
        });
        console.log(res);
        this._loader.stopLoader('loader');
      },err => {
        this._loader.stopLoader('loader');
      }
    )
  }

}
