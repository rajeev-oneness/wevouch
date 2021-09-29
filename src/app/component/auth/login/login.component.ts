import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private _api:ApiService,private _loader : NgxUiLoaderService,private _router:Router) {
    this._loader.startLoader('loader');
  }
  public errorMessage = '';
  public forgetPass: boolean = false;
  ngOnInit(): void {
    if(this._api.isAuthenticated()){
      this._router.navigate(['/admin/dashboard']);
    }
    this._loader.stopLoader('loader');
  }

  userLoginSubmit(formData){
    this.errorMessage = '';
    for( let i in formData.controls ){
      formData.controls[i].markAsTouched();
    }
    if( formData?.valid ){
      console.log(formData.form.value);
      const mainForm = formData.form.value;
      this._loader.startLoader('loader');
      this._api.adminLoginApi(mainForm).subscribe(
        res => {
          this.errorMessage = res.message;
          // console.log(res);
          this._api.storeUserLocally(res);
          this._loader.stopLoader('loader');
        },
        err => {
          this.errorMessage = "something went wrong please check credentials and try after sometimes";
          this._loader.stopLoader('loader');
        }
        
      )
    }else{
      this.errorMessage = 'Please fill out all the details';
    }
    // console.log('Form Data SUbmitted');
  }

  forgotPassword() {
    this.errorMessage = '';
    this.forgetPass = !this.forgetPass;
  }

  forgetPasswordSubmit(formData: any) {
    this.errorMessage = '';
    for( let i in formData.controls ){
      formData.controls[i].markAsTouched();
    }
    if( formData?.valid ){
      console.log(formData.form.value);
      const mainForm = formData.form.value;
      this._loader.startLoader('loader');
      this._api.forgetPassword(mainForm).subscribe(
        res => {
          this.errorMessage = res.message;
          // console.log(res.user);
          this._api.storeUserLocally(res.user);
          this._loader.stopLoader('loader');
        },
        err => {
          this.errorMessage = "something went wrong please check credentials and try after sometimes";
          this._loader.stopLoader('loader');
        }
        
      )
    }else{
      this.errorMessage = 'Please fill out all the details';
    }
  }

}
