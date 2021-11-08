import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataService } from 'src/app/data.service';
import { DonorHistory } from 'src/app/SharingWebData/DonorHistory.model';
import { StaticDonorsHistory } from 'src/app/SharingWebData/StaticDonorsHistory.model';
import { WebService } from 'src/app/SharingWebData/web.service';

@Component({
  selector: 'app-donor-his',
  templateUrl: './donor-his.component.html',
  styleUrls: ['./donor-his.component.scss'],
  providers:[WebService]
})
export class DonorHisComponent implements OnInit {

  subscription:Subscription;

  StaticDonorHis:StaticDonorsHistory[]=[];
  OneStaticDonorHis: StaticDonorsHistory;


  username:string;
  Identitiy:any;

  constructor(public donorService:WebService,
              public data: DataService) { }

  ngOnInit(): void {

    this.subscription = this.data.CurrentDName.subscribe(message => this.username = message)

    this.ResfreshDonorsHistoryList();
    this.DonorHistoryByUser();
    this.InitDonorUser();
  }

  InitDonorUser(){
    this.donorService.getDonors().subscribe(Donors=>{
  
      for(let i=0;i<Donors.length;i++)
      {
        if(Donors[i].username==this.username)
        {
                this.Identitiy = Donors[i].identity;
        }
      }
    
        })
  }


  ResfreshDonorsHistoryList(){
    this.donorService.getDonorHistoryList().subscribe(res=>{
      this.donorService.DonorsHistorys = res as DonorHistory[];
    })
    
  } 

  DonorHistoryByUser(){
    this.donorService.getDonorHistory_s().subscribe(DonorsHistory=>{
          //for(let i=0;i<DonorsHistory.length;i++)
          //{
          //  if(DonorsHistory[i].username==this.username)
            this.StaticDonorHis = DonorsHistory.filter(s=>s.username==this.username);
            this.StaticDonorHis = this.StaticDonorHis.filter(s=>s.identity==this.Identitiy);

         // }
        
       // this.StaticDonorHis = this.StaticDonorHis.filter(s=>s.identity.valueOf()==)
    })

  }

}
