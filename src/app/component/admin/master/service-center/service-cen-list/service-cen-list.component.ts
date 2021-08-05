import { Component, OnInit } from '@angular/core';
import { ApiService } from "src/app/service/api.service";
import { NgxUiLoaderService } from "ngx-ui-loader";

@Component({
  selector: 'app-service-cen-list',
  templateUrl: './service-cen-list.component.html',
  styleUrls: ['./service-cen-list.component.css']
})
export class ServiceCenListComponent implements OnInit {

  public serviceCens :any = '';
  constructor(private _api:ApiService, private _loader:NgxUiLoaderService) {
    this._loader.startLoader('loader');
   }

  ngOnInit(): void {
    this.getServiceCenList();
  }

  getServiceCenList(){
    this._loader.startLoader('loader');
    this._api.serviceCenList().subscribe(
      res => {
        console.log(res);
        this.serviceCens = res;
        this._loader.stopLoader('loader');
      },err => {} 
    )
  }

  deleteServiceCenter(ServiceCenterId) {
    if (confirm('Are you sure?')) {
      this._loader.startLoader('loader');
      this._api.serviceCenterDelete(ServiceCenterId).subscribe(
          res => {
            this.getServiceCenList();
            this._loader.stopLoader('loader');
          },err => {}
      )
    }
  }
  toggleStatus(ServiceCenterId, status) {
    this._loader.startLoader('loader');
    this._api.serviceCenterToggleStatus(ServiceCenterId, status).subscribe(
        res => {
          this.getServiceCenList();
          this._loader.stopLoader('loader');
        },err => {}
    )
  }

}
