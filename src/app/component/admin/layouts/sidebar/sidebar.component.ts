import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  @ViewChild('sideBar') sideBar : ElementRef
  public isHidden: boolean = false
  constructor(private _api:ApiService) { }

  ngOnInit(): void {
  }
  logoutAdmin() {
    this._api.logoutUser();
  }
  hideSidebar() {
    this.sideBar.nativeElement.classList.remove('active')
  }
}
