import { Component, OnInit } from '@angular/core';
import { ApiService } from "src/app/service/api.service";
import { NgxUiLoaderService } from "ngx-ui-loader";
@Component({
  selector: 'app-product-report-list',
  templateUrl: './product-report-list.component.html',
  styleUrls: ['./product-report-list.component.css']
})
export class ProductReportListComponent implements OnInit {

  constructor(private _api:ApiService, private _loader:NgxUiLoaderService) { 
    this._loader.startLoader('loader');
  }

  public productList: any = [];

  ngOnInit(): void {
    this._loader.startLoader('loader');
    this._api.productList().subscribe(
      res => {
        // console.log(res);
        this.productList = res;
        this._loader.stopLoader('loader');
        $(document).ready(function() {
          setTimeout(function(){ $('.table').DataTable(); }, 1500);
        });
      }
    )
  }

}
