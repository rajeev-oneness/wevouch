import { Component, OnInit } from '@angular/core';
import { ApiService } from "src/app/service/api.service";
import { NgxUiLoaderService } from "ngx-ui-loader";

@Component({
  selector: 'app-support-list',
  templateUrl: './support-list.component.html',
  styleUrls: ['./support-list.component.css']
})
export class SupportListComponent implements OnInit {

  public supExes : any = {};
  
  constructor(private _api:ApiService, private _loader:NgxUiLoaderService) { 
    this._loader.startLoader('loader');
  }

  ngOnInit(): void {
    this.getSupExeList();
  }

  getSupExeList() {
    this.supExes = [];
    this._loader.startLoader('loader');
    this._api.supExeList().subscribe(
      res => {
        // console.log(res);
        this.supExes = res;
        this._loader.stopLoader('loader');
        $(document).ready(function() {
          setTimeout(function(){ $('.table').DataTable(); }, 1500);
        });
      },err => {} 
    )
  }

  supExeDelete(supExeId) {
    if (confirm('Are you sure?')) {
      this._loader.startLoader('loader');
      this._api.supExeDelete(supExeId).subscribe(
          res => {
            this.getSupExeList();
            this._loader.stopLoader('loader');
          },err => {}
      )
    }
  }

  toggleStatus(supExeId, status) {
    this._loader.startLoader('loader');
    this._api.supExeToggleStatus(supExeId, status).subscribe(
        res => {
          this.getSupExeList();
          this._loader.stopLoader('loader');
        },err => {}
    )
  }
}
