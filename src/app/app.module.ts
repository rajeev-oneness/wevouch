import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './component/admin/layouts/header/header.component';
import { FooterComponent } from './component/admin/layouts/footer/footer.component';
import { SidebarComponent } from './component/admin/layouts/sidebar/sidebar.component';
import { DashboardComponent } from './component/admin/dashboard/dashboard.component';
import { CustomerListComponent } from './component/admin/customer/customer-list/customer-list.component';
import { CustomerAddComponent } from './component/admin/customer/customer-add/customer-add.component';
import { TicketListComponent } from './component/admin/ticket/ticket-list/ticket-list.component';
import { CustomerDetailComponent } from './component/admin/customer/customer-detail/customer-detail.component';
import { TicketDetailComponent } from './component/admin/ticket/ticket-detail/ticket-detail.component';
import { ProductListComponent } from './component/admin/product/product-list/product-list.component';
import { ProductDetailComponent } from './component/admin/product/product-detail/product-detail.component';
import { CustomerReportListComponent } from './component/admin/report/customer-report/customer-report-list/customer-report-list.component';
import { CustomerReportDeatilComponent } from './component/admin/report/customer-report/customer-report-deatil/customer-report-deatil.component';
import { TicketReportListComponent } from './component/admin/report/ticket-report/ticket-report-list/ticket-report-list.component';
import { TicketReportDetailComponent } from './component/admin/report/ticket-report/ticket-report-detail/ticket-report-detail.component';
import { ProductReportListComponent } from './component/admin/report/product-report/product-report-list/product-report-list.component';
import { ProductReportDetailComponent } from './component/admin/report/product-report/product-report-detail/product-report-detail.component';
import { CategoryListComponent } from './component/admin/master/category/category-list/category-list.component';
import { CategoryAddComponent } from './component/admin/master/category/category-add/category-add.component';
import { BrandListComponent } from './component/admin/master/brand/brand-list/brand-list.component';
import { BrandAddComponent } from './component/admin/master/brand/brand-add/brand-add.component';
import { PackageListComponent } from './component/admin/package/package-list/package-list.component';
import { PackageAddComponent } from './component/admin/package/package-add/package-add.component';
import { SupportListComponent } from './component/admin/support/support-list/support-list.component';
import { SupportAddComponent } from './component/admin/support/support-add/support-add.component';
import { SupportEditComponent } from './component/admin/support/support-edit/support-edit.component';
import { SendNotificationComponent } from './component/admin/notification/send-notification/send-notification.component';
import { SendEmailComponent } from './component/admin/notification/send-email/send-email.component';
import { SendSmsComponent } from './component/admin/notification/send-sms/send-sms.component';
import { CustomerEditComponent } from './component/admin/customer/customer-edit/customer-edit.component';
import { CategoryEditComponent } from './component/admin/master/category/category-edit/category-edit.component';
import { BrandEditComponent } from './component/admin/master/brand/brand-edit/brand-edit.component';
import { PackageEditComponent } from './component/admin/package/package-edit/package-edit.component';
import { LoginComponent } from './component/auth/login/login.component';
import { RegistrationComponent } from './component/auth/registration/registration.component';
import { ForgetComponent } from './component/auth/password/forget/forget.component';
import { ChangeComponent } from './component/auth/password/change/change.component';
import { NgxUiLoaderModule } from "ngx-ui-loader";
import { CommonModule } from "@angular/common";
import { FormsModule , ReactiveFormsModule, FormControl} from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";
import { SubCatListComponent } from './component/admin/master/sub-category/sub-cat-list/sub-cat-list.component';
import { SubCatAddComponent } from './component/admin/master/sub-category/sub-cat-add/sub-cat-add.component';
import { SubCatEditComponent } from './component/admin/master/sub-category/sub-cat-edit/sub-cat-edit.component';
import { ModelListComponent } from './component/admin/master/model/model-list/model-list.component';
import { ModelAddComponent } from './component/admin/master/model/model-add/model-add.component';
import { ModelEditComponent } from './component/admin/master/model/model-edit/model-edit.component';
import { ServiceCenListComponent } from './component/admin/master/service-center/service-cen-list/service-cen-list.component';
import { ServiceCenAddComponent } from './component/admin/master/service-center/service-cen-add/service-cen-add.component';
import { ServiceCenEditComponent } from './component/admin/master/service-center/service-cen-edit/service-cen-edit.component';
import { DataTablesModule } from 'angular-datatables';
import { SettingComponent } from './component/admin/setting/setting.component';
import { NotForUseComponent } from './component/admin/report/not-for-use/not-for-use.component';
import { TransactionLogComponent } from './component/admin/report/transaction-log/transaction-log.component';
import { SubscriptionListComponent } from './component/admin/report/subscription-list/subscription-list.component';


@NgModule({
  declarations: [
    AppComponent,HeaderComponent,FooterComponent,SidebarComponent,DashboardComponent,CustomerListComponent,CustomerAddComponent,TicketListComponent,CustomerDetailComponent,TicketDetailComponent,ProductListComponent,ProductDetailComponent,CustomerReportListComponent,CustomerReportDeatilComponent,TicketReportListComponent,TicketReportDetailComponent,ProductReportListComponent,ProductReportDetailComponent,CategoryListComponent,CategoryAddComponent,BrandListComponent,BrandAddComponent,PackageListComponent,PackageAddComponent,SupportListComponent,SupportAddComponent,SendNotificationComponent,SendEmailComponent,SendSmsComponent,CustomerEditComponent,CategoryEditComponent,BrandEditComponent,PackageEditComponent,LoginComponent,RegistrationComponent,ForgetComponent,ChangeComponent, SupportEditComponent, SubCatListComponent, SubCatAddComponent, SubCatEditComponent, ModelListComponent, ModelAddComponent, ModelEditComponent, ServiceCenListComponent, ServiceCenAddComponent, ServiceCenEditComponent, SettingComponent, NotForUseComponent, TransactionLogComponent, SubscriptionListComponent,
  ],
  imports: [
    BrowserModule,AppRoutingModule,
    NgxUiLoaderModule,CommonModule,
    FormsModule,ReactiveFormsModule,
    HttpClientModule,DataTablesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
