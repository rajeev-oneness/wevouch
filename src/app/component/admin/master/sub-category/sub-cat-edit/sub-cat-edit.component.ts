import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ApiService } from 'src/app/service/api.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-sub-cat-edit',
  templateUrl: './sub-cat-edit.component.html',
  styleUrls: ['./sub-cat-edit.component.css']
})
export class SubCatEditComponent implements OnInit {

  constructor(private _loader : NgxUiLoaderService,private _api:ApiService,private _activated:ActivatedRoute,private _router: Router) { 
    this._loader.startLoader('loader');
  }
  
  public subCategoryId : any = 0;
  public subCategoryDetail: any = '';
  public categoryData: any = '';
  public errorMessage: any = '';
  ngOnInit(): void {
    this.subCategoryId = this._activated.snapshot.paramMap.get('subCategoryId');
    this.getSubCategoryDetails(this.subCategoryId);
    this.getCategoryData();
  }

  getSubCategoryDetails(subCategoryId) {
    this._loader.startLoader('loader');
    this._api.subCategoryDetail(subCategoryId).subscribe(
      res => {
        console.log(res);
        this.subCategoryDetail = res;
        this._loader.stopLoader('loader');
      }, err => {}
    )
  }

  getCategoryData() {
    this._api.categoryList().subscribe(
      res => {
        console.log('categories',res);
        this.categoryData = res;
        this._loader.stopLoader('loader');
      },err => {} 
    )
  }

  subCategoryFormSubmit(formData){
    console.log(this.subCategoryId);
    console.log(formData);
    
    this.errorMessage = '';
    for( let i in formData.controls ){
      formData.controls[i].markAsTouched();
    }
    if( formData?.valid ){
      // console.log(this.subCategoryId);
      
      const mainForm = formData.form.value;
      this._loader.startLoader('loader');
      this._api.subCategoryUpdate(mainForm,this.subCategoryId).subscribe(
        res => {
          console.log(res);
          this.errorMessage = res.message;
          this._loader.stopLoader('loader');
          this._router.navigate(['/admin/master/sub-category/list']);
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
