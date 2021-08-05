import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

var originalURL = environment.apiUrl;
var _apiUrl = originalURL;

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private header;

  constructor(private _http : HttpClient,private _router : Router) { 
    this.header = new HttpHeaders()
        // .set("Authorization", 'Bearer ')
        .set("Accept","application/json");
  }
  // How to send the data + Header Example is below
  // return this.http.post<any>(_apiUrl + 'update/user/profile',data,{headers: this.header});

  routeIntended(path : any = ''){
    localStorage.setItem('routeIntended',path);
  }

  // Storing the User Info Locally
  storeUserLocally(data){
    let routeIntended = localStorage.getItem('routeIntended');
    localStorage.clear();
    localStorage.setItem('accessToken', 'accessToken1234567890adminWeVouch');
    localStorage.setItem('userInfo',JSON.stringify(data.data));
    window.location.href = environment.dasboardPath;
    // this._router.navigate([(routeIntended) ? routeIntended : '/admin/dashboard']);
  }

  updateUserLocally(data){
    localStorage.removeItem('userInfo');
    localStorage.setItem('userInfo',JSON.stringify(data.data));
  }

  // Logging Out the Current User
  logoutUser():void{
    localStorage.clear();
    window.location.href = environment.projectPath;
  }

  // Checking the Authentication for User
  isAuthenticated(){
    return !!localStorage.getItem('accessToken');
  }

  getUserDetailsFromStorage(){
    let user = localStorage.getItem('userInfo');
    return JSON.parse(user);
  }

  adminLoginApi(formData){
    return this._http.post<any>(_apiUrl+'user/admin-login',formData);
  }

  dashboardData(){
    return this._http.get<any>(_apiUrl+'user/get-dashboard-data');
  }

  // customer Api
  customerList() {
    return this._http.get<any>(_apiUrl+'user/list');
  }
  customerCreate(formdata){
    return this._http.post<any>(_apiUrl + 'user/add',formdata);
  }
  customerDetail(customerId){
    return this._http.get<any>(_apiUrl+'user/get/'+customerId);
  }
  customerUpdate(formData,customerId){
    return this._http.patch<any>(_apiUrl+'user/update/'+customerId,formData);
  }
  customerDelete(customerId){
    return this._http.delete<any>(_apiUrl+'user/delete/'+customerId);
  }


  // ticket api
  ticketList() {
    return this._http.get<any>(_apiUrl+'ticket/list');
  }
  ticketDetail(ticketId) {
    return this._http.get<any>(_apiUrl+'ticket/get/'+ticketId);
  }
  ticketDelete(ticketId){
    return this._http.delete<any>(_apiUrl+'ticket/delete/'+ticketId);
  }

  //product api
  productList() {
    return this._http.get<any>(_apiUrl+'product/list');
  }
  productDetail(productId){
    return this._http.get<any>(_apiUrl+'product/get/'+productId);
  }
  productDelete(productId){
    return this._http.delete<any>(_apiUrl+'product/delete/'+productId);
  }
  productToggleStatus(productId, status) {
    return this._http.patch<any>(_apiUrl+'product/toggle-product-status/'+productId, status);
  }

  //category api
  categoryList() {
    return this._http.get<any>(_apiUrl+'category/list');
  }
  categoryCreate(formData) {
    return this._http.post<any>(_apiUrl+'category/add',formData);
  }
  categoryDetail(catId) {
    return this._http.get<any>(_apiUrl+'category/get/'+catId);
  }
  categoryUpdate(formData,catId) {
    return this._http.patch<any>(_apiUrl+'category/update/'+catId,formData);
  }
  categoryDelete(catId) {
    return this._http.delete<any>(_apiUrl+'category/delete/'+catId);
  }
  
  categoryToggleStatus(catId, status) {
    return this._http.patch<any>(_apiUrl+'category/toggle-category-status/'+catId, status);
  }
  //category api
  subCategoryist() {
    return this._http.get<any>(_apiUrl+'sub-category/list');
  }
  subCategoryCreate(formData) {
    return this._http.post<any>(_apiUrl+'sub-category/add',formData);
  }
  subCategoryDetail(subCatId) {
    return this._http.get<any>(_apiUrl+'sub-category/get/'+subCatId);
  }
  subCategoryUpdate(formData,subCatId) {
    return this._http.patch<any>(_apiUrl+'sub-category/update/'+subCatId,formData);
  }
  subCategoryDelete(subCatId) {
    return this._http.delete<any>(_apiUrl+'sub-category/delete/'+subCatId);
  }
  subCategoryToggleStatus(subCatId, formData) {
    return this._http.patch<any>(_apiUrl+'sub-category/toggle-sub-category-status/'+subCatId, formData);
  }
  subCategoryListByCategoryId(id) {
    return this._http.get<any>(_apiUrl+'sub-category/get-by-category/'+id);
  }

  // brand api
  brandList() {
    return this._http.get<any>(_apiUrl+'brand/list');
  }
  brandCreate(formData) {
    return this._http.post<any>(_apiUrl+'brand/add',formData);
  }
  brandDetail(brandId) {
    return this._http.get<any>(_apiUrl+'brand/get/'+brandId);
  }
  brandUpdate(formData,brandId) {
    return this._http.patch<any>(_apiUrl+'brand/update/'+brandId,formData);
  }
  brandDelete(brandId) {
    return this._http.delete<any>(_apiUrl+'brand/delete/'+brandId);
  }
  brandToggleStatus(brandId, formData) {
    return this._http.patch<any>(_apiUrl+'brand/toggle-brand-status/'+brandId, formData);
  }
  //Service Center api
  seviceCennterrCreate(formData) {
    return this._http.post<any>(_apiUrl+'service-center/add',formData);
  }
  serviceCenList() {
    return this._http.get<any>(_apiUrl+'service-center/list');
  }
  serviceCenDetail(serviceCenId) {
    return this._http.get<any>(_apiUrl+'service-center/get/'+serviceCenId);
  }
  serviceCenUpdate(formData,serviceCenId) {
    return this._http.patch<any>(_apiUrl+'service-center/update/'+serviceCenId,formData);
  }
  serviceCenterDelete(serviceCenId){
    return this._http.delete<any>(_apiUrl+'service-center/delete/'+serviceCenId);
  }
  serviceCenterToggleStatus(serviceCenId, status) {
    return this._http.patch<any>(_apiUrl+'service-center/toggle-srvc-center-status/'+serviceCenId, status);
  }

  // model management api
  modelList() {
    return this._http.get<any>(_apiUrl+'model-mgmt/list');
  }
  modelCreate(formData) {
    return this._http.post<any>(_apiUrl+'model-mgmt/add',formData);
  }
  modelDetail(modelId) {
    return this._http.get<any>(_apiUrl+'model-mgmt/get/'+modelId);
  }
  modelUpdate(formData,modelId) {
    return this._http.patch<any>(_apiUrl+'model-mgmt/update/'+modelId,formData);
  }
  modelDelete(modelId) {
    return this._http.delete<any>(_apiUrl+'model-mgmt/delete/'+modelId);
  }
  modelToggleStatus(modelId, status) {
    return this._http.patch<any>(_apiUrl+'model-mgmt/toggle-model-mgmt-status/'+modelId, status);
  }

  //package or, subscription api
  packageList() {
    return this._http.get<any>(_apiUrl+'sub/list');
  }
  packageCreate(formData) {
    return this._http.post<any>(_apiUrl+'sub/add', formData);
  }
  packageDetail(packageId) {
    return this._http.get<any>(_apiUrl+'sub/get/'+packageId);
  }
  packageUpdate(formData,packageId) {
    return this._http.patch<any>(_apiUrl+'sub/update/'+packageId,formData);
  }
  packageDelete(packageId) {
    return this._http.delete<any>(_apiUrl+'sub/delete/'+packageId);
  }

  //support executive api
  supExeList() {
    return this._http.get<any>(_apiUrl+'support-executive/list');
  }
  supExeCreate(formData) {
    return this._http.post<any>(_apiUrl+'support-executive/add', formData);
  }
  supExeDetail(supExeId) {
    return this._http.get<any>(_apiUrl+'support-executive/get/'+supExeId);
  }
  supExeUpdate(formData,supExeId) {
    return this._http.patch<any>(_apiUrl+'support-executive/update/'+supExeId,formData);
  }
  supExeDelete(supExeId) {
    return this._http.delete<any>(_apiUrl+'support-executive/delete/'+supExeId);
  }
  supExeToggleStatus(supExeId, status) {
    return this._http.patch<any>(_apiUrl+'support-executive/toggle-user-status/'+supExeId, status);
  }

  //notification api
  notificationList() {
    return this._http.get<any>(_apiUrl+'notification/list');
  }
  notificationDelete(notificationId){
    return this._http.delete<any>(_apiUrl+'notification/delete/'+notificationId);
  }

}
