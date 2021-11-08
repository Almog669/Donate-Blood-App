import { Component, OnInit, AfterViewInit, ElementRef, ViewChild, Input, Output } from '@angular/core';
import { WebService } from 'src/app/SharingWebData/web.service';
import { DonorAppointments } from 'src/app/SharingWebData/DonorAppointments.model';
import { NgForm } from '@angular/forms';
import { Donor } from 'src/app/SharingWebData/donor.model';
import { Subscription } from 'rxjs';
import { DataService } from "src/app/data.service";

import {} from 'googlemaps';
import { HospitalCoords } from 'src/app/SharingWebData/HospitalsOnMap/HospitalsCoords.model';
import { HospitalClosest } from 'src/app/SharingWebData/HospitalsOnMap/HospitalClosest';
import { DonorHistory } from 'src/app/SharingWebData/DonorHistory.model';
import { BeforeQ } from 'src/app/SharingWebData/Ques/BeforeQ.model';



declare const L: any;

//declare let M:any | undefined;

const zone  =
   {
    "type": "FeatureCollection",
    "features": [
      {
        "type": "Feature",
        "properties": {},
        "geometry": {
          "type": "Polygon",
          "coordinates": [
            [
              [
                35.33374786376953,
                32.72158767014057
              ],
              [
                35.238304138183594,
                32.71624397197978
              ],
              [
                35.25358200073242,
                32.65325087996883
              ],
              [
                35.33477783203124,
                32.65700859449493
              ],
              [
                35.33374786376953,
                32.72158767014057
              ]
            ]
          ]
        }
      }
    ]
  }
  const Telaviv =  {
            "type": "FeatureCollection",
            "features": [
              {
                "type": "Feature",
                "properties": {},
                "geometry": {
                  "type": "Point",
                  "coordinates": [
                    34.78988170623779,
                    32.086792391919936
                  ]
                }
              }
            ]
  }
  const Haifa = {
        "type": "FeatureCollection",
        "features": [
          {
            "type": "Feature",
            "properties": {},
            "geometry": {
              "type": "Point",
              "coordinates": [
                34.97840881347656,
                32.812670070909164
              ]
            }
          }
        ]
  }
  const Migdal_Haemek = {
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "type": "Point",
        "coordinates": [
          35.24036407470703,
          32.677095234818616
        ]
      }
    }
  ]
  }
  const afula = {
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "type": "Point",
        "coordinates": [
          35.290489196777344,
          32.61074881226091
        ]
      }
    }
  ]
  }
  const sefad = {
    "type": "FeatureCollection",
    "features": [
      {
        "type": "Feature",
        "properties": {},
        "geometry": {
          "type": "Point",
          "coordinates": [
            35.49339294433594,
            32.966043055036586
          ]
        }
      }
    ]
  }
  const nahreya = {
    "type": "FeatureCollection",
    "features": [
      {
        "type": "Feature",
        "properties": {},
        "geometry": {
          "type": "Point",
          "coordinates": [
            35.09719848632812,
            33.005784383464956
          ]
        }
      }
    ]
  }
  const acre = {
    "type": "FeatureCollection",
    "features": [
      {
        "type": "Feature",
        "properties": {},
        "geometry": {
          "type": "Point",
          "coordinates": [
            35.077972412109375,
            32.930318199070534
          ]
        }
      }
    ]
  }
  const natanya = {
    "type": "FeatureCollection",
    "features": [
      {
        "type": "Feature",
        "properties": {},
        "geometry": {
          "type": "Point",
          "coordinates": [
            34.85755920410156,
            32.327756960342946
          ]
        }
      }
    ]
  }
  const hadera = {
    "type": "FeatureCollection",
    "features": [
      {
        "type": "Feature",
        "properties": {},
        "geometry": {
          "type": "Point",
          "coordinates": [
            34.91729736328125,
            32.43648232473782
          ]
        }
      }
    ]
  }
  const herzilya = {
    "type": "FeatureCollection",
    "features": [
      {
        "type": "Feature",
        "properties": {},
        "geometry": {
          "type": "Point",
          "coordinates": [
            34.84588623046875,
            32.16863792635913
          ]
        }
      }
    ]
  }
  const kfar_saba = {
    "type": "FeatureCollection",
    "features": [
      {
        "type": "Feature",
        "properties": {},
        "geometry": {
          "type": "Point",
          "coordinates": [
            34.90081787109375,
            32.177356033083505
          ]
        }
      }
    ]
  }
  const petahTikva = {
    "type": "FeatureCollection",
    "features": [
      {
        "type": "Feature",
        "properties": {},
        "geometry": {
          "type": "Point",
          "coordinates": [
            34.8760986328125,
            32.09013743090249
          ]
        }
      }
    ]
  }
  const bneiBrak = {
    "type": "FeatureCollection",
    "features": [
      {
        "type": "Feature",
        "properties": {},
        "geometry": {
          "type": "Point",
          "coordinates": [
            34.83215332031249,
            32.088101334800335
          ]
        }
      }
    ]
  }
  const holon = {
    "type": "FeatureCollection",
    "features": [
      {
        "type": "Feature",
        "properties": {},
        "geometry": {
          "type": "Point",
          "coordinates": [
            34.77790832519531,
            32.01972036197235
          ]
        }
      }
    ]
  }
  const BeerSheva = {
    "type": "FeatureCollection",
    "features": [
      {
        "type": "Feature",
        "properties": {},
        "geometry": {
          "type": "Point",
          "coordinates": [
            34.78889465332031,
            31.253900198429022
          ]
        }
      }
    ]
  }
 
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  providers: [WebService]
})
export class SearchComponent implements OnInit
{  
  subscription: Subscription;

