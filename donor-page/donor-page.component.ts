import { Component, OnInit, Output } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { DataService } from "src/app/data.service";
import { Subscription } from 'rxjs';
import { User } from 'src/app/DUser';
import { WebService } from 'src/app/SharingWebData/web.service';
import { Donor } from 'src/app/SharingWebData/donor.model';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-donor-page',
  templateUrl: './donor-page.component.html',
  styleUrls: ['./donor-page.component.scss'],
  providers: [WebService]
})
export class DonorPageComponent implements OnInit {


  subscription: Subscription;
  
  @Output() username:string;
  @Output() BloodType:string;

  donorss = [];
  
  password:string;
  user:User;
  isShow:boolean;
  inter:boolean;
  
  constructor(private data: DataService,
              public donorService: WebService) { }

  ngOnInit(): void {
    
    this.subscription = this.data.CurrentUser.subscribe(message => this.user = message)
    this.subscription = this.data.CurrentDName.subscribe(message => this.username = message)
    this.subscription = this.data.CurrentDPsw.subscribe(message => this.password = message)
    this.isShow = true;
    this.inter = true;
    this.refreshDonorList();

    this.GetDonorInfoAvatar();
  
  }
 

  Username()
{
  
  this.data.donorUsername(this.username);
}
  refreshDonorList() {
    this.donorService.getDonorList().subscribe((res) => {
      this.donorService.donors = res as Donor[];
    });
  }
  GetDonorInfoAvatar()
  {
    this.donorService.getDonors().subscribe(users =>{
      for(let i=0;i<users.length;i++)
      {
        if(users[i].username==this.username)
        {
                this.BloodType = users[i].bloodType;
        }
      }


      })
  }


  
toggle(){
  this.inter = false;
}

}
