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
import { SendNotificationComponent } from './component/admin/notification/send-notification/send-notification.component';
import { SendEmailComponent } from './component/admin/notification/send-email/send-email.component';
import { SendSmsComponent } from './component/admin/notification/send-sms/send-sms.component';
import { CustomerEditComponent } from './component/admin/customer/customer-edit/customer-edit.component';
import { CategoryEditComponent } from './component/admin/master/category/category-edit/category-edit.component';
import { BrandEditComponent } from './component/admin/master/brand/brand-edit/brand-edit.component';
import { PackageEditComponent } from './component/admin/package/package-edit/package-edit.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    DashboardComponent,
    CustomerListComponent,
    CustomerAddComponent,
    TicketListComponent,
    CustomerDetailComponent,
    TicketDetailComponent,
    ProductListComponent,
    ProductDetailComponent,
    CustomerReportListComponent,
    CustomerReportDeatilComponent,
    TicketReportListComponent,
    TicketReportDetailComponent,
    ProductReportListComponent,
    ProductReportDetailComponent,
    CategoryListComponent,
    CategoryAddComponent,
    BrandListComponent,
    BrandAddComponent,
    PackageListComponent,
    PackageAddComponent,
    SupportListComponent,
    SupportAddComponent,
    SendNotificationComponent,
    SendEmailComponent,
    SendSmsComponent,
    CustomerEditComponent,
    CategoryEditComponent,
    BrandEditComponent,
    PackageEditComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
