import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'BloodManagement',
  templateUrl: './blood-management.component.html',
  styleUrls: ['./blood-management.component.scss']
})
export class BloodManagementComponent implements OnInit {

  types:boolean;

    A:number;
    B:number;
    AB:number;
    O:number;
    AMinus:number;
    BMinus:number;
    ABMinus:number;
    OMinus:number;


    A1:number;
    B1:number;
    AB1:number;
    O1:number;
    AMinus1:number;
    BMinus1:number;
    ABMinus1:number;
    OMinus1:number;


    A2:number;
    B2:number;
    AB2:number;
    O2:number;
    AMinus2:number;
    BMinus2:number;
    ABMinus2:number;
    OMinus2:number;


    A3:number;
    B3:number;
    AB3:number;
    O3:number;
    AMinus3:number;
    BMinus3:number;
    ABMinus3:number;
    OMinus3:number;


    A14:number;
    B14:number;
    AB14:number;
    O14:number;
    AMinus14:number;
    BMinus14:number;
    ABMinus14:number;
    OMinus14:number;


    A25:number;
    B25:number;
    AB25:number;
    O25:number;
    AMinus25:number;
    BMinus25:number;
    ABMinus25:number;
    OMinus25:number;


   




  constructor() { }

  ngOnInit(): void {
    this.types = false;

    this.SectionsReq();
  }

  showTypes()
  {
    this.types = true;
  }

