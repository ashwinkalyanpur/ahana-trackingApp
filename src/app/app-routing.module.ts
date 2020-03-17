import { NgModule } from '@angular/core';
import { Routes, RouterModule, Router, ActivatedRoute } from '@angular/router';
import { VendorRegistrationComponent } from './vendor-registration/vendor-registration.component';
import { AddCustomerComponent } from './add-customer/add-customer.component';
import { TrackTableComponent } from './track-table/track-table.component';
import { TicketingTableComponent } from './ticketing-table/ticketing-table.component';
import { AdminApprovalComponent } from './admin-approval/admin-approval.component';
import { CreateLoginComponent } from './create-login/create-login.component';
import { WrokProgressComponent } from './wrok-progress/wrok-progress.component';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ViewTicketComponent } from './ticketing-table/view-ticket/view-ticket.component';
import { AssignTicketComponent } from './ticketing-table/assign-ticket/assign-ticket.component';





const routes: Routes = [
  { path: '', redirectTo: '/VendorRegistrationComponent', pathMatch: 'full' },
  { path: "VendorRegistrationComponent", component: VendorRegistrationComponent },
  { path: "AddCustomerComponent", component: AddCustomerComponent },
  { path: "TrackTableComponent", component: TrackTableComponent },
  { path: "TicketingTableComponent", component: TicketingTableComponent },
  { path: "AdminApprovalComponent", component: AdminApprovalComponent },
  { path: "CreateLoginComponent", component: CreateLoginComponent },
  { path: "WrokProgressComponent", component: WrokProgressComponent },
  { path: "LoginComponent", component: LoginComponent },
  { path: "ForgotPasswordComponent", component: ForgotPasswordComponent },
  { path: "AssignTicketComponent", component: AssignTicketComponent },
  { path: "ViewTicketComponent", component: ViewTicketComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

 }
