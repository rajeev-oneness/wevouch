import { Component, OnInit } from '@angular/core';
import { ApiService } from "src/app/service/api.service";
import { NgxUiLoaderService } from "ngx-ui-loader";

@Component({
  selector: 'app-subscription-list',
  templateUrl: './subscription-list.component.html',
  styleUrls: ['./subscription-list.component.css']
})
export class SubscriptionListComponent implements OnInit {

  constructor(private _api:ApiService, private _loader:NgxUiLoaderService) { }

  ngOnInit(): void {
    this.getSubscriptionListData();
  }

  public subscriptionList : any = [];
  getSubscriptionListData(){
    this._loader.startLoader('loader');
    this._api.getAllTransactionLog().subscribe(
      res => {
        this.subscriptionList = res;
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