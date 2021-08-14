import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-ticket-detail',
  templateUrl: './ticket-detail.component.html',
  styleUrls: ['./ticket-detail.component.css']
})
export class TicketDetailComponent implements OnInit {

  constructor(private _loader : NgxUiLoaderService,private _api:ApiService,private _activated:ActivatedRoute) { 
    this._loader.startLoader('loader');
  }
  
  public ticketId : any = 0;
  public ticketDetail: any = {};
  public executiveList:any = {};
  public errorMessage:any = '';
  public errorMessage2:any = '';

  ngOnInit(): void {
    this.ticketId = this._activated.snapshot.paramMap.get('ticketId');
    this.getTicketDetails(this.ticketId);
    this.getExecutiveList();
  }

  getTicketDetails(ticketId) {
    this._loader.startLoader('loader');
    this._api.ticketDetail(ticketId).subscribe(
      res => {
        console.log(res);
        this.ticketDetail = res;
        this._loader.stopLoader('loader');
      }, err => {}
    )
  }

  getExecutiveList() {
    this._api.supExeList().subscribe(
      res => {
        this.executiveList = res;
      }, err => {}
    )
  }

  assignTicket(formData) {
    this.errorMessage = '';
    for( let i in formData.controls ){
      formData.controls[i].markAsTouched();
    }
    if( formData?.valid ){
      let mainForm = formData.value;
      mainForm.ticketId = this.ticketId;
      this._loader.startLoader('loader');
      this._api.assignTicketTo(mainForm).subscribe(
        res => {
          console.log(res);
          this.errorMessage = res.message;
          this._loader.stopLoader('loader');
          this.getTicketDetails(this.ticketId);
        },
        err => {
          this.errorMessage = "Something went wrong";
          this._loader.stopLoader('loader');
        }
        
      )
    }else{
      this.errorMessage = 'Please fill out all the details';
    }
  }

  updateTicketStatus(formData) {
    this.errorMessage2 = '';
    for( let i in formData.controls ){
      formData.controls[i].markAsTouched();
    }
    if(confirm('Are you sure?')) {
      if( formData?.valid ){
        let mainForm = formData.value;
        this._loader.startLoader('loader');
        this._api.updateTicketStatus(this.ticketId, mainForm).subscribe(
          res => {
            console.log(res);
            this.errorMessage = res.message;
            this._loader.stopLoader('loader');
            this.getTicketDetails(this.ticketId);
          },
          err => {
            this.errorMessage2 = "Something went wrong";
            this._loader.stopLoader('loader');
          }
          
        )
      }else{
        this.errorMessage2 = 'Please fill out all the details';
      }
    } else {
      this._loader.startLoader('loader');
      this.getTicketDetails(this.ticketId);
      this._loader.stopLoader('loader');
    }
  }

}
