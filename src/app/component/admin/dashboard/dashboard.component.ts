import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Router } from "@angular/router";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  // public dashboardData : {data : DASHBOARD[]};
  constructor(private _api:ApiService, private _loader:NgxUiLoaderService, private _router:Router) { 
    this._loader.startLoader('loader');
    // this.dashboardData = {data : []};
  }

  ngOnInit(): void {
    this.getpPackageList();
  }
  public dashboard :any = [];
  public issues :any = [];

  getpPackageList() {
    // this.dashboardData.data = [];
    this._loader.startLoader('loader');
    this._api.dashboardData().subscribe(
      res => {
        console.log(res);
        // this.dashboardData.data = res;
        this.dashboard = res;
        // console.log(this.dashboardData.data)
        // this.latestTickets = res.latestTickets;
        this._loader.stopLoader('loader');
        $(document).ready(function() {
          setTimeout(function(){ $('.table').DataTable(); }, 1500);
        });
      },err => {} 
    )
    
    this._api.ticketIssueList().subscribe(
      res => {
        console.log('ticket issue',res);
        if (res.error === false) {
          this.issues = res.data;
        }
        
        this._loader.stopLoader('loader');
        $(document).ready(function() {
          setTimeout(function(){ $('.table').DataTable(); }, 1500);
        });
      },err => {} 
    )
  }


  deleteTicket(ticketId) {
    if (confirm('Are you sure?')) {
      this._loader.startLoader('loader');
      this._api.ticketDelete(ticketId).subscribe(
          res => {
            this._router.navigate(['/admin/product/list']);
            this._loader.stopLoader('loader');
          },err => {}
      )
    }
  }
}

// interface DASHBOARD{
//   totalCustomers : number,
//   totalNewCustomers : number,
//   totalProducts : number,
//   totalNewProducts : number,
//   totalTickets : number,
//   totalNewTickets : number,
//   latestTickets : any,
// }