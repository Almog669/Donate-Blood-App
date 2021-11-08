import { Component, OnInit, Output } from '@angular/core';
import { WebService } from 'src/app/SharingWebData/web.service';
import { Stock } from 'src/app/SharingWebData/stock.model';
import { NgForm} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {NewStock} from 'src/app/SharingWebData/newStock.model'
import { Subscription } from 'rxjs';
import { DataService } from 'src/app/data.service';
import { DynamicStocktaking } from 'src/app/SharingWebData/DynamicStocktaking.model';
import { BeilinsonStock } from 'src/app/SharingWebData/BeilinsonStock.model';
import { DynamicHospitalStock } from 'src/app/SharingWebData/DynamicHospitalStock.model';


@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.scss'],
  providers: [WebService]
})
export class StockComponent implements OnInit {

  currentStock : Stock = {
    A:0,
    B:0,
    AB:0,
    O:0
  };

  addStock:Stock = {
    A:0,
    B:0,
    AB:0,
    O:0
  };
  _newStock: Stock = {

    A:0,
    B:0,
    AB:0,
    O:0
  };
  data01 : NewStock = {
    A: 0 ,
    B: 0,
    AB : 0,
    O: 0
};
data02 : NewStock = {
  A: this.currentStock.A,
  B: 0,
  AB : 0,
  O: 0
};

@Output() stockA:string;
@Output() stockB:string;
@Output() stockAB:string;
@Output() stockO:string;
@Output() stockAMinus:string;
@Output() stockBMinus:string;
@Output() stockABMinus:string;
@Output() stockOMinus:string;
@Output() HosName:string;
@Output() stockDate:string;
@Output() stockValidate:string;

@Output() showAchilovForm=false;
@Output() showBeilinsonForm = false;
@Output() DynamicForm=false; 

sub: Subscription;

HospitaNameObserve:string;
 
amount:boolean;
@Output() message = "";
@Output() now:any;
@Output() hello:any;
update_S:boolean;


HospitalStock?:DynamicStocktaking[]=[];
selectedHospitalStock?:DynamicStocktaking;
    
 


  constructor(public stockService: WebService,
    public localData: DataService,
    private route: ActivatedRoute) { 
    setInterval(() => {
      this.now = new Date();
    }, 1);
  }

  ngOnInit(): void {
    this.update_S = false;
    this.amount = false;
    this.sub = this.localData.CurrentHospitalName.subscribe(_HosName => { this.HospitaNameObserve = _HosName});
    this.ChangeFormByHospital();
    this.refreshHospitalStock();
    this.resetForm();
    this.ResetBeilisonStockForm();
    this.resetDynamicHospitalStock();
    this.refreshStockList();
    this.RefreshBeilinsonStockList();
    this.RefreshDynamicStock();
    this. initStockByHospital();
    
   
  }
  
  ChangeFormByHospital()
  {
    
    
      this.HosName = `stockService.selectedDynamicHospitalStock.HospitalName`
      this.stockA = `stockService.selectedDynamicHospitalStock.A`;
      this.stockB = `stockService.selectedDynamicHospitalStock.B`;
      this.stockAB = `stockService.selectedDynamicHospitalStock.AB`;
      this.stockO = `stockService.selectedDynamicHospitalStock.O`;
      this.stockAMinus = `stockService.selectedDynamicHospitalStock.Am`;
      this.stockBMinus = `stockService.selectedDynamicHospitalStock.Bm`;
      this.stockABMinus = `stockService.selectedDynamicHospitalStock.ABm`;
      this.stockOMinus = `stockService.selectedDynamicHospitalStock.Om`;
      this.stockValidate = `stockService.selectedDynamicHospitalStock.stock`;
      this.stockDate = `stockService.selectedDynamicHospitalStock.Date`;
    
    }
    onSubmit(form: NgForm)
  {
    
    
    console.log("Dynamic");
                form.value.HospitalName = this.HospitaNameObserve;
                form.value.stock = true;
                form.value._id = this.HospitalStock[0]._id;
        this.stockService.putDynamicHospitalStock(form.value).subscribe((res) => {
        this.RefreshDynamicStock();
        this.initStockByHospital();
        alert(`Stock Updated in ${this.HospitaNameObserve} Hospital..`);
       
      });
      
  }


  RefreshDynamicStock()
  {console.log("RefreshDynamic");
    this.stockService.getDynamicHospitalStockList().subscribe(res=>{
      this.stockService.DynamicHospitalStocks = res as DynamicHospitalStock[];
    })
  }
  refreshStockList(): void {
    console.log("RefreshAchilov");
    this.stockService.getStockList().subscribe((res) => {
      this.stockService.Achilov_stocks = res as Stock[];
    });
   
  }
  RefreshBeilinsonStockList(){

    console.log("RefreshBeilinson");
    this.stockService.getBeilinsonStockList().subscribe(res =>{
      this.stockService.BeilinsonStocks = res as BeilinsonStock[];
    })
  }

  ResetBeilisonStockForm(form? :NgForm)
  {if(form)
    form.reset();
    this.stockService.selectedBeilinson = {
      _id:"",
      A:0,
      B:0,
      AB:0,
      O:0,
      Am:0,
      Bm:0,
      ABm:0,
      Om:0,
      Date:""
    }
  }
  resetDynamicHospitalStock(form?:NgForm)
  {
    if(form)
    form.reset();
    this.stockService.selectedDynamicHospital = {
      _id: "",
        HospitalName:"",
        A:0,
        B:0,
        AB:0,
        O:0,
        Am:0,
        Bm:0,
        ABm:0,
        Om:0,
        Date:""
    }

  }
    resetForm(form?: NgForm) {
      if (form)
        form.reset();
      this.stockService.selectedAchilov = {
        _id: "",
        HospitalName:"",
        A:0,
        B:0,
        AB:0,
        O:0,
        Am:0,
        Bm:0,
        ABm:0,
        Om:0,
        Date:""
      }
    }
    
    refreshHospitalStock(){
      if(this.HospitalStock!= undefined
        && this.HospitalStock.length>0)
        {
          delete this.HospitalStock;
        }
    }
    initStockByHospital()
    {
      
          this.showAchilovForm=false;
          this.showBeilinsonForm = false;
          this.DynamicForm=true; 
      this.stockService.getDynamicHospitalStocks().subscribe(allStocks=>{
       this.HospitalStock[0] = allStocks.find(s=>s.stock==true && s.HospitalName == this.HospitaNameObserve);
          
       })
      
    }
    
    onEdit(id:string) {

     
        if(this.stockService.DynamicHospitalStocks.find(s=>s._id)._id == id)
        { console.log("this.stockService.DynamicHospitalStocks.find(s=>s._id)"+this.stockService.DynamicHospitalStocks.find(s=>s._id)) 
          this.stockService.selectedDynamicHospitalStock = this.stockService.DynamicHospitalStocks.find(s=>s._id)
        }
  
    }
    onDelete(_id: string,) {
      if (confirm('Are you sure to delete this record ?') == true) {
        this.stockService.deleteStock(_id).subscribe((res) => {
          this.refreshStockList();
         
        });
      }
    }

  TypeAmount()
  {
    this.amount = true;
  }

}
  

