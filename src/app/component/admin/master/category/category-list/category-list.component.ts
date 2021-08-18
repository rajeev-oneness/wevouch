import { Component, OnInit } from '@angular/core';
import { ApiService } from "src/app/service/api.service";
import { NgxUiLoaderService } from "ngx-ui-loader";
@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

  constructor(private _api:ApiService, private _loader:NgxUiLoaderService) { 
    this._loader.startLoader('loader');
  }
  public categoryList: any = [];

  ngOnInit(): void {
    this.getCategoryList();
  }

  getCategoryList() {
    this._loader.startLoader('loader');
    this._api.categoryList().subscribe(
      res => {
        this.categoryList = res;
        this._loader.stopLoader('loader');
        $(document).ready(function() {
          setTimeout(function(){ $('.table').DataTable(); }, 1500);
        });
      },err => {} 
    )
  }

  deleteCategory(CategoryId) {
    if (confirm('Are you sure?')) {
      this._loader.startLoader('loader');
      this._api.categoryDelete(CategoryId).subscribe(
          res => {
            this.getCategoryList();
            this._loader.stopLoader('loader');
          },err => {}
      )
    }
  }
  toggleStatus(CategoryId, status) {
    this._loader.startLoader('loader');
    this._api.categoryToggleStatus(CategoryId, status).subscribe(
        res => {
          this.getCategoryList();
          this._loader.stopLoader('loader');
        },err => {}
    )
  }
}
