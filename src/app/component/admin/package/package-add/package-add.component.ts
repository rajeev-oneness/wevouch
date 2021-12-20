import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Router } from '@angular/router';

@Component({
  selector: 'app-package-add',
  templateUrl: './package-add.component.html',
  styleUrls: ['./package-add.component.css']
})
export class PackageAddComponent implements OnInit {
  constructor(private _api:ApiService,private _loader : NgxUiLoaderService,private _router:Router) {
    this._loader.startLoader('loader');
   }
  public errorMessage = '';
  ngOnInit(): void {
    this._loader.stopLoader('loader');
  }

  packageFormSubmit(formData){
    this.errorMessage = '';
    for( let i in formData.controls ){
      formData.controls[i].markAsTouched();
    }
    if( formData?.valid ){
      let mainForm = formData.form.value;
      mainForm.expiryDate = "2022/02/14";
      this._loader.startLoader('loader');
      this._api.packageCreate(mainForm).subscribe(
        res => {
          console.log(res);
          this.errorMessage = res.message;
          this._loader.stopLoader('loader');
          this._router.navigate(['/admin/package/list']);
        },
        err => {
          this.errorMessage = "Something went wrong";
          this._loader.stopLoader('loader');
        }
        
      )
    }else{
      this.errorMessage = 'Please fill out all the details';
    }
    // console.log('Form Data SUbmitted');
  }

}
