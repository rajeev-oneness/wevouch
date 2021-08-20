import { Component, OnInit } from '@angular/core';
import { ApiService } from "src/app/service/api.service";
import { NgxUiLoaderService } from "ngx-ui-loader";

@Component({
  selector: 'app-ticket-report-list',
  templateUrl: './ticket-report-list.component.html',
  styleUrls: ['./ticket-report-list.component.css']
})
export class TicketReportListComponent implements OnInit {

  constructor(private _api:ApiService, private _loader:NgxUiLoaderService) { 
    this._loader.startLoader('loader');
  }
  public tickets: any = [];

  ngOnInit(): void {
    this.getTicketList();
  }

  getTicketList() {
    this._loader.startLoader('loader');
    this._api.ticketList().subscribe(
      res => {
        // console.log(res);
        this.tickets = res;
        this._loader.stopLoader('loader');
        $(document).ready(function() {
          setTimeout(function(){ $('.table').DataTable(); }, 1500);
        });
      },err => {
        this._loader.stopLoader('loader');
      } 
    )
  }
}
