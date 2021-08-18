import { Component, OnInit } from '@angular/core';
import { ApiService } from "src/app/service/api.service";
import { NgxUiLoaderService } from "ngx-ui-loader";
@Component({
  selector: 'app-sub-cat-list',
  templateUrl: './sub-cat-list.component.html',
  styleUrls: ['./sub-cat-list.component.css']
})
export class SubCatListComponent implements OnInit {

  constructor(private _api:ApiService, private _loader:NgxUiLoaderService) { 
    this._loader.startLoader('loader');
  }
  public subCategoryList: any = [];

  ngOnInit(): void {
    this.getSubcategorylist();
  }

  getSubcategorylist() {
    this._loader.startLoader('loader');
    this._api.subCategoryist().subscribe(
      res => {
        // console.log(res);
        this.subCategoryList = res;
        this._loader.stopLoader('loader');
        $(document).ready(function() {
          setTimeout(function(){ $('.table').DataTable(); }, 1500);
        });
      },err => {} 
    )
  }

  deleteSubCategory(SubCategoryId) {
    if (confirm('Are you sure?')) {
      this._loader.startLoader('loader');
      this._api.subCategoryDelete(SubCategoryId).subscribe(
          res => {
            this.getSubcategorylist();
            this._loader.stopLoader('loader');
          },err => {}
      )
    }
  }

  toggleStatus(SubCategoryId, status) {
    this._loader.startLoader('loader');
    this._api.subCategoryToggleStatus(SubCategoryId, status).subscribe(
        res => {
          this.getSubcategorylist();
          this._loader.stopLoader('loader');
        },err => {}
    )
  }

}