  map;
  lat:number;
  lng:number;
  Adress:string;
  Identitiy:any;
  
  AdressFlag = false;
  showAppointment = false;
  ShowQues = false;
  AskBeforQues = false;


  hosx:number;
  hosy:number;
  myAdress:number[];
  _myAdressToCal:number[];
  marker;
  SPOT = [];
  K:number;


  @Output() username:string;
  @Output() password:string;
  @Output() donorNameForHospital:string;
  @Output() DonorUsername:any = [];
  @Output() DonorPassword:any = [];
  @Output() ApointUserName:string;
  public Worktime: string[];
  public days: string[];


  demoNumbers=[];
  
  CloseHospital: HospitalClosest[]=[];
  //OneCloseHospital = new HospitalClosest();

  QuesB: BeforeQ[]=[];
  CurrentQuesB = new BeforeQ();

  @Output() WorkTimeObject = new Date();
  @Output() WorkTimeString:string;


 
constructor(public employeeService: WebService,
            public donorService: WebService,
            public data: DataService){}

            ngOnInit() {

             // this.demoNumbers = [2,4,7,8,1,2,3,4,10,22,1,2]
             // this.demoNumbers.sort((a,b)=>a-b);
             // console.log(this.demoNumbers);
              //console.log(Math.min.apply(null,this.demoNumbers))
              this.Worktime = ["08:00","08:30","09:00","09:30","10:00"
              ,"10:30","11:00","11:30","12:00","12:30","13:00","13:30","14:00","14:30"
              ,"15:00","15:30","16:00","16:30","17:30","18:00"];

              this.days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
              
              this.subscription = this.data.CurrentDName.subscribe(_username => this.username = _username);
              this.subscription = this.data.CurrentUserName.subscribe(mess => this.donorNameForHospital = mess);

              this.resetForm();
              this.refreshEmployeeList();
              this.initmap();
              this.refreshDonorList();
              this.RefreshHospitalCoords();
              this.resetHospitalsCoords();
              this.ApointUserName = this.username;
              this.donorNameForHospital = this.username;
              this.NameForHospital();
              this.InitDonorUser();
              

              
            }

