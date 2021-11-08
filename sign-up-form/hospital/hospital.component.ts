import { Component, OnInit, Output } from '@angular/core';
import { DataService } from "src/app/data.service";
import { Subscription } from 'rxjs';
import { Hospital } from 'src/app/SharingWebData/hospital.model';
import { NgForm} from '@angular/forms';
import { WebService } from 'src/app/SharingWebData/web.service';
import {HospitalEmployee} from 'src/app/SharingWebData/hospitalEmployee.model'
import { hostViewClassName } from '@angular/compiler';




@Component({
  selector: 'app-hospital',
  templateUrl: './hospital.component.html',
  styleUrls: ['./hospital.component.scss'],
  providers:[WebService]
})
export class HospitalComponent implements OnInit {

  IsShow:boolean;
  subscription: Subscription;

  @Output() HospitalName:string;
  @Output() HospitalCode:string;
  @Output() HospitalNameArray:any = [];
  @Output() HospitalCodeArray:any = [];
  @Output() GlobalHospitalName:string;


  @Output() _EmployeeUsername:string;
  @Output() _EmployeePassword:string;
  @Output() EmployeeUsername:any = [];
  @Output() EmployeePassword:any = [];

  @Output() message = "";


  constructor(public data: DataService,public data1: DataService,
    public hospitalService: WebService,
    public HospitalEmpService: WebService) { }

    ngOnInit(): void {
      this.subscription = this.data.currentMessage.subscribe(message => this.IsShow = message)
      this.resetForm();
      this.refreshHospitalList();
      this.refreshHospitalEmployeeList();
 
    }

  resetForm(form?: NgForm) {
    if (form)
      form.reset();
    this.hospitalService.selectedHospital = {
      _id: "",
      name:"",
      code:"",
      Address:"",

    }
  }
  onSubmit(form: NgForm) {
    if (form.value._id == "") {
      this.hospitalService.postHospital(form.value).subscribe((res) => {
        this.resetForm(form);
        this.refreshHospitalList();
        alert("Saved successfully on DataBase..");
       // M.toast({ html: 'Saved successfully', classes: 'rounded' });
      });
    }
    else {
      this.hospitalService.putHospital(form.value).subscribe((res) => {
        this.resetForm(form);
        this.refreshHospitalList();
        alert("Updated successfully..");
       // M.toast({ html: 'Updated successfully', classes: 'rounded' });
      });
    }
  }
  

 initUserNameAndPSW()
 { 
  this.HospitalEmpService.getHospitalEmployees().subscribe(data =>{
    for(let i=0;i<data.length;i++)
    {
    this.EmployeeUsername.push(data[i].username);
    this.EmployeePassword.push(data[i].password);
    }
    for(let i=0;i<this.EmployeeUsername.length;i++){
      if(this.EmployeeUsername[i]==this._EmployeeUsername &&
         this.EmployeePassword[i]==this._EmployeePassword)
      {
       
        this.message = "";
        this.checkHospitalNameCode();


      }else if(this.EmployeeUsername[i]!=this._EmployeeUsername &&
               this.EmployeePassword[i]!=this._EmployeePassword)
        {
          this.message = "Invalid Password Or UserName/Hospital Code Invalid";
        }
             }
  })
  }

 refreshHospitalEmployeeList() {
  this.HospitalEmpService.getHospitalEmployeeList().subscribe((res) => {
    this.HospitalEmpService.hospitalsEmployees = res as HospitalEmployee[];
  });
}

checkHospitalNameCode()
{
  
  this.hospitalService.getHospitals().subscribe(data =>{
    for(let i=0;i<data.length;i++)
    {
    this.HospitalNameArray.push(data[i].name);
    this.HospitalCodeArray.push(data[i].code);
    }
    for(let i=0;i<this.HospitalNameArray.length;i++){
      if(this.HospitalNameArray[i]==this.HospitalName &&
         this.HospitalCodeArray[i]==this.HospitalCode)
      {
        
        this.data.toShowHospitalPage(false);
        this.data.HideSinginForm(false);
        this.data.HospitalNameFunctionNext(this.HospitalName);
        this.data.HospitalNameEmployeeNext(this._EmployeeUsername);

       
      }
             }
            
  })
}
  onEdit(hos: Hospital) {
    //this.hospitalService.selectedHospital = hos;
    if(hos.name=="Achilov")
    {
      this.HospitalName = hos.name;
    }
  }
  
  refreshHospitalList(): void {
    this.hospitalService.getHospitalList().subscribe((res) => {
      this.hospitalService.hospitals = res as Hospital[];
    });
  }


  ShowHospital(){
    
    this.initUserNameAndPSW();
  }

  MoveHospitalName(){
    console.log("hospital name this.HospitalName in function"+ this.HospitalName);
    console.log("hospital name this.GlobalHospitalName in function"+ this.GlobalHospitalName);
    //this.data1.HospitalNameFunctionNext(this.HospitalName);
  }
  go()
  {
    this.MoveHospitalName();
  }
 
}
