import { NgModule } from '@angular/core';
import { Routes,RouterModule } from '@angular/router';
import {AppointComponent} from './appoint/appoint.component';
import { StockComponent } from './stock/stock.component';
import { OrdersComponent } from './orders/orders.component';
import { BloodManagementComponent } from './blood-management/blood-management.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser'
import {EmergencyComponent} from "./emergency/emergency.component";

import { DataService } from '../data.service';



const routeHospital : Routes =
[
  {path:"app-appoint", component: AppointComponent, outlet:"HospitalOutLet"},
  {path:"app-stock", component: StockComponent, outlet:"HospitalOutLet"},
  {path:"BloodManagement", component: BloodManagementComponent, outlet:"HospitalOutLet"},
  {path:"app-orders", component: OrdersComponent, outlet:"HospitalOutLet"},
  {path:"app-emergency", component: EmergencyComponent, outlet:"HospitalOutLet"}
]


@NgModule({

  imports: [RouterModule.forRoot(routeHospital), FormsModule, BrowserModule, ReactiveFormsModule],
  exports: [RouterModule],
  declarations: [ StockComponent, OrdersComponent, BloodManagementComponent, EmergencyComponent],
  

})
export class HospitalModule { }
