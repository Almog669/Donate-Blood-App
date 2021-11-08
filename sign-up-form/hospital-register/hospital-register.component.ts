import { Component, OnInit, Output } from '@angular/core';
import {User} from '../../DUser';
import { WebService } from 'src/app/SharingWebData/web.service';
import { HospitalEmployee } from 'src/app/SharingWebData/hospitalEmployee.model';
import { NgForm} from '@angular/forms';

@Component({
  selector: 'app-hospital-register',
  templateUrl: './hospital-register.component.html',
  styleUrls: ['./hospital-register.component.scss'],
  providers: [WebService]

})
export class HospitalRegisterComponent implements OnInit {

  //Property for the gender
  public gender: string[];
  //Property for the user
  public user:User;

  @Output() ConfirmPassword: string;
  @Output() DataBaseMsg: string;

  constructor(public HospitalEmpService: WebService) { }

  ngOnInit() {
  
  this.gender =  ['Male', 'Female', 'Others'];
  //Create a new user object
  this.user = new User({email:"", password: { pwd: "" , confirmPwd: ""}, gender: this.gender[0], terms: false});
  this.resetForm();
  this.refreshHospitalEmployeeList();
}
resetForm(form?: NgForm) {
  if (form)
    form.reset();
    this.ConfirmPassword = "";
  this.HospitalEmpService.selectedHospitalEmployee = {
    _id: "",
    name:"",
    username: "",
    password: "",
    position: ""
    
  }
}
onSubmit(form: NgForm) {
  if (form.value._id == "") {
    this.HospitalEmpService.postHospitalEmployee(form.value).subscribe((res) => {
      this.resetForm(form);
      this.refreshHospitalEmployeeList();
      //alert("Saved successfully on DataBase..");
      this.DataBaseMsg = "Saved successfully on DataBase..Press Back button please.";
     // M.toast({ html: 'Saved successfully', classes: 'rounded' });
    });
  }
  else {
    this.HospitalEmpService.putHospitalEmployee(form.value).subscribe((res) => {
      this.resetForm(form);
      this.refreshHospitalEmployeeList();
      alert("Updated successfully..");
     // M.toast({ html: 'Updated successfully', classes: 'rounded' });
    });
  }
}

refreshHospitalEmployeeList() {
  this.HospitalEmpService.getHospitalEmployeeList().subscribe((res) => {
    this.HospitalEmpService.hospitalsEmployees = res as HospitalEmployee[];
  });
}

onEdit(Hemp: HospitalEmployee) {
  this.HospitalEmpService.selectedHospitalEmployee = Hemp;
}

onDelete(_id: string,) {
  if (confirm('Are you sure to delete this record ?') == true) {
    this.HospitalEmpService.deleteHospitalEmployee(_id).subscribe((res) => {
      this.refreshHospitalEmployeeList();
     // this.resetForm(form);
   //   M.toast({ html: 'Deleted successfully', classes: 'rounded' });
    });
  }
}







 onFormSubmit({ value, valid}: { value: User, valid: boolean }) {
    this.user = value;
    console.log( this.user);
    console.log("valid: " + valid);

  }
}
