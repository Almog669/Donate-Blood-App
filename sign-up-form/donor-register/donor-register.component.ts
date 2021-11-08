import { Component, OnInit, Output } from '@angular/core';
import {User} from '../../DUser';
import { DataService } from 'src/app/data.service';
import { Subscription } from 'rxjs';
import { WebService } from 'src/app/SharingWebData/web.service';
import { Donor } from 'src/app/SharingWebData/donor.model';
import { NgForm} from '@angular/forms';




@Component({
  selector: 'app-donor-register',
  templateUrl: './donor-register.component.html',
  styleUrls: ['./donor-register.component.scss'],
  providers: [WebService]
})
export class DonorRegisterComponent implements OnInit {

  //Property for the gender
  public gender: string[];

  //property for the blood type user.
  public bloodType: string[];

  public age:number[]=[];

  // property to string output
  @Output() DataBaseMsg: string;

  @Output() DonorAdress:string;
  
  //Property for the user
  public user:User;

  subscription: Subscription;

  _PlaceName:string;

  HideMap:boolean;


  constructor(private data: DataService,
              public donorService: WebService){}

  ngOnInit()
   { 
    
      this.HideMap = false;
      this.gender =  ['Male', 'Female', 'Others'];
      this.bloodType = ["Don't know","A","B","AB","O","A-","B-","AB-","O-"];
      this.AgeMethod();

      this.CheckAdress();
      
  //Create a new user object
  this.user = new User({email:"", password: { pwd: "" , confirmPwd: ""},
                        gender: this.gender[0],bloodType:this.bloodType[0], terms: false});

  this.subscription = this.data.CurrentUser.subscribe(message => this.user = message)

  this.resetForm();
  this.refreshDonorList();
}
CheckAdress(){
  const map = new google.maps.Map(
    document.getElementById("map") as HTMLElement,
    {
      center: { lat: 40.749933, lng: -73.98633 },
      zoom: 13,
    }
  );
  const card = document.getElementById("pac-card") as HTMLElement;
  const input = document.getElementById("pac-input") as HTMLInputElement;
  const biasInputElement = document.getElementById(
    "use-location-bias"
  ) as HTMLInputElement;
  const strictBoundsInputElement = document.getElementById(
    "use-strict-bounds"
  ) as HTMLInputElement;
  const options = {
    componentRestrictions: { country: "il" },
    fields: ["formatted_address", "geometry", "name"],
    origin: map.getCenter(),
    strictBounds: false,
    types: [],
  } as google.maps.places.AutocompleteOptions;

  map.controls[google.maps.ControlPosition.TOP_RIGHT].push(card);

  const autocomplete = new google.maps.places.Autocomplete(input, options);
  
  autocomplete.bindTo("bounds", map);

  const infowindow = new google.maps.InfoWindow();
  
  const infowindowContent = document.getElementById(
    "infowindow-content"
  ) as HTMLElement;
  infowindow.setContent(infowindowContent);


  

  
  const marker = new google.maps.Marker({
    map,
    anchorPoint: new google.maps.Point(0, -29),
  });

  autocomplete.addListener("place_changed", () => {
    infowindow.close();
    marker.setVisible(false);
    const place = autocomplete.getPlace();

    

    if (!place.geometry || !place.geometry.location) {
      // User entered the name of a Place that was not suggested and
      // pressed the Enter key, or the Place Details request failed.
      window.alert("No details available for input: '" + place.name + "'");
      return;
    }

    // If the place has a geometry, then present it on a map.
    if (place.geometry.viewport) {
      map.fitBounds(place.geometry.viewport);
    } else {
      map.setCenter(place.geometry.location);
      map.setZoom(17);
    }
    marker.setPosition(place.geometry.location);
    marker.setVisible(true);

    

      this._PlaceName = place.formatted_address;

    infowindowContent.children["place-name"].textContent = place.name;
    infowindowContent.children["place-address"].textContent =
      place.formatted_address;
    infowindow.open(map, marker);
  });

 

  

}
AgeMethod(){
 for(let i=0;i<=48;i++)
 {
   this.age[i] = i+17;
 }
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
      form.value.Adress = this._PlaceName;
      this.donorService.postDonor(form.value).subscribe((res) => {
      this.resetForm(form);
      this.refreshDonorList();
      //alert("Saved successfully on DataBase..");
      this.DataBaseMsg = "Saved successfully on DataBase..Press Back button please.";
     // M.toast({ html: 'Saved successfully', classes: 'rounded' });
    });
  }
  else {
    this.donorService.putDonor(form.value).subscribe((res) => {
      this.resetForm(form);
      this.refreshDonorList();
      alert("Updated successfully..");
     // M.toast({ html: 'Updated successfully', classes: 'rounded' });
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
     // this.resetForm(form);
   //   M.toast({ html: 'Deleted successfully', classes: 'rounded' });
    });
  }
}

 onFormSubmit({ value, valid}: { value: User, valid: boolean }) {
    this.user = value;
    this.data.UserToSingin(this.user);
    

  }

  
  

}
