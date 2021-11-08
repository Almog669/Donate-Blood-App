import { Component, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { WebService } from 'src/app/SharingWebData/web.service';
import { DonorAppointments } from 'src/app/SharingWebData/DonorAppointments.model';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { DataService } from 'src/app/data.service';
import { HospitalDonorAppointFilter } from 'src/app/SharingWebData/HospitalDonorAppointFilter.model';
import { HospitalDonorAppointDayFilter } from 'src/app/SharingWebData/HospitalDonorAppointDayFilter.model';
import { Donor } from 'src/app/SharingWebData/donor.model';
import { BeforeQ } from 'src/app/SharingWebData/Ques/BeforeQ.model';
import { AfterQ } from 'src/app/SharingWebData/Ques/AfterQ.model';






@Component({
  selector: 'app-appoint',
  templateUrl: './appoint.component.html',
  styleUrls: ['./appoint.component.scss'],
  providers: [WebService]
})
export class AppointComponent implements OnInit {

  subscription: Subscription;
  sub:Subscription;

  @Output() _usernameDonor:string;
  @Output() password:string;

  @Output() ApointName:string;
  @Output() HospitalEmployee:any;
  @Output() Position:any;
  @Output() HospitaNameObserve:string;


  @Output() HopitalNames:any = [];
  @Output() days: string[];
  @Output() now:any;


  @Output() YesterdayObject = new Date();
  @Output() todayObject = new Date();
  @Output() TomorrowObject = new Date();
  @Output() WeekObject = new Date();
  @Output() MonthObject = new Date();
  @Output() NextMonthObject = new Date();
  @Output() Next3MonthObject = new Date();

  yesterdayString:string;
  todayString:string;
  TomorrowString:string;
  WeekString:string;
  MonthString:string;
  NextMonthString:string;
  Next3MonthString:string;

  /***TimeUnited*****/
  MonthAndDay:string;
  Tomorrow:string;
  Yesterday:string;
  Next3Month:string;
  DonateDate:string;

  DonorId:any;


  @Output() DonorInDialog = "";
  @Output() ShowValidImage:boolean;
  @Output() ForAfterQuesResponse:boolean;
  @Output() b:boolean;


  year: string;
  
  @Output() DUsername:any = [];
  @Output() Password:any = [];
  public bloodType: string[];


  hospitalDonorAppointFilter?:HospitalDonorAppointFilter[]=[];
  CurrentAchilovAppoint?: HospitalDonorAppointFilter;

  DayFilter?:HospitalDonorAppointDayFilter[]=[];
  CurrentDayFilter?:HospitalDonorAppointDayFilter;

  
  currentIndex = -1;
  RadioValueQuesA = '';

  public selected: string;

  ShowQues:boolean;
  ShowAfterQ:boolean;
  ShowDontKnowBloodtypeButton:boolean

  validDonor:boolean;
 
  QuesB: BeforeQ[]=[];
  CurrentQuesB = new BeforeQ();

  QuesA: AfterQ[]=[];
  CurrentQuesA = new AfterQ();

  RandomNum:any;

  public OneDonor={
    _id:"",
    username:"",
    identity:0,
    HospitalName:"",
    Date:"",
    Hour:""

  }

 
  
    
  constructor(public employeeService: WebService,
              public donorService: WebService,
               public data: DataService,
               public data1:DataService,
               private router: Router) {
                setInterval(() => {
                  this.now = new Date();
               }, 1);
                }

                btnClick= function () {
                  this.router.navigate(['/',"[{ outlets: { HospitalOutLet: ['./app-pre-ques']}}]"]);
          };

  
  ngDoCheck() {
    if(this.CurrentQuesA.SystolicNumber <90 ||
      this.CurrentQuesA.SystolicNumber>140)
      {
       this.RadioValueQuesA = "Should Rest for 15 Mintues If Doesn't Well Visit ER.";
 
      }
      else if(this.CurrentQuesA.SystolicNumber >90 ||
        this.CurrentQuesA.SystolicNumber<140){
        this.RadioValueQuesA  = "";
      }
  }

  ngOnInit(): void {

    this.ShowValidImage = true;
    this.ShowAfterQ = false;
    this.ForAfterQuesResponse = false;
    this.ShowDontKnowBloodtypeButton=false;
    this.b = false;

    this.YesterdayObject.setDate(this.YesterdayObject.getDate()-1);
    this.yesterdayString = this.YesterdayObject.toLocaleString("he",
    {
     day: "2-digit",
   });
  
    this.TomorrowObject.setDate(this.TomorrowObject.getDate()+1);
    this.TomorrowString = this.TomorrowObject.toLocaleString("he",
    {
     day: "2-digit",
   });

    this.todayObject.setDate(this.todayObject.getDate());
    this.todayString = this.todayObject.toLocaleString("he",
     {
      day: "2-digit",
    });

    this.WeekObject.setDate(this.WeekObject.getDate()+6);
    console.log("WeekObject"+this.WeekObject);
    this.WeekString = this.WeekObject.toLocaleString("he",{
      
      day:"2-digit",
    });
    console.log("WeekObject"+this.WeekObject+"-"+this.WeekString);

    this.MonthObject.setMonth(this.MonthObject.getMonth());
    this.MonthString = this.MonthObject.toLocaleString("he",{
      month:"2-digit",
    });

    this.Next3MonthObject.setMonth(this.Next3MonthObject.getMonth()+3);
    this.Next3MonthString = this.Next3MonthObject.toLocaleString("he",{
      month:"2-digit",
    })

    


    this.MonthAndDay = this.MonthString+"-"+this.todayString;
    this.Tomorrow = this.MonthString+"-"+this.TomorrowString;
    this.Yesterday =  this.MonthString+"-"+this.yesterdayString;
    
  
    this.NextMonthObject.setMonth(this.NextMonthObject.getMonth()+2);
    this.NextMonthString = this.NextMonthObject.getMonth().toString();

    var date = new Date();
var result = date.toLocaleDateString("en-GB",
 { 
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

    this.bloodType = ["A","B","AB","O","A-","B-","AB-","O-"];
    this.days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

    this.subscription = this.data1.CurrentUserName.subscribe(mess => this._usernameDonor = mess);
    this.sub = this.data.CurrentHospitalName.subscribe(_HosName => { this.HospitaNameObserve = _HosName});
    this.sub = this.data.CurrentHospitalEmployee.subscribe(HospitalEmployee => { this.HospitalEmployee = HospitalEmployee});

  
  this.refreshEmployeeList();
  this.ResetDayFilters();
  this.GetTodayAppointments();
  

 
   
  }
  IfBloodTypeDontKnow(id:string){
    console.log("id"+id);
    this.donorService.getDonors().subscribe(Donors=>{
      
     
        
          for(let i=0;i<Donors.length;i++)
          {
           
          for(let t=0; t<this.DayFilter.length;t++)
          {
          if(this.DayFilter[t].bloodType== "Don't know" && this.DayFilter[t]._id==id)
          {
             let random = Math.floor(Math.random() * this.bloodType.length);
             let NewBloodType = this.bloodType[random];

              if(Donors[i].identity==this.DayFilter[t].identity)
              {
                Donors[i].bloodType=NewBloodType;
                this.donorService.putDonor(Donors[i]).subscribe();
                this.GetTodayAppointments();
              }
          }
        }
        }
        
      })
      
  
  }
  CheckAnswer(form: NgForm){

    
  }
  YesOrNoToBool(t?:any){
    if(t)
    {
    
  }
  
       
  }
  ShowQuesDonorAfter(id:string)
  {
    this.InitDonorDetails();
    this.DonorId = '';
    this.DonorId = id;
    this.donorService.getDonors().subscribe(Donors=>{
      for(let t=0; t<Donors.length;t++)
      {
        for(let s=0;s<this.DayFilter.length;s++)
        { 
            if(this.DayFilter[s]._id==this.DonorId){
            if(this.DayFilter[s].identity==Donors[t].identity)
            {
              if(Donors[t].Valid==true)
              {
                this.ShowAfterQ = true; 
                this.donorService.getHospitalEmployees().subscribe(HosEmp=>{
                  for(let i = 0; i<HosEmp.length;i++)
                  {
                    if(this.HospitalEmployee==HosEmp[i].username)
                    {
                      this.Position = HosEmp[i].position;
                    }
                  }
                })
            
                this.donorService.getAppointments().subscribe(AllDonors =>{
                  for(let m=0;m<AllDonors.length;m++)
                  {       for(let n=0;n<this.DayFilter.length;n++)
                          {
                    if(AllDonors[m]._id==this.DonorId)
                    { 
                        if(this.DayFilter[n]._id == this.DonorId)
                        {
                        this.DonateDate = this.DayFilter[n].Day;
                        this.Next3Month = this.Next3MonthString+ "-" +this.todayString; 
                        this.DonorInDialog = this.DayFilter[n].identity+ ", " + AllDonors[m].UserName;
                        
                        }
                    }
                      }
                  }
              })
              }
            }
        }
      }
      }
    })
    //this.ShowAfterQ = true;

  
    
  }
  CloseQuesDonorAfter()
  {
    this.ShowAfterQ = false;

  }
  AbnormalRes(e)
  {
    if(e)
    {
      this.ForAfterQuesResponse = true;
    }else
    {}
    
  }
  

  ShowQuesDonor(id?:any)
  {
    this.InitDonorDetails();
    this.DonorId = '';
    this.DonorId = id;
    this.ShowQues = true;

    console.log("id in func: "+id+"Idobserve:" +this.DonorId);

    this.donorService.getAppointments().subscribe(AllDonors =>{
      for(let m=0;m<AllDonors.length;m++)
      {       for(let n=0;n<this.DayFilter.length;n++)
              {
        if(AllDonors[m]._id==this.DonorId)
        { 
            if(this.DayFilter[n]._id == this.DonorId)
            {
            this.DonateDate = this.DayFilter[n].Day;
            this.Next3Month = this.Next3MonthString+ "-" +this.todayString; 
            this.DonorInDialog = this.DayFilter[n].identity+ ", " + AllDonors[m].UserName;
            
            }
        }
          }
      }
  })
  }
  CloseQuesDonor()
  {
    this.ShowQues = false;
  }
 
  InitDonorDetails(){

    this.refresUsersDonorsList();
    this.donorService.getDonors().subscribe(donors => {
    
if(donors!=undefined && this.DayFilter.length !=0)
{
      for(let i=0; i< this.DayFilter.length; i++)
      { 
        for(let j=0;j<donors.length;j++)
        { 
            if(this.DayFilter[i].UserName == donors[j].username)
            {
              this.DayFilter[i].Gender = donors[j].Gender;
              this.DayFilter[i].identity = donors[j].identity;
              this.DayFilter[i].age = donors[j].age;
              this.DayFilter[i].Email = donors[j].Email;
              this.DayFilter[i].phoneNumber = donors[j].phoneNumber;
              this.DayFilter[i].bloodType = donors[j].bloodType;
              this.DayFilter[i].Valid = donors[j].Valid;

              
            }
        }
      }
      
}
    })
  }
  ResetDayFilters()
  {
    if(this.DayFilter != undefined
       && this.DayFilter.length !=0
       && this.hospitalDonorAppointFilter !=undefined
       && this.hospitalDonorAppointFilter.length!=0)
    {
    
     delete this.hospitalDonorAppointFilter;
     delete this.DayFilter;
    
   }
  }
  GetAllAppointments(){
    this.ResetDayFilters(); this.InitDonorDetails();
        this.employeeService.getAppointments().subscribe(data =>{
  this.hospitalDonorAppointFilter= data.filter(s=>s.HospitalName.includes(this.HospitaNameObserve));
  this.DayFilter= this.hospitalDonorAppointFilter.filter(s=>s.HospitalName.includes(this.HospitaNameObserve));
         this.selected = "All";})
  }
  GetYesterdayAppointments()
  {
    this.ResetDayFilters(); this.InitDonorDetails();
    this.employeeService.getAppointments().subscribe(data =>{
this.hospitalDonorAppointFilter= data.filter(s=>s.HospitalName.includes(this.HospitaNameObserve));
this.DayFilter= this.hospitalDonorAppointFilter.filter(s=>s.Day.includes(this.Yesterday));
      this.selected = "Yesterday";})

  }
  GetTodayAppointments(){   this.ResetDayFilters(); this.InitDonorDetails();
    this.employeeService.getAppointments().subscribe(data =>{
this.hospitalDonorAppointFilter= data.filter(s=>s.HospitalName.includes(this.HospitaNameObserve));
this.DayFilter= this.hospitalDonorAppointFilter.filter(s=>s.Day.includes(this.MonthAndDay));
      this.selected = "Today";})}

  GetTomorrowAppointment(){ this.ResetDayFilters(); this.InitDonorDetails();
    this.employeeService.getAppointments().subscribe(data =>{
     
      this.hospitalDonorAppointFilter= data.filter(s=>s.HospitalName.includes(this.HospitaNameObserve));
          this.DayFilter= this.hospitalDonorAppointFilter.filter(s=>s.Day.includes(this.Tomorrow));
          this.selected = "Tomorrow";
    })
    }

  GetAppointmentsByMonth(){ this.ResetDayFilters(); this.InitDonorDetails();
        this.employeeService.getAppointments().subscribe(data =>{
  this.hospitalDonorAppointFilter= data.filter(s=>s.HospitalName.includes(this.HospitaNameObserve));
  this.DayFilter= this.hospitalDonorAppointFilter.filter(s=>s.Day.includes(this.MonthString + "-" ));
         this.selected = "Month";})}
 
  refresUsersDonorsList()
  {
    this.donorService.getDonorList().subscribe((res =>{
      this.donorService.donors = res as Donor[];
    }))
  }
  refreshEmployeeList() {
    this.employeeService.getEmployeeList().subscribe((res) => {
      this.employeeService.DonorsAppointments = res as DonorAppointments[];
    });
    }

  onEdit(emp: DonorAppointments) {
    this.employeeService.selectedDonorAppointments = emp;
  }

  onDelete(_id: string,) {
    if (confirm('Are you sure to delete this record ?') == true) {
      this.employeeService.deleteEmployee(_id).subscribe((res) => {
        this.refreshEmployeeList();
        alert("Deleted successfully...");
       
      });
    }
  }

ResetAswers()
{
  if(this.CurrentQuesB.Answer !=undefined 
    && this.CurrentQuesB.Answer.length > 0)
    {
       this.CurrentQuesB.Answer=[];
      
    }
}


CheckIfValid()
{
  
  let K = this.CurrentQuesB.Answer.length-1;
     
  if(K==16)
    {
      this.InitDonorDetails();
      
  for(let i=1;i<this.CurrentQuesB.Answer.length;i++)
  {
    
    if(this.CurrentQuesB.Answer[0]==true && this.CurrentQuesB.Answer[i]==false)
    {       
            this.donorService.getDonors().subscribe(AllDonors =>{
                for(let m=0;m<this.DayFilter.length;m++)
                {
                  if(this.DayFilter[m]._id==this.DonorId)
                  {
                      
                      for(let n=0;n<AllDonors.length;n++)
                      {
                      if(AllDonors[n].identity==this.DayFilter[m].identity)
                      {
                        AllDonors[n].Valid=true;
                        this.donorService.putDonor(AllDonors[n]).subscribe();
                      
                        this.refresUsersDonorsList();
                        this.CloseQuesDonor();
                      }
                      
                      }
                  }
                }
            })
    }
    else
    {
      
      this.donorService.getDonors().subscribe(AllDonors =>{
        for(let m=0;m<this.DayFilter.length;m++)
        {
          if(this.DayFilter[m]._id==this.DonorId)
          {
              
              for(let n=0;n<AllDonors.length;n++)
              {
              if(AllDonors[n].identity==this.DayFilter[m].identity)
              {
                AllDonors[n].Valid=false;
                this.donorService.putDonor(AllDonors[n]).subscribe();
                
                this.refresUsersDonorsList();
                this.CloseQuesDonor();
              }
              
              }
          }
        }
    })
    }
  }
      this.InitDonorDetails();
      this.ResetAswers();
      this.CloseQuesDonor();
      
  }

}
FinishQuesAfter(e?){

  if(this.CurrentQuesA.SystolicNumber <90 ||
     this.CurrentQuesA.SystolicNumber>140)
     {
      this.RadioValueQuesA = "Should Rest for 15 Mintues If Doesn't Well Visit ER.";

     }
     if(this.CurrentQuesA.WholeBlood==true)
     { 
       this.donorService.getDynamicHospitalStocks().subscribe(HospitalStock=>{
          for(let j=0;j<HospitalStock.length;j++)
          {
            if(HospitalStock[j].HospitalName==this.HospitaNameObserve &&
               HospitalStock[j].stock==true)
               {
         for(let i=0;i<this.DayFilter.length;i++)
         {
           
           if(this.DayFilter[i]._id==this.DonorId)
           {    
             this.RandomNum = Math.floor(Math.random() * (Math.floor(4) -Math.ceil(3)  + 1)) + Math.ceil(3); 
             if(this.DayFilter[i].bloodType=="A")
             {HospitalStock[j].A = HospitalStock[j].A +this.RandomNum;}
             if(this.DayFilter[i].bloodType=="B")
             {HospitalStock[j].B = HospitalStock[j].B +this.RandomNum;}
             if(this.DayFilter[i].bloodType=="AB")
             {HospitalStock[j].AB = HospitalStock[j].AB +this.RandomNum;}
             if(this.DayFilter[i].bloodType=="O")
             {HospitalStock[j].O = HospitalStock[j].O +this.RandomNum;}
             if(this.DayFilter[i].bloodType=="A-")
             {HospitalStock[j].Am = HospitalStock[j].Am +this.RandomNum;}
             if(this.DayFilter[i].bloodType=="B-")
             {HospitalStock[j].Bm = HospitalStock[j].Bm +this.RandomNum;}
             if(this.DayFilter[i].bloodType=="AB-")
             {HospitalStock[j].ABm = HospitalStock[j].ABm +this.RandomNum;}
             if(this.DayFilter[i].bloodType=="O-")
             {HospitalStock[j].Om = HospitalStock[j].Om +this.RandomNum;}
             this.donorService.putDynamicHospitalStock(HospitalStock[j]).subscribe();
           }
         }
       
      }
    }
      })
this.donorService.getDonors().subscribe(Donors=>{
  for(let k=0;k<Donors.length;k++)
  {  
      for(let i=0;i<this.DayFilter.length;i++)
      {
        if(this.DayFilter[i]._id==this.DonorId)
        {
           if(this.DayFilter[i].identity==Donors[k].identity &&
              this.DayFilter[i].UserName==Donors[k].username)
        { 
          this.OneDonor = {
            _id:"",
            username:Donors[k].username,
            identity:Donors[k].identity,
            HospitalName:this.DayFilter[i].HospitalName,
            Date:this.DayFilter[i].Day,
            Hour:""
            
          }
          this.donorService.postDonorHistory(this.OneDonor).subscribe();
          }
        }
      }
    }
  })
}
     
     this.ShowAfterQ = false;
}



}
