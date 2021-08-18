import { Component, OnInit } from '@angular/core';
import { ApiService } from "src/app/service/api.service";
import { NgxUiLoaderService } from "ngx-ui-loader";
@Component({
  selector: 'app-package-list',
  templateUrl: './package-list.component.html',
  styleUrls: ['./package-list.component.css']
})
export class PackageListComponent implements OnInit {

  public packages : {data : PACKAGE[]};
  constructor(private _api:ApiService, private _loader:NgxUiLoaderService) { 
    this._loader.startLoader('loader');
    this.packages = {data : []};
  }

  ngOnInit(): void {
    this.getpPackageList();
  }

  getpPackageList() {
    this.packages.data = [];
    this._loader.startLoader('loader');
    this._api.packageList().subscribe(
      res => {
        // console.log(res);
        this.packages.data = res;
        this._loader.stopLoader('loader');
        $(document).ready(function() {
          setTimeout(function(){ $('.table').DataTable(); }, 1500);
        });
      },err => {} 
    )
  }

  packageDelete(packageId) {
    if (confirm('Are you sure?')) {
      this._loader.startLoader('loader');
      this._api.packageDelete(packageId).subscribe(
          res => {
            this.getpPackageList();
            this._loader.stopLoader('loader');
          },err => {}
      )
    }
  }
}

interface PACKAGE{
  name : string,
  amount : number,
}