  SectionsReq(){


        this.A = Math.floor(Math.random() * (Math.floor(5) -Math.ceil(0)  + 1)) + Math.ceil(0);
        this.B = Math.floor(Math.random() * (Math.floor(5) -Math.ceil(0)  + 1)) + Math.ceil(0);
        this.AB = Math.floor(Math.random() * (Math.floor(5) -Math.ceil(0)  + 1)) + Math.ceil(0);
        this.O = Math.floor(Math.random() * (Math.floor(5) -Math.ceil(0)  + 1)) + Math.ceil(0);
        this.AMinus = Math.floor(Math.random() * (Math.floor(5) -Math.ceil(0)  + 1)) + Math.ceil(0);
        this.BMinus = Math.floor(Math.random() * (Math.floor(5) -Math.ceil(0)  + 1)) + Math.ceil(0);
        this.ABMinus = Math.floor(Math.random() * (Math.floor(5) -Math.ceil(0)  + 1)) + Math.ceil(0);
        this.OMinus= Math.floor(Math.random() * (Math.floor(5) -Math.ceil(0)  + 1)) + Math.ceil(0);

        this.A1 = Math.floor(Math.random() * (Math.floor(5) -Math.ceil(0)  + 1)) + Math.ceil(0);
        this.B1 = Math.floor(Math.random() * (Math.floor(5) -Math.ceil(0)  + 1)) + Math.ceil(0);
        this.AB1 = Math.floor(Math.random() * (Math.floor(5) -Math.ceil(0)  + 1)) + Math.ceil(0);
        this.O1 = Math.floor(Math.random() * (Math.floor(5) -Math.ceil(0)  + 1)) + Math.ceil(0);
        this.AMinus1 = Math.floor(Math.random() * (Math.floor(5) -Math.ceil(0)  + 1)) + Math.ceil(0);
        this.BMinus1 = Math.floor(Math.random() * (Math.floor(5) -Math.ceil(0)  + 1)) + Math.ceil(0);
        this.ABMinus1 = Math.floor(Math.random() * (Math.floor(5) -Math.ceil(0)  + 1)) + Math.ceil(0);
        this.OMinus1= Math.floor(Math.random() * (Math.floor(5) -Math.ceil(0)  + 1)) + Math.ceil(0);

        this.A2 = Math.floor(Math.random() * (Math.floor(5) -Math.ceil(0)  + 1)) + Math.ceil(0);
        this.B2 = Math.floor(Math.random() * (Math.floor(5) -Math.ceil(0)  + 1)) + Math.ceil(0);
        this.AB2 = Math.floor(Math.random() * (Math.floor(5) -Math.ceil(0)  + 1)) + Math.ceil(0);
        this.O2 = Math.floor(Math.random() * (Math.floor(5) -Math.ceil(0)  + 1)) + Math.ceil(0);
        this.AMinus2 = Math.floor(Math.random() * (Math.floor(5) -Math.ceil(0)  + 1)) + Math.ceil(0);
        this.BMinus2 = Math.floor(Math.random() * (Math.floor(5) -Math.ceil(0)  + 1)) + Math.ceil(0);
        this.ABMinus2 = Math.floor(Math.random() * (Math.floor(5) -Math.ceil(0)  + 1)) + Math.ceil(0);
        this.OMinus2= Math.floor(Math.random() * (Math.floor(5) -Math.ceil(0)  + 1)) + Math.ceil(0);

        this.A3 = Math.floor(Math.random() * (Math.floor(5) -Math.ceil(0)  + 1)) + Math.ceil(0);
        this.B3 = Math.floor(Math.random() * (Math.floor(5) -Math.ceil(0)  + 1)) + Math.ceil(0);
        this.AB3 = Math.floor(Math.random() * (Math.floor(5) -Math.ceil(0)  + 1)) + Math.ceil(0);
        this.O3 = Math.floor(Math.random() * (Math.floor(5) -Math.ceil(0)  + 1)) + Math.ceil(0);
        this.AMinus3 = Math.floor(Math.random() * (Math.floor(5) -Math.ceil(0)  + 1)) + Math.ceil(0);
        this.BMinus3 = Math.floor(Math.random() * (Math.floor(5) -Math.ceil(0)  + 1)) + Math.ceil(0);
        this.ABMinus3 = Math.floor(Math.random() * (Math.floor(5) -Math.ceil(0)  + 1)) + Math.ceil(0);
        this.OMinus3= Math.floor(Math.random() * (Math.floor(5) -Math.ceil(0)  + 1)) + Math.ceil(0);

        this.A14 = Math.floor(Math.random() * (Math.floor(5) -Math.ceil(0)  + 1)) + Math.ceil(0);
        this.B14 = Math.floor(Math.random() * (Math.floor(5) -Math.ceil(0)  + 1)) + Math.ceil(0);
        this.AB14 = Math.floor(Math.random() * (Math.floor(5) -Math.ceil(0)  + 1)) + Math.ceil(0);
        this.O14 = Math.floor(Math.random() * (Math.floor(5) -Math.ceil(0)  + 1)) + Math.ceil(0);
        this.AMinus14 = Math.floor(Math.random() * (Math.floor(5) -Math.ceil(0)  + 1)) + Math.ceil(0);
        this.BMinus14 = Math.floor(Math.random() * (Math.floor(5) -Math.ceil(0)  + 1)) + Math.ceil(0);
        this.ABMinus14 = Math.floor(Math.random() * (Math.floor(5) -Math.ceil(0)  + 1)) + Math.ceil(0);
        this.OMinus14= Math.floor(Math.random() * (Math.floor(5) -Math.ceil(0)  + 1)) + Math.ceil(0);

        this.A25 = Math.floor(Math.random() * (Math.floor(5) -Math.ceil(0)  + 1)) + Math.ceil(0);
        this.B25 = Math.floor(Math.random() * (Math.floor(5) -Math.ceil(0)  + 1)) + Math.ceil(0);
        this.AB25 = Math.floor(Math.random() * (Math.floor(5) -Math.ceil(0)  + 1)) + Math.ceil(0);
        this.O25 = Math.floor(Math.random() * (Math.floor(5) -Math.ceil(0)  + 1)) + Math.ceil(0);
        this.AMinus25 = Math.floor(Math.random() * (Math.floor(5) -Math.ceil(0)  + 1)) + Math.ceil(0);
        this.BMinus25 = Math.floor(Math.random() * (Math.floor(5) -Math.ceil(0)  + 1)) + Math.ceil(0);
        this.ABMinus25 = Math.floor(Math.random() * (Math.floor(5) -Math.ceil(0)  + 1)) + Math.ceil(0);
        this.OMinus25= Math.floor(Math.random() * (Math.floor(5) -Math.ceil(0)  + 1)) + Math.ceil(0);

  } 


}
