import { Component, OnInit } from '@angular/core';
import { ApiService } from "src/app/service/api.service";
import { NgxUiLoaderService } from "ngx-ui-loader";
import { Router } from "@angular/router";
import Swal from "sweetalert2";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  constructor(private _api:ApiService, private _loader:NgxUiLoaderService, private _router:Router) { 
    this._loader.startLoader('loader');
  }

  public productList: any = [];
  selectedRowIds: Set<any> = new Set<any>();


  ngOnInit(): void {
    this._loader.startLoader('loader');
    this.getProductList();
  }

  getProductList() {
    this._api.productList().subscribe(
      res => {
        this.productList = res;
        this._loader.stopLoader('loader');
        $(document).ready(function() {
          setTimeout(function(){ $('.table').DataTable(); }, 1500);
        });
      }
    )
  }

  reload() {
    location.reload();
  }

  deleteProduct(productId) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#00c1cb',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this._loader.startLoader('loader');
        this._api.productDelete(productId).subscribe(
            res => {
              Swal.fire(
                'Deleted!',
                'Product has been deleted.',
                'success'
              )
              this.reload();
              this._loader.stopLoader('loader');
            },err => {
              Swal.fire(
                'Failed!',
                'Product has not been deleted.',
                'error'
              )
              this._loader.stopLoader('loader');
            }
        )
      }
    })
  }

  toggleStatus( productId,status) {
    this._loader.startLoader('loader');
    this._api.productToggleStatus(productId, status).subscribe(
        res => {
          this.getProductList();
          this._loader.stopLoader('loader');
        },err => {}
    )
  }

  onRowClick(id: number) {
    if(this.selectedRowIds.has(id)) {
     this.selectedRowIds.delete(id);
    }
    else {
      this.selectedRowIds.add(id);
    }
  }

  rowIsSelected(id: number) {
    return this.selectedRowIds.has(id);
  }

  getSelectedRows(){
    return this.productList.filter((x:any) => this.selectedRowIds.has(x._id));
  }

  selectMultiple() {

    if(this.selectedRowIds.size === this.productList.length) {
      this.selectedRowIds.clear();
    } else {
      this._loader.startLoader('loader');
      this.selectedRowIds.clear();
      this.productList.forEach((e:any) => {
        this.onRowClick(e._id);
      });
      this._loader.stopLoader('loader');
    }
    
  }

  deleteMultiple() {
    this._loader.startLoader('loader');
    const selectedItems = this.getSelectedRows();
    console.log('Selected productList', selectedItems);
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#00c1cb',
      confirmButtonText: 'Yes, delete selected!'
    }).then((result) => {
      if (result.isConfirmed) {
        this._loader.startLoader('loader');
        selectedItems.forEach((e:any) => {
          this._api.productDelete(e._id).subscribe()
        });
        Swal.fire({
          icon: 'success',
          text: `${selectedItems.length} products deleted`,
          confirmButtonColor: '#00c1cb',
          confirmButtonText: 'Refresh data!'
        }).then((result) => {
          if (result.isConfirmed) {
            this.reload();
            // this.selectedRowIds.clear();
          }
        })
        this._loader.stopLoader('loader');
      }
    })
    this._loader.stopLoader('loader');
  }
}