 ShowQuesBefore()
 {
  this.ShowQues = true;
 }
 CloseQuesDonor(){
  this.ShowQues = false;
 }
 ShowAskBeforQuesDialog()
 {
   this.AskBeforQues= true;
 }
 CloseAskBeforeQuesDialog(){
  this.AskBeforQues= false;
 }

 YesOrNoToBool(t?:any){
  if(t)
  {
  
}

     
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
CheckIfValid(){

  let k = this.CurrentQuesB.Answer.length-1;
  console.log("length of CurrentQuesB: "+k)
  if(k==16)
  {   
    for(let i=1;i<this.CurrentQuesB.Answer.length;i++)
  {
    
    if(this.CurrentQuesB.Answer[0]==true && this.CurrentQuesB.Answer[i]==false)
    { 
      this.donorService.getDonors().subscribe(Donors=>{

        for(let i=0;i<Donors.length;i++)
        {
          if(Donors[i].username==this.username &&
             Donors[i].identity==this.Identitiy)
          {
                 Donors[i].Valid = true; 

            this.donorService.putDonor(Donors[i]).subscribe();
          }
        }
      
          })

    }


  }  

  }

}

  NameForHospital(){
    console.log("this.donorNameForHospitalin search nameForHospital():" +this.donorNameForHospital);
    this.data.donorForHospital(this.donorNameForHospital);
  }
Username()
{
  console.log("this.donorNameForHospital username(): "+this.donorNameForHospital);
  this.data.donorUsername(this.ApointUserName);
  this.data.donorPassword(this.password);
}
 
 

  showAppointmentfunc()
{
  this.showAppointment = true;
  
  }
  resetForm(form?: NgForm) {
    if (form)
      form.reset();
    this.employeeService.selectedDonorAppointments = {
      _id: "",
      UserName:"",
      HospitalName: "",
      identity:0,
      age:0,
      Gender:"",
      Time: "",
      Day: "",
      phoneNumber:"",
      Email:"",
      bloodType:"",
      DonateBefore:false,
      Valid:false
    }
  }
  onSubmit(form: NgForm) {
    if (form.value._id == "") {
      form.value.UserName = this.username;
      this.employeeService.postEmployee(form.value).subscribe((res) => {
        this.resetForm(form);
        this.refreshEmployeeList();
       this.NameForHospital();

        alert("Saved successfully on DataBase.."+this.ApointUserName);
       // M.toast({ html: 'Saved successfully', classes: 'rounded' });
      });
    }
    else {
      this.employeeService.putEmployee(form.value).subscribe((res) => {
        this.resetForm(form);
        this.refreshEmployeeList();
        this.NameForHospital();
        alert("Saved successfully on DataBase.."+this.ApointUserName);
        alert("Updated successfully..");
       // M.toast({ html: 'Updated successfully', classes: 'rounded' });
      });
    }
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
       // this.resetForm(form);
     //   M.toast({ html: 'Deleted successfully', classes: 'rounded' });
      });
    }
  }

  /****** init Map ****/
  initmap()
  {
    if(!navigator.geolocation)
    {
      console.log("location is not supported");
    }
    
    navigator.geolocation.getCurrentPosition((position) => {
     const coords = position.coords;
    this.myAdress = [coords.latitude, coords.longitude];
    this._myAdressToCal = [coords.longitude,coords.latitude];
    this.GetHospitalDistanceFromMeDataBase();
    
     console.log(
        `lat:${position.coords.latitude}, lan: ${position.coords.longitude}`
        
      );
     this.map = L.map('map').setView(this.myAdress, 8);
     
   L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiaGFsbHVtaTEiLCJhIjoiY2ttYWpzdHZzMXNmajJ1cDFhYTJldmRqbSJ9.PM8HeJGvUnZisrFwYMWLVQ', {
   attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
   maxZoom: 20,
   id: 'mapbox/streets-v11',
   tileSize: 512,
   zoomOffset: -1,
   accessToken: 'your.mapbox.access.token'
}).addTo(this.map);

    });
     
  }
  refreshDonorList() {
    this.donorService.getDonorList().subscribe((res) => {
      this.donorService.donors = res as Donor[];
    });
  }
 
  watchPosition()
  {
    let deslat = 0;
    let deslon = 0;
    let id = navigator.geolocation.watchPosition((position) => {
      console.log(
        `lat:${position.coords.latitude}, lan: ${position.coords.longitude}` 
      );
      
        if(position.coords.latitude === deslat)
        {

            navigator.geolocation.clearWatch(id);
        }
      },
      (err) => {
        console.log(err);
      },
      {
        enableHighAccuracy:true,
        timeout:5000,
        maximumAge:0
      })
  }
  
  getDistance(Source:any,target:any)//([Lat1,lng1],[lat2,lng2]) -> ([Lng1,lat1],[lng2,lat2])
  {                                 //([S[0],S[1]],[t[0],t[1]]) -> ([s[1],s[0]],[t[1],t[0]])
    const R = 6371e3; // metres       ([s[1],s[0]],[t[1],t[0]])
    const φ1 = Source[1] * Math.PI/180; // φ, λ in radians
    const φ2 = target[1] * Math.PI/180;
    const Δφ = (target[1]-Source[1]) * Math.PI/180;
    const Δλ = (target[0]-Source[0]) * Math.PI/180;

    const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
          Math.cos(φ1) * Math.cos(φ2) *
          Math.sin(Δλ/2) * Math.sin(Δλ/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    const d = (R * c)/1000; // in metres
    console.log("distance equation: "+ d);
    return d;
    

  }
  YourPoint()
   {
    this.SPOT = [];
    this.K = 0;
      if(this.marker !=undefined)
      {
        this.map.removeLayer(this.marker);
       
      }
     this.marker = L.marker(this.myAdress).addTo(this.map);
     this.marker.bindPopup('<b> Hello Iam Here </b>').openPopup();
  
      this.GetShortestDistance();

      
    let popup = L.popup()
   .setLatLng(this.myAdress)
   .setContent("Hello Iam Here.")
   .openOn(this.map);
     
  }
  CityAdress(adress:string)
  {
    
   let aviv = "tel aviv";
   let ha = "haifa";
   let mg = "migdal haemek";
   let b_r = "bnei brak";
   let nh = "nahreya";
   let pk = "petah tikva";
   let ks = "kfar saba";
   let hr = "hadera";

   if(this.Adress === aviv)   //tel-aviv
   {
    this.SPOT = [];
    this.K = 0;
     if(this.marker !=undefined)
     {
       this.map.removeLayer(this.marker);
      
      
     }
     
    this.marker = L.geoJSON(Telaviv).addTo(this.map);
    this.SPOT.push("Achilov");
    this.SPOT.push("Assuta");
    this.SPOT.push("Sheeba Hospital.");
    this.K =this.SPOT.length
   }
   if(this.Adress === hr)   //hadera
    {
      this.SPOT = [];
    this.K = 0;
      if(this.marker !=undefined)
      {
        this.map.removeLayer(this.marker);
      }
      this.SPOT.push("Halil-Yaffe Hospital.");
    this.K =this.SPOT.length
     this.marker = L.geoJSON(hadera).addTo(this.map);
    }

   if(this.Adress === ks)   //kfar - saba
    {
      this.SPOT = [];
    this.K = 0;
      if(this.marker !=undefined)
      {
        this.map.removeLayer(this.marker);
      }
      this.SPOT.push("Beilinson Hospital.");
    this.K =this.SPOT.length
     this.marker = L.geoJSON(kfar_saba).addTo(this.map);
    }
   if(this.Adress === pk) //petah tikva
    {
      this.SPOT = [];
    this.K = 0;
      if(this.marker !=undefined)
      {
        this.map.removeLayer(this.marker);
      }
      this.SPOT.push("Mada Station - Adress: hamekabim 30.");
      this.SPOT.push("Beilinson Hospital.");
      
      this.K =this.SPOT.length
     this.marker = L.geoJSON(petahTikva).addTo(this.map);
    }
   if(this.Adress === nh)  //nahreya
    {
      this.SPOT = [];
    this.K = 0;
      if(this.marker !=undefined)
      {
        this.map.removeLayer(this.marker);
      }
      this.SPOT.push("Nahreya Hospital.");
      this.K =this.SPOT.length

     this.marker = L.geoJSON(nahreya).addTo(this.map);
    }
   if(this.Adress === b_r)
    {
      this.SPOT = [];
    this.K = 0;
      if(this.marker !=undefined)
      {
        this.map.removeLayer(this.marker);
      }
      this.SPOT.push("Beilinson Hospital.");
      
      this.K =this.SPOT.length
     this.marker = L.geoJSON(bneiBrak).addTo(this.map);
    }
     if(this.Adress === ha)
    {
      this.SPOT = [];
    this.K = 0;
      
      if(this.marker !=undefined)
      {
        this.map.removeLayer(this.marker);
      }
      this.SPOT.push("Rambam Hospital.");
      this.SPOT.push("Mada Station - Adress: Yetsak Sadee 10")
      this.K =this.SPOT.length
     this.marker = L.geoJSON(Haifa).addTo(this.map);
    }
     if(this.Adress ===mg)
    {
      this.SPOT = [];
    this.K = 0;
      if(this.marker !=undefined)
      {
        this.map.removeLayer(this.marker);
      }
      this.SPOT.push("EMMS Hospital - nazareth");
      
      this.K =this.SPOT.length
     this.marker = L.geoJSON(Migdal_Haemek).addTo(this.map); 
      
    }


  }
 
  info = {
    _id:"",
    type:"Hospital",
    HospitalName:"Achilov",
    coordinates:[34.7901177406311,32.08022921509563]
  }
  resetHospitalsCoords()
  {
    this.donorService.selectedHospitalCoords ={
      _id:"",
      type:"",
      HospitalName:"",
      coordinates:[0,0]
    }
  }
  RefreshHospitalCoords(){
    this.donorService.getHospitalsCoordsList().subscribe(res => {
      this.donorService.HospitalsCoords = res as HospitalCoords[];
    })
  }
  SendAnAdressCoordsToDataBase(form: NgForm)
  {
    this.donorService.selectedHospitalCoords = {
      _id:"",
      type:"Hospital",
      HospitalName:"French Hospital Nazareth",
      coordinates:[32.70013808993511, 35.29346172068113]
  
    }
    
    form.value.type = "Hospital";
    this.donorService.postHospitalsCoords(form.value).subscribe()
  }
  GetHospitalDistanceFromMeDataBase()
  {
    
      this.donorService.getHospitalsCoords_s().subscribe(All=>{
       
      /*this._myAdressToCal = [
          34.80297088623047,
          32.10715160278976
        ]*/
          for(let i=0;i<All.length;i++)
          {

          
          All[i].distance = this.getDistance(this._myAdressToCal,All[i].coordinates);
          this.donorService.putHospitalsCoords(All[i]).subscribe();
          

          }

          
          
        
      })
      
  }
  GetShortestDistance()
  {
    this.demoNumbers = [];
    this.SPOT = [];
    this.K = 0;
    let str:string;
      this.donorService.getHospitalsCoords_s().subscribe(All=>{
        
        for(let i=0;i<All.length;i++)
        {
        this.demoNumbers.push(All[i].distance);
        
        }
        console.log(this.demoNumbers);
        let dis = Math.min.apply(null,this.demoNumbers);
         str= All.find(d=>d.distance==dis).HospitalName;

         
          this.SPOT.push(str);
          this.K =this.SPOT.length;
      })

  }
}
