import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Router } from '@angular/router';
import Swal from "sweetalert2";

@Component({
  selector: 'app-version',
  templateUrl: './version.component.html',
  styleUrls: ['./version.component.css']
})
export class VersionComponent implements OnInit {

  constructor(private _api:ApiService,private _loader:NgxUiLoaderService,private _router:Router) { }

  public errorMessage = '';
  ngOnInit(): void {
    this.fetData();
  }

  public data : any = {}

  versionSubmit(formData){
    this.errorMessage = '';
    for( let i in formData.controls ){
      formData.controls[i].markAsTouched();
    }
    if( formData?.valid ){
      const mainForm = formData.form.value;
      this._loader.startLoader('loader');
      this._api.updateVersion(this.data._id, mainForm).subscribe(
        res => {
          Swal.fire(
            'Updated!',
            'Version has been updated.',
            'success'
          )
          this._loader.stopLoader('loader');
          // this._router.navigate(['/admin/customer/list']);
        },
        err => {
          Swal.fire(
            'Failed!',
            'Version has not been updated.',
            'error'
          )
          this.errorMessage = err.message;
          this._loader.stopLoader('loader');
        }
        
      )
    }else{
      this.errorMessage = 'Please fill out all the details';
    }
  }

  fetData(){
    this._loader.startLoader('loader');
    this._api.fetchVersion().subscribe(
      res => {
        this.data = res.data[0];
        console.log(res);
      },err => {}
    )
    this._loader.stopLoader('loader');

  }

}
