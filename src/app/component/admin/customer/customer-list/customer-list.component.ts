import { Component, OnInit } from '@angular/core';
import { ApiService } from "src/app/service/api.service";
import { NgxUiLoaderService } from "ngx-ui-loader";
import { Router } from "@angular/router";
@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {

  constructor(private _api:ApiService, private _loader : NgxUiLoaderService, private _router:Router) {
    this._loader.startLoader('loader');
  }
  
  public customerList : any = [];
 

  ngOnInit(): void {
    this.getCustomerList();
  }
  public tableDesign : any;
  getCustomerList() {
    this._loader.startLoader('loader');
    this._api.customerList().subscribe(
      res => {
        this.customerList = res;
        this._loader.stopLoader('loader');
        $(document).ready(function() {
          setTimeout(function(){
            console.log('table Design',this.tableDesign);
            if(this.tableDesign != undefined || this.tableDesign != null){
              this.tableDesign = this.tableDesign.draw();
            }else{
              this.tableDesign = $('.table').DataTable();
            }
          }, 1500);
        });
      },err => {}
    )
  }

  deleteCustomer(customerId) {
    if (confirm('Are you sure?')) {
      this._loader.startLoader('loader');
      this._api.customerDelete(customerId).subscribe(
          res => {
            this.getCustomerList();
            this._loader.stopLoader('loader');
          },err => {}
      )
    }
  }
}
