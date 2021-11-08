import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {Router, Navigation} from '@angular/router';
import {SignUpFormComponent} from '../sign-up-form.component';
import { AppComponent } from '../../app.component';
import { DataService } from "src/app/data.service";
import { Subscription } from 'rxjs';
import { User } from 'src/app/DUser';
import { WebService } from 'src/app/SharingWebData/web.service';
import { Donor } from 'src/app/SharingWebData/donor.model';
import { NgForm} from '@angular/forms';


@Component({
  selector: 'app-donor',
  templateUrl: './donor.component.html',
  styleUrls: ['./donor.component.scss'],
  providers: [WebService]
})
export class DonorComponent implements OnInit {
  
  IsShow:boolean;
  
  ShowDonor:boolean;
  subscription: Subscription;

  @Output() username:string;
  @Output() password:string;
  @Output() DonorUsername:any = [];
  @Output() DonorPassword:any = [];

  
  
  
  message = "";

  user:User;
  
  constructor(private data: DataService,
    public donorService: WebService){}

  ngOnInit() : void{ 
    
    this.subscription = this.data.currentMessage.subscribe(message => this.IsShow = message)
    this.subscription = this.data.cMsg.subscribe(message => this.ShowDonor = message)
    this.subscription = this.data.CurrentDName.subscribe(message => this.username = message)
    this.subscription = this.data.CurrentDPsw.subscribe(message => this.password = message)
    this.subscription = this.data.CurrentUser.subscribe(message => this.user = message)
    this.resetForm();
    this.refreshDonorList();
    

}

initUserNameAndPSW()
{ 
 this.donorService.getDonors().subscribe(data =>{
   for(let i=0;i<data.length;i++)
   {
   this.DonorUsername.push(data[i].username);
   this.DonorPassword.push(data[i].password);
   }
   for(let i=0;i<this.DonorUsername.length;i++){
     if(this.DonorUsername[i]==this.username &&
        this.DonorPassword[i]==this.password)
     {
      this.data.toShowDonorPage(false);
      this.data.changeMessage(false);
       this.message = "";
     }else if(this.DonorUsername[i]!=this.username &&
              this.DonorPassword[i]!=this.password)
       {
         this.message = "Invalid Password Or UserName";
       }
            }
 })
 }

resetForm(form?: NgForm) {
  if (form)
    form.reset();
  this.donorService.selectedDonor = {
    _id: "",
    username: "",
    password: "",
    identity:0,
    age:0,
    Gender:"",
    phoneNumber:"",
    Email:"",
    bloodType: "",
    ToUrgent:false,
    Valid:false,
    Adress:"",
    Smoke:false
    
  }
}
onSubmit(form: NgForm) {
  if (form.value._id == "") {
    this.donorService.postDonor(form.value).subscribe((res) => {
      this.resetForm(form);
      this.refreshDonorList();
      alert("Saved successfully on DataBase..");
     // M.toast({ html: 'Saved successfully', classes: 'rounded' });
    });
  }
  else {
    this.donorService.putDonor(form.value).subscribe((res) => {
      this.resetForm(form);
      this.refreshDonorList();
      alert("Updated successfully..");
     
    });
  }
}

refreshDonorList() {
  this.donorService.getDonorList().subscribe((res) => {
    this.donorService.donors = res as Donor[];
  });
}

onEdit(don: Donor) {
  this.donorService.selectedDonor = don;
}

onDelete(_id: string,) {
  if (confirm('Are you sure to delete this record ?') == true) {
    this.donorService.deleteDonor(_id).subscribe((res) => {
      this.refreshDonorList();
     
    });
  }
}

Username()
{
  this.data.donorUsername(this.username);
  this.data.donorPassword(this.password);
}


showDonor(){
  
  this.initUserNameAndPSW();
}
  

}
