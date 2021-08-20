import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Router } from '@angular/router';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingComponent implements OnInit {

  constructor(private _api:ApiService,private _loader:NgxUiLoaderService,private _router:Router) { }

  public errorMessage = '';
  ngOnInit(): void {

  }

  settingSubmit(formData){
    
  }

}
