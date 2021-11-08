import { Component, OnInit, Output } from '@angular/core';
import {Subscription} from "rxjs"
import { DataService } from '../data.service';
@Component({
  selector: 'app-hospital-page',
  templateUrl: './hospital-page.component.html',
  styleUrls: ['./hospital-page.component.scss']
})
export class HospitalPageComponent implements OnInit {

  sub: Subscription;
  @Output() HospitaNameObserve:string;
  
  constructor(public data: DataService) { }

  ngOnInit(): void {
    this.sub = this.data.CurrentHospitalName.subscribe(_HosName => { this.HospitaNameObserve = _HosName});

    this.isShow = true;
  }
  isShow:boolean;

  toggle(){
    this.isShow = false;
  }

}
