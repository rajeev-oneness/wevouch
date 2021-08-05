import { Component, OnInit } from '@angular/core';
import { ApiService } from "src/app/service/api.service";
import { NgxUiLoaderService } from "ngx-ui-loader";

@Component({
  selector: 'app-send-notification',
  templateUrl: './send-notification.component.html',
  styleUrls: ['./send-notification.component.css']
})
export class SendNotificationComponent implements OnInit {

  constructor(private _api:ApiService, private _loader:NgxUiLoaderService) {
    this._loader.startLoader('loader');
   }

  public notificationList: any = [];
  ngOnInit(): void {
    this.getNotificationlist();
  }

  getNotificationlist(){
    this._loader.startLoader('loader');
    this._api.notificationList().subscribe(
      res => {
        console.log(res);
        this.notificationList = res;
        this._loader.stopLoader('loader');
      },err => {} 
    )
  }
  deleteNotification(notificationId) {
    if (confirm('Are you sure?')) {
      this._loader.startLoader('loader');
      this._api.notificationDelete(notificationId).subscribe(
          res => {
            this.getNotificationlist();
            this._loader.stopLoader('loader');
          },err => {}
      )
    }
  }
}
