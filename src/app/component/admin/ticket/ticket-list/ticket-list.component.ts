import { Component, OnInit } from '@angular/core';
import { ApiService } from "src/app/service/api.service";
import { NgxUiLoaderService } from "ngx-ui-loader";
import Swal from "sweetalert2";

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.css']
})
export class TicketListComponent implements OnInit {
  public tickets :any = [];
  selectedRowIds: Set<any> = new Set<any>();

  constructor(private _api:ApiService, private _loader:NgxUiLoaderService) { 
    this._loader.startLoader('loader');
  }

  ngOnInit(): void {
    this.getTicketList();
  }

  getTicketList() {
    // this.tickets.data = [];
    this._loader.startLoader('loader');
    this._api.ticketList().subscribe(
      res => {
        this.tickets = res.reverse();
        // console.log(this.tickets);
        this._loader.stopLoader('loader');
        $(document).ready(function() {
          setTimeout(function(){ $('.table').DataTable(); }, 1500);
        });
      },err => {} 
    )
  }

  reload() {
    location.reload();
  }

  deleteTicket(ticket) {
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
        this._api.ticketDelete(ticket._id).subscribe(
            res => {
              Swal.fire(
                'Deleted!',
                'Ticket has been deleted.',
                'success'
              )
              this.reload();
              this._loader.stopLoader('loader');
            },err => {
              Swal.fire(
                'Failed!',
                'Ticket has not been deleted.',
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
    return this.tickets.filter((x:any) => this.selectedRowIds.has(x._id));
  }

  selectMultiple() {

    if(this.selectedRowIds.size === this.tickets.length) {
      this.selectedRowIds.clear();
    } else {
      this._loader.startLoader('loader');
      this.selectedRowIds.clear();
      this.tickets.forEach((e:any) => {
        this.onRowClick(e._id);
      });
      this._loader.stopLoader('loader');
    }
    
  }

  deleteMultiple() {
    this._loader.startLoader('loader');
    const selectedItems = this.getSelectedRows();
    console.log('Selected tickets', selectedItems);
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
          this._api.ticketDelete(e._id).subscribe()
        });
        Swal.fire({
          icon: 'success',
          text: `${selectedItems.length} tickets deleted`,
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

