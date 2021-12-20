import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-package-edit',
  templateUrl: './package-edit.component.html',
  styleUrls: ['./package-edit.component.css']
})
export class PackageEditComponent implements OnInit {

  constructor(private _loader : NgxUiLoaderService,private _api:ApiService,private _activated:ActivatedRoute,private _router: Router) { 
    this._loader.startLoader('loader');
  }
  
  public packageId : any = 0;
  public packageDetail: any = {};
  public errorMessage: any = '';
  ngOnInit(): void {
    this.packageId = this._activated.snapshot.paramMap.get('packageId');
    this.getPackageDetails(this.packageId);
  }

  getPackageDetails(packageId) {
    this._loader.startLoader('loader');
    this._api.packageDetail(packageId).subscribe(
      res => {
        console.log(res);
        this.packageDetail = res;
        this._loader.stopLoader('loader');
      }, err => {}
    )
  }

  packageFormSubmit(formData){
    console.log(this.packageId);
    console.log(formData);
    
    this.errorMessage = '';
    for( let i in formData.controls ){
      formData.controls[i].markAsTouched();
    }
    if( formData?.valid ){
      
      let mainForm = formData.form.value;
      mainForm.expiryDate = "2022/02/14";

      this._loader.startLoader('loader');
      this._api.packageUpdate(mainForm,this.packageId).subscribe(
        res => {
          console.log(res);
          this.errorMessage = res.message;
          this._loader.stopLoader('loader');
          this._router.navigate(['/admin/package/list']);
        },
        err => {
          console.log(err.message)
          this.errorMessage = err.message;
          this._loader.stopLoader('loader');
        }
        
      )
    }
    else{
      this.errorMessage = 'Please fill out all the details';
    }
    // console.log('Form Data SUbmitted');
  }

}
