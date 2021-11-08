
import { Component, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataService } from 'src/app/data.service';
import { DonorsTable } from 'src/app/SharingWebData/EmergencyData/EmergencyData.model';
import { HospitalCoords } from 'src/app/SharingWebData/HospitalsOnMap/HospitalsCoords.model';
import { WebService } from 'src/app/SharingWebData/web.service';

@Component({
  selector: 'app-emergency',
  templateUrl: './emergency.component.html',
  styleUrls: ['./emergency.component.scss'],
  providers: [WebService]
})


export class EmergencyComponent implements OnInit{

  sub:Subscription;

  HospitalCoordinates:any;
  FormattedCordinates:any;

  HospitalNameObserve:string;
  FormattedHospitalName:string;

  _EmergencyData = new DonorsTable('',0,'',0,0,'',0,'',0,0,0);

 All_emergencyData: DonorsTable[]=[];

  /*All_emergencyData: DonorsTable[] = [
    {id: 1, name: 'David',address:'Hovevei Tsiyon St 324, Yeruham, Israel',questioner:1,age:48,distance:"",duration:"",smoking: 0,duration_v:0,score:0, distance_v:0},
    {id: 2, name: 'Billy',address:'',questioner:0,age:18,distance:"",duration:"", smoking: 1,duration_v:0,score:0,distance_v:0},
    {id: 3, name: 'Sally',address:'',questioner:1,age:25,distance:"",duration:"", smoking: 0,duration_v:0,score:0,distance_v:0},
    {id: 4, name: 'Rotinger',address:'',questioner:0,age:28,distance:"",duration:"", smoking: 1,duration_v:0,score:0,distance_v:0},
    {id: 5, name: 'Bavis',address:'',questioner:1,age:15,distance:"",duration:"", smoking: 0,duration_v:0,score:0,distance_v:0},
    {id: 6, name: 'yoni',address:'',questioner:1,age:22,distance:"",duration:"", smoking: 0,duration_v:0,score:0,distance_v:0},
  ];*/

  getDonorDetails()
  { 
    
      this.Service.getDonors().subscribe(AllDonors=>{
      this.Service.getDonorHistory_s().subscribe(DonorsHistory=>{

      
      for(let i=0; i<AllDonors.length;i++)
      { for(let j=0;j<DonorsHistory.length;j++)
        {
          if(DonorsHistory[j].identity==AllDonors[i].identity)
          {
      
       this._EmergencyData = new DonorsTable(AllDonors[i].username,
                                             AllDonors[i].identity,
                                             AllDonors[i].Adress,
                                              0,0,"",0,"",0,0,0)

        this.All_emergencyData.push(this._EmergencyData);
       }
           }
        }
        this._distnace(this.All_emergencyData);
      }) 
      
    })
    
    
  }

  constructor( public Service:WebService,
               public data: DataService){

  }

  ngOnInit(): void {

    this.sub = this.data.CurrentHospitalName.subscribe(_HosName => { 
      this.HospitalNameObserve = _HosName; });

      this.FormattedHospitalName = `${this.HospitalNameObserve} Hospital`;

      this.getDonorDetails();

    this.RefreshHospitalCoordsList();
 // this.GetHospitalCoords();
  
  }

  RefreshHospitalCoordsList()
  {
    this.Service.getHospitalsCoordsList().subscribe(res=>{
      this.Service.HospitalsCoords = res as HospitalCoords[];
    })
  }

  GetHospitalCoords()
  {
    this.Service.getHospitalsCoords_s().subscribe(Coords=>{
     this.HospitalCoordinates = Coords.find(s=>s.HospitalName == this.HospitalNameObserve ).coordinates;
     console.log("HospitalCoordinates: "+ this.HospitalCoordinates);
     console.log("HospitalCoordinates0: "+ this.HospitalCoordinates[0]);
     console.log("HospitalCoordinates1: "+ this.HospitalCoordinates[1]);
     this.FormattedCordinates = [this.HospitalCoordinates[1],this.HospitalCoordinates[0]]



    })
  }
 

  _distnace(data: DonorsTable[] ) {
    
    const service = new google.maps.DistanceMatrixService(); // instantiate Distance Matrix service
    const MAX_Time = 86400;
    const MAX_age = 65;
    const MAX_disntance = 482700;
    for(let DonorsTableItem  of data)
    {
      const matrixOptions = {
        origins: [DonorsTableItem.address], // technician locations
        destinations: [this.FormattedHospitalName], // customer address
        travelMode: google.maps.TravelMode.DRIVING,
        unitSystem: google.maps.UnitSystem.IMPERIAL
      };
      // Call Distance Matrix service
     // let k = matrixOptions.destinations.length;
     // console.log("k: "+k)

      if(matrixOptions.destinations[this.FormattedHospitalName]==undefined)
      { this.FormattedHospitalName= `${this.HospitalNameObserve} Medical Center`;
        matrixOptions.destinations[this.FormattedHospitalName];
      }
      
      service.getDistanceMatrix(matrixOptions, callback);
      let address : string;
      // Callback function used to process Distance Matrix response
      function callback(response: any, status: string) {
        if (status !== "OK") {
          alert("Error with distance matrix");
          return;
        }
        else {
          const originList = response.originAddresses;
        const destinationList = response.destinationAddresses;
        for (let i = 0; i < originList.length; i++) {
          const results = response.rows[i].elements;
          for (let j = 0; j < results.length; j++) {
            { addres: destinationList[j] }
            console.log(results[j].duration);
            console.log(results[j].distance);
            console.log(originList[j]);
           DonorsTableItem.distance=results[j].distance.text;
           DonorsTableItem.duration=results[j].duration.text;
           DonorsTableItem.duration_v=results[j].duration.value;
           DonorsTableItem.distance_v=results[j].distance.value;
           console.log(DonorsTableItem.duration_v);
           DonorsTableItem.score=(((100-((DonorsTableItem.duration_v/MAX_Time)*100))*0.5) + ((DonorsTableItem.questioner*100)*0.1))+(((100-(DonorsTableItem.age/MAX_age)*100)*(0.1))+((100-((DonorsTableItem.distance_v/MAX_disntance)*100))*0.3));
           console.log((((100-(DonorsTableItem.age/MAX_age)*100)*(0.3))));
           console.log(DonorsTableItem.duration_v);
          } 
        }   
      }
    }
     // DonorsTableItem.score=((100-(DonorsTableItem.duration_v/MAX_Time*100))*0.3)/*+((1/DonorsTableItem.age)*(0.2))+((DonorsTableItem.questioner)*(0.3))+((DonorsTableItem.smoking)*(0.2))*/;
      //console.log(DonorsTableItem.duration_v);
  }

  }

}