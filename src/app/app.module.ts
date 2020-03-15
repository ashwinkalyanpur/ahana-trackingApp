import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


import {NgbPaginationModule, NgbAlertModule} from '@ng-bootstrap/ng-bootstrap';
import {NgbModule, NgbDropdownMenu} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgBootstrapFormValidationModule, CUSTOM_ERROR_MESSAGES } from 'ng-bootstrap-form-validation';
import { CountdownModule } from 'ngx-countdown';


import { TrackTableComponent } from './track-table/track-table.component';
import { AddCustomerComponent } from './add-customer/add-customer.component';
import { ClientRegistrationComponent } from './client-registration/client-registration.component';
import { VendorRegistrationComponent } from './vendor-registration/vendor-registration.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { TicketingTableComponent } from './ticketing-table/ticketing-table.component';
import { NgbdSortableHeader } from './sortable.directive';
import { MainContainerComponent } from './main-container/main-container.component';
import { NavContainerComponent } from './nav-container/nav-container.component';
import { HeaderComponent } from './header/header.component';
import { AdminApprovalComponent } from './admin-approval/admin-approval.component';
import { CUSTOM_ERRORS } from './custom-errors';
import { CreateLoginComponent } from './create-login/create-login.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { WrokProgressComponent } from './wrok-progress/wrok-progress.component';
import { WebcamModule } from 'ngx-webcam';
import { SidebarDirective } from './sidebar-directive';
import { AgmCoreModule } from '@agm/core';

@NgModule({
  declarations: [
    AppComponent,
    TrackTableComponent,
    AddCustomerComponent,
    ClientRegistrationComponent,
    VendorRegistrationComponent,
    TicketingTableComponent,
    NgbdSortableHeader,
    MainContainerComponent,
    NavContainerComponent,
    HeaderComponent,
    AdminApprovalComponent,
    CreateLoginComponent,
    LoginComponent,
    RegistrationComponent,
    WrokProgressComponent,
    SidebarDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    NgbPaginationModule,
    NgbAlertModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularFontAwesomeModule,
    NgBootstrapFormValidationModule.forRoot(),
    CountdownModule,
    WebcamModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCSIFuXPQXel1splGkx5ElXoU1bL60Jn-I'
    })
  ],
  providers: [{
    provide: CUSTOM_ERROR_MESSAGES,
    useValue: CUSTOM_ERRORS,
    multi: true
  }],
  exports: [],
  bootstrap: [AppComponent, ]
})
export class AppModule { }
