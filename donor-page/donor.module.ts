import { NgModule } from '@angular/core';
import { SearchComponent } from './search/search.component';
import { Routes,RouterModule } from '@angular/router';
import { BeforeComponent } from './before/before.component';
import { AfterComponent } from './after/after.component';
import { RisksComponent } from './risks/risks.component';
import { DonorHisComponent } from './donor-his/donor-his.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser'




const routeDonor : Routes =
[
  {path:"app-search", component: SearchComponent, outlet:"DonorDisplay"},
  {path:"before", component: BeforeComponent,outlet:"DonorDisplay"},
  {path:"after", component: AfterComponent,outlet:"DonorDisplay"},
  {path:"risks", component: RisksComponent,outlet:"DonorDisplay"},
  {path:"app-donor-his", component: DonorHisComponent,outlet:"DonorDisplay"}
 
  
]

@NgModule({
  
  imports: [RouterModule.forRoot(routeDonor),FormsModule,BrowserModule],
  exports: [RouterModule],
  declarations: [BeforeComponent, AfterComponent, RisksComponent, DonorHisComponent]
  
})
export class DonorModule { }
