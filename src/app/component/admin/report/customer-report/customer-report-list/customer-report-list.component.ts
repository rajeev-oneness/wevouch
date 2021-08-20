import { Component, OnInit } from '@angular/core';
import { ApiService } from "src/app/service/api.service";
import { NgxUiLoaderService } from "ngx-ui-loader";

@Component({
  selector: 'app-customer-report-list',
  templateUrl: './customer-report-list.component.html',
  styleUrls: ['./customer-report-list.component.css']
})
export class CustomerReportListComponent implements OnInit {

  constructor(private _api:ApiService,private _loader : NgxUiLoaderService) {
    this._loader.startLoader('loader');
  }
  
  public customerList : any = [];

  ngOnInit(): void {
    this.getCustomerList();
  }
  getCustomerList() {
    this._loader.startLoader('loader');
    this._api.customerList().subscribe(
        res => {
          this.customerList = res;
          this._loader.stopLoader('loader');
          $(document).ready(function() {
            setTimeout(function(){
              let table = $('.table').DataTable( {
                lengthChange: false,
                // buttons: [ 'copy', 'excel', 'pdf']
              });
              // table.buttons().container().appendTo( '.table_wrapper .col-md-6:eq(0)' );
            }, 1500);
          });
        },err => {}
    )
  }

}
