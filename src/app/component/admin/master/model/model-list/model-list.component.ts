import { Component, OnInit } from '@angular/core';
import { ApiService } from "src/app/service/api.service";
import { NgxUiLoaderService } from "ngx-ui-loader";

@Component({
  selector: 'app-model-list',
  templateUrl: './model-list.component.html',
  styleUrls: ['./model-list.component.css']
})
export class ModelListComponent implements OnInit {

  constructor(private _api:ApiService, private _loader:NgxUiLoaderService) { 
    this._loader.startLoader('loader');
  }
  public modelList: any = [];

  ngOnInit(): void {
    this.getModellist();
  }

  getModellist() {
    this._loader.startLoader('loader');
    this._api.modelList().subscribe(
      res => {
        // console.log(res);
        this.modelList = res;
        this._loader.stopLoader('loader');
        $(document).ready(function() {
          setTimeout(function(){ $('.table').DataTable(); }, 1500);
        });
      },err => {} 
    )
  }

  deleteModel(ModelId) {
    if (confirm('Are you sure?')) {
      this._loader.startLoader('loader');
      this._api.modelDelete(ModelId).subscribe(
          res => {
            this.getModellist();
            this._loader.stopLoader('loader');
          },err => {}
      )
    }
  }

  toggleStatus(ModelId, status) {
    this._loader.startLoader('loader');
    this._api.modelToggleStatus(ModelId, status).subscribe(
        res => {
          this.getModellist();
          this._loader.stopLoader('loader');
        },err => {}
    )
  }

}
