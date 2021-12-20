import { Component, OnInit } from '@angular/core';
import { ApiService } from "src/app/service/api.service";
import { NgxUiLoaderService } from "ngx-ui-loader";
import { Router } from "@angular/router";
import Swal from "sweetalert2";
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
  selectedRowIds: Set<any> = new Set<any>();

  ngOnInit(): void {
    this.getCustomerList();
  }
  public tableDesign : any;
  getCustomerList() {
    this._loader.startLoader('loader');
    this._api.customerList().subscribe(
      res => {
        this.customerList = res.filter((e) => e.email !== 'admin@wevouch.app' || e.mobile != 9876543210);
        this._loader.stopLoader('loader');
        $(document).ready(function() {
          setTimeout(function(){
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

  reload() {
    location.reload();
  }

  deleteCustomer(customerId) {
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
        this._api.customerDelete(customerId).subscribe(
            res => {
              Swal.fire(
                'Deleted!',
                'Customer has been deleted.',
                'success'
              )
              this.reload();
              this._loader.stopLoader('loader');
            },err => {
              Swal.fire(
                'Failed!',
                'Customer has not been deleted.',
                'error'
              )
              this._loader.stopLoader('loader');
            }
        )
      }
    })
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
    return this.customerList.filter((x:any) => this.selectedRowIds.has(x._id));
  }

  selectMultiple() {

    if(this.selectedRowIds.size === this.customerList.length) {
      this.selectedRowIds.clear();
    } else {
      this._loader.startLoader('loader');
      this.selectedRowIds.clear();
      this.customerList.forEach((e:any) => {
        this.onRowClick(e._id);
      });
      this._loader.stopLoader('loader');
    }
    
  }

  deleteMultiple() {
    this._loader.startLoader('loader');
    const selectedCustomers = this.getSelectedRows();
    console.log('Selected Customers', selectedCustomers);
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
        selectedCustomers.forEach((e:any) => {
          this._api.customerDelete(e._id).subscribe()
        });
        Swal.fire({
          icon: 'success',
          text: `${selectedCustomers.length} customers deleted`,
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
