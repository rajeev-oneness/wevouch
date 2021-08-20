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
    this.fetData();
  }

  public data = {
    companyName : '',
    companyAddress : '',
    emailId : '',
    mobileNo : '',
    whatsappNo : '',
    _id : '',
    compnyAddress : '',
  }

  settingSubmit(formData){
    this.errorMessage = '';
    for( let i in formData.controls ){
      formData.controls[i].markAsTouched();
    }
    if( formData?.valid ){
      const mainForm = formData.form.value;
      this._loader.startLoader('loader');
      this._api.submitSettingData(this.data._id,mainForm).subscribe(
        res => {
          this._loader.stopLoader('loader');
          // this._router.navigate(['/admin/customer/list']);
        },
        err => {
          this.errorMessage = err.message;
          this._loader.stopLoader('loader');
        }
        
      )
    }else{
      this.errorMessage = 'Please fill out all the details';
    }
  }

  fetData(){
    this._api.fetchSettingApi().subscribe(
      res => {
        this.data = res[0];
        console.log(res);
      },err => {

      }
    )
  }

}
