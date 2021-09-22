import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Router } from '@angular/router';
import  Swal  from "sweetalert2";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private _api:ApiService,private _loader : NgxUiLoaderService,private _router:Router) {
    this._loader.startLoader('loader');
  }
  public errorMessage : any = '';
  public confirmPassword : any = '';
  public Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: false,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  });

  ngOnInit(): void {
    this._loader.stopLoader('loader');
  }

  changePassword(formData : any) {
    this.errorMessage = '';
    for( let i in formData.controls ){
      formData.controls[i].markAsTouched();
    }
    if (formData?.valid) {
      if (this.confirmPassword === formData.value.newPassword) {
        if (formData.value.password === formData.value.newPassword) {
          this.errorMessage = 'Old and new passwords cannot be same.';
        } else {
          this.errorMessage = '';
          this._loader.startLoader('loader');
          const toSendData = formData.value;
          toSendData.email = 'admin@wevouch.app';
          this._api.changePassword(toSendData).subscribe(
            res => {
              this._loader.stopLoader('loader');
              this.Toast.fire({
                icon: 'success',
                title: 'Password changed successfully!'
              })
            },
            err => {
              this.errorMessage = err.error.message;
              this._loader.stopLoader('loader');
            }
          );
        }
      }else {
        this.errorMessage = 'Password confirmation not matched';
      }
    } else {
      this.errorMessage = 'New and Current Password are required';
    }
  }

}
