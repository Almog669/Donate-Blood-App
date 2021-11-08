import { Component, OnInit, Output } from '@angular/core';
import { WebService } from 'src/app/SharingWebData/web.service';
import { Stock } from 'src/app/SharingWebData/stock.model';
import {FormArray, FormBuilder, NgForm, Validators} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {NewStock} from 'src/app/SharingWebData/newStock.model'
import { Subscription } from 'rxjs';
import { DataService } from 'src/app/data.service';
import {AchilovStock} from 'src/app/SharingWebData/AchilovStock.model'
import { BeilinsonOrders } from 'src/app/SharingWebData/BeilinsonOrders';
import { Messages } from 'src/app/SharingWebData/Messages.model';
import { DynamicModel} from 'src/app/SharingWebData/Dynamic.model';
import { DynamicHospital } from 'src/app/SharingWebData/DynamicHospital.model';
import { DynamicHospitalStock } from 'src/app/SharingWebData/DynamicHospitalStock.model';
import { OrdersAccepted } from 'src/app/SharingWebData/OrdersAccepted.model';
import { StaticOrdersAccepted } from 'src/app/SharingWebData/StaticOrdersAccepted';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
  providers: [WebService]
})
export class OrdersComponent implements OnInit {

  @Output() OrderSent:boolean;
  @Output() OrderArrived:boolean;
  @Output() OrderDenied:boolean;
  @Output() OrderInProcess:boolean;
  @Output() OrderShipped:boolean;

  //Date to DataBase.
@Output() todayString : string = new Date().toDateString();
@Output() Hour:string = new Date().getHours().toLocaleString();
@Output() Sec:string = new Date().getSeconds().toLocaleString();
@Output() Min:string = new Date().getMinutes().toLocaleString();
@Output() time:string = this.todayString+" - "+ this.Hour +":"+this.Min+":"+this.Sec;

  sub:Subscription;
  @Output() NotEnoughInMadaStock:boolean;
  @Output() OrderAcceptedInMada:boolean;
  @Output() OrderInProcessinMada:boolean;
  @Output() OrderInWay:boolean;



  @Output() HospitaNameObserve:string;
  @Output() HospitalNameDisplay:string;
  @Output() AchilovFormOrders:boolean;
  @Output() BeilinsonFormOrders:boolean;
  @Output() DynamicFormOrders:boolean;

  //Form request order Parameters.
  
  @Output() stockA:any;
  @Output() stockB:any;
  @Output() stockAB:any;
  @Output() stockO:any;
  @Output() stockAMinus:any;
  @Output() stockBMinus:any;
  @Output() stockABMinus:any;
  @Output() stockOMinus:any;
  @Output() stockValidate:any;
  @Output() stockDate:any;
  @Output() HosName:any;

  @Output() UpstockA:any;
  @Output() UpstockB:any;
  @Output() UpstockAB:any;
  @Output() UpstockO:any;
  

  //Receive order Parametrs from Mada.

  @Output() Hospital:any;



    @Output() CurrentA:number = 0;
    @Output() CurrentB:number = 0;
    @Output() CurrentAB:number = 0;
    @Output() CurrentO:number = 0;

    @Output() NewA:number = 0;
    @Output() NewB:number = 0;
    @Output() NewAB:number = 0;
    @Output() NewO:number = 0;



  OrderFromMada:boolean;
  receiveAnOrder:boolean;
  ordersAccepted:boolean;
  DialogNewOrdersActivate:boolean;


  amount:boolean;
  @Output() message = "";
  @Output() now:any;
  @Output() hello:any;
  update_S:boolean;

  DynamicStock?:DynamicModel[];
  CurrentDynamicStock?:DynamicModel;

  StaticOrdersAccepted?:StaticOrdersAccepted[];
  OneStaticOrdersAccepted?:StaticOrdersAccepted;
  
  

  AddNewOred_id:any;


  ifMoreUnits: boolean;

  constructor(public data: DataService,
    public stockService: WebService,
    public AchiService: WebService,
    private route: ActivatedRoute,
    public beilinsonService:WebService,
    private fb: FormBuilder) {
   setInterval(() => {
     this.now = new Date();
  }, 1);
   }


  ngOnInit(): void {
    //this.getStock("60649312b9ed1532f0af28a0","6066cac4d0a4ce3bf83d2fc1");
    //this.ChangeWithStock()
    this.sub = this.data.CurrentHospitalName.subscribe(_HosName => { 
      this.HospitaNameObserve = _HosName;
      this.HospitalNameDisplay = _HosName;
    });
    this.sub = this.data.CurrentMadaStock.subscribe(NoMadaStock=>{this.NotEnoughInMadaStock = NoMadaStock});
   
    
    this.update_S = false;
    this.amount = false;
    this.OrderFromMada = false;
    this.receiveAnOrder = false;
    this.DynamicFormOrders = false;
    this.BeilinsonFormOrders=false;
    this.AchilovFormOrders=false;
    this.NotEnoughInMadaStock = false;
    this.OrderAcceptedInMada = false;
    this.OrderInWay = false;
    this.OrderSent = false;
    this.OrderArrived = false;
    this.OrderDenied = false;
    this.OrderInProcess = false;
    this.OrderShipped = false;
    this.DialogNewOrdersActivate= false;
    this.ordersAccepted=false;

    this.RefreshDynamicHospital();
    this.resetDynamicHospitalForm();
    this.resetForm();
    this.refreshStockList();
    this.refreshBeilinsonList()
    this.resetFormBeilinson();
    this.refreshGeneralStock();
    this.RefreshMessagesList();
    this.GetOrderStatusFromMada();
    this.ChangeFormByHospital();
    this.ChangeStockByHospital();
    this.ChnageUpdateStockByHospital();
    this.RefreshOrderAccepted();
    
  }

  RefreshOrderAccepted(){
    this.stockService.getOrdersAcceptedList().subscribe(res=>{
      this.stockService.OrdersAccepted = res as OrdersAccepted[];
    })
    this.stockService.getOrdersAccepted_s().subscribe(AllOrdersAccepted=>{
        this.StaticOrdersAccepted = AllOrdersAccepted.filter(s=>s.HospitalName==this.HospitalNameDisplay);
    })
  }

  ShowOrdersAccepted(){
    this.ordersAccepted = true;
    this.receiveAnOrder = false;
    this.OrderFromMada = false;
  }

  RefreshDynamicHospital()
  {
    this.stockService.getDynamicHospitalList().subscribe(res=>{
      this.stockService.DynamicHospitals = res as DynamicHospital[];
    })
  }

  resetDynamicHospitalForm(form?:NgForm)
  {
    if(form)
    form.reset();
    this.stockService.selectedDynamicHospital = {
    _id:"",
    HospitalName:this.HospitalNameDisplay,
    A:0,
    B:0,
    AB: 0,
    O:0,
    Am:0,
    Bm:0,
    ABm:0,
    Om:0,
    stock:false,
    Date:"",
    }
    
  }
  ResetDynamicStock()
  {
    if(this.DynamicStock != undefined
       && this.DynamicStock.length !=0)
    {
      this.DynamicStock=[];
    
   }
  }
  ChangeStockByHospital()
  {
        this.ResetDynamicStock();

        this.stockService.getDynamicHospitalStocks().subscribe(Dynamic =>{
          this.DynamicStock = Dynamic.filter(s=>s.HospitalName.includes(this.HospitalNameDisplay));

          this.DynamicFormOrders = true;
          this.BeilinsonFormOrders=false;
          this.AchilovFormOrders=false;

        })
  }
  ChnageUpdateStockByHospital(){
    
   // this.HosName = `stockService.selected${this.HospitaNameObserve}.HospitalName`
      this.UpstockA = `stockService.selected${this.HospitaNameObserve}.A`;
      this.UpstockB = `stockService.selected${this.HospitaNameObserve}.B`;
      this.UpstockAB = `stockService.selected${this.HospitaNameObserve}.AB`;
      this.UpstockO = `stockService.selected${this.HospitaNameObserve}.O`;
      //this.stockDate = `stockService.selected${this.HospitaNameObserve}Orders.Date`;

  }
  ChangeFormByHospital()
  {   
    
        this.HosName = `stockService.selectedDynamicHospital.HospitalName`
        this.stockA = `stockService.selectedDynamicHospital.A`;
        this.stockB = `stockService.selectedDynamicHospital.B`;
        this.stockAB = `stockService.selectedDynamicHospital.AB`;
        this.stockO = `stockService.selectedDynamicHospital.O`;
        this.stockAMinus = `stockService.selectedDynamicHospital.Am`;
        this.stockBMinus = `stockService.selectedDynamicHospital.Bm`;
        this.stockABMinus = `stockService.selectedDynamicHospital.ABm`;
        this.stockOMinus = `stockService.selectedDynamicHospital.Om`;
        this.stockValidate = `stockService.selectedDynamicHospital.stock`;
        this.stockDate = `stockService.selectedDynamicHospital.Date`;
      
  }

  RefreshMessagesList(){
    this.AchiService.getMessagesList().subscribe((res) => {
      this.AchiService.Messages_S = res as Messages[];
    });
  }

  GetOrderStatusFromMada() {

     this.stockService.getMessages_s().subscribe(M=> {
     this.NotEnoughInMadaStock = M.find(s=>s.HospialName==this.HospitalNameDisplay).OrderDenied;
     this.OrderAcceptedInMada  =  M.find(s=>s.HospialName==this.HospitalNameDisplay).OrderArrived;
     this.OrderInProcessinMada =  M.find(s=>s.HospialName==this.HospitalNameDisplay).OrderInProcess;
     this.OrderInWay =  M.find(s=>s.HospialName==this.HospitalNameDisplay).OrderShipped;
    })
  }

  requestForm = this.fb.group({
    bloodUnit: ['', Validators.required],

    moreUnits: this.fb.array([
      this.fb.control('')
    ])
  });

  
 
 get moreUnits() {
    return this.requestForm.get('moreUnits') as FormArray;
  }

  updateRequest() {
    this.requestForm.patchValue({
    });
  }

  addMoreUnits() {
    this.moreUnits.push(this.fb.control(''));
  }

  onAddMore() {
    this.ifMoreUnits = true;
  }
  showOrder(){
    this.OrderFromMada = true;
    this.receiveAnOrder = false;
    this.ordersAccepted = false;
  }
  showReceive(){
    this.receiveAnOrder = true;
    this.OrderFromMada = false;
    this.ordersAccepted = false;
  }
 
  

  resetFormBeilinson(form?: NgForm) {
    if (form)
      form.reset();
    this.beilinsonService.selectedBeilinsonOrder= {
      _id: "",
      HospitalName:this.HospitalNameDisplay,
      A:0,
      B:0,
      AB:0,
      O:0,
      Date:"",

    }
  }
    resetForm(form?: NgForm) {
      if (form)
        form.reset();
      this.AchiService.selectedAchilovOrder = {
        _id: "",
        HospitalName:this.HospitalNameDisplay,
        A:0,
        B:0,
        AB:0,
        O:0,
        Date:"",

      }
    }
    
    onSubmitBeilinson(form: NgForm) {
      if (form.value._id == "") {
        this.beilinsonService.postBeilinsonOrdersStock(form.value).subscribe((res) => {
          this.resetFormBeilinson(form);
          this.refreshBeilinsonList();
          alert("Saved successfully on DataBase..");
         this.updateRequest();
        });
      }
      else {
        this.beilinsonService.putBeilinsonOrdersStock(form.value).subscribe((res) => {
          this.resetFormBeilinson(form);
          this.refreshBeilinsonList();
          this.message = "Stock Updated successfully in DataBase ..";
          this.updateRequest();
        });
      }
    }
    resetStock(form?:NgForm){
      if (form)
      form.reset();
    this.stockService.selectedAchilov = {
      _id: "",
      A:0,
      B:0,
      AB:0,
      O:0,
    }
  }
  onStockSubmit(form: NgForm){
    if (form.value._id == "") {
      this.stockService.postStock(form.value).subscribe((res) => {
        this.resetStock(form);
        this.refreshGeneralStock();
        alert("Saved successfully on Achilov DataBase..");
       
      });
    }
    else {
      this.stockService.putStock(form.value).subscribe((res) => {
        this.resetStock(form);
        this.refreshGeneralStock();
        this.message = "Stock Updated successfully in Achilov DataBase ..";
        
      });
    }

  }

    onSubmit(form: NgForm) {
      
      if (form.value._id == "") {
        form.value.Date = this.todayString;
        form.value.HospitalName = this.HospitalNameDisplay;
        this.stockService.postDynamicHospital(form.value).subscribe((res) => {
          this.resetDynamicHospitalForm(form)
          this.RefreshDynamicHospital();
          
          alert(`sent to Mada from ${this.HospitalNameDisplay} Hospital..`);
         
        });
      }
      else {
        this.stockService.putDynamicHospital(form.value).subscribe((res) => {
          this.resetDynamicHospitalForm(form);
          this.refreshBeilinsonList();
          alert(`updated to ${this.HospitalNameDisplay} orders .`);
         
        });
      }

    
    }
    refreshStockList(): void {
      this.AchiService.getAchilovStockList().subscribe((res) => {
        this.AchiService.AchilovOrders = res as AchilovStock[];
      });}
        refreshGeneralStock(){
          this.AchiService.getStockList().subscribe((res) => {
            this.AchiService.Achilov_stocks = res as Stock[];
          }); 
        }
      refreshBeilinsonList(): void {
        this.beilinsonService.getBeilinsonOrdersList().subscribe((res) => {
          this.beilinsonService.BeilinsonOrders = res as BeilinsonOrders[];
        });}
    RefreshDynamicHospitalStock()
    {
      this.stockService.getDynamicHospitalStockList().subscribe(res=>{
        this.stockService.DynamicHospitalStocks = res as DynamicHospitalStock[];
      })
    }
   

    AddNewOrders(id:string)
     {
       this.stockService.getDynamicHospitalStocks().subscribe(allStocks=>{
         for(let i=0;i<allStocks.length;i++)
         {
           if(allStocks[i]._id==id)
           {
            allStocks.find(s=>s.stock==true && s.HospitalName == this.HospitalNameDisplay).A = allStocks.find(s=>s.stock==true && s.HospitalName == this.HospitalNameDisplay).A +allStocks[i].A;
            allStocks.find(s=>s.stock==true && s.HospitalName == this.HospitalNameDisplay).B = allStocks.find(s=>s.stock==true && s.HospitalName == this.HospitalNameDisplay).B +allStocks[i].B;
            allStocks.find(s=>s.stock==true && s.HospitalName == this.HospitalNameDisplay).AB= allStocks.find(s=>s.stock==true && s.HospitalName == this.HospitalNameDisplay).AB +allStocks[i].AB;
            allStocks.find(s=>s.stock==true && s.HospitalName == this.HospitalNameDisplay).O = allStocks.find(s=>s.stock==true && s.HospitalName == this.HospitalNameDisplay).O +allStocks[i].O;
            allStocks.find(s=>s.stock==true && s.HospitalName == this.HospitalNameDisplay).Am = allStocks.find(s=>s.stock==true && s.HospitalName == this.HospitalNameDisplay).Am +allStocks[i].Am;
            allStocks.find(s=>s.stock==true && s.HospitalName == this.HospitalNameDisplay).Bm = allStocks.find(s=>s.stock==true && s.HospitalName == this.HospitalNameDisplay).Bm +allStocks[i].Bm;
            allStocks.find(s=>s.stock==true && s.HospitalName == this.HospitalNameDisplay).ABm= allStocks.find(s=>s.stock==true && s.HospitalName == this.HospitalNameDisplay).ABm +allStocks[i].ABm;
            allStocks.find(s=>s.stock==true && s.HospitalName == this.HospitalNameDisplay).Om = allStocks.find(s=>s.stock==true && s.HospitalName == this.HospitalNameDisplay).Om+allStocks[i].Om;
            allStocks[i].Date = this.time;
            this.stockService.postOrdersAccepted(allStocks[i]).subscribe();
            this.onDeleteNewOrderDone(id);

           }
         }
        
         
        this.stockService.putDynamicHospitalStock(allStocks.find(s=>s.stock==true && s.HospitalName == this.HospitalNameDisplay)).subscribe(res=>{});
        })

        
        
        this.ResetDynamicStock();
        this.RefreshDynamicHospitalStock();
        this.stockService.getDynamicHospitalStocks().subscribe(allStocks=>{
        this.DynamicStock = allStocks.filter(s=>s.HospitalName.includes(this.HospitalNameDisplay));
        
        
        })
        this.DialogNewOrdersActivate= false;
      
    }
    DeActivateAddOrderDialog(){
      this.DialogNewOrdersActivate= false;
    }
    AddOrderByDialog(id:string){
      this.AddNewOred_id = id;
      this.DialogNewOrdersActivate= true;

    }
    AddAndPost(){
      this.AddNewOrders(this.AddNewOred_id);
    }

    onEdit(id:string) {
      
      
     if(id != "" || undefined)
     {
       console.log("hello");
        //this.stockService.
     }


    }
      onDeleteNewOrderDone(id:string)
      {
          this.stockService.deleteDynamicHospitalStock(id).subscribe((res)=>{
            
          })
      }


onDeleteStock(_id: string){
  if (confirm('Are you sure to delete this record ?') == true) {
    this.stockService.deleteStock(_id).subscribe((res) => {
      this.refreshGeneralStock();
     // this.resetForm(form);
   //   M.toast({ html: 'Deleted successfully', classes: 'rounded' });
    });
  }
}
    onDelete(_id: string,) {
      if (confirm('Are you sure to delete this record ?') == true) {
        this.AchiService.deleteAchilovStock(_id).subscribe((res) => {
          this.refreshStockList();
         // this.resetForm(form);
       //   M.toast({ html: 'Deleted successfully', classes: 'rounded' });
        });
      }
    }

  TypeAmount()
  {
    this.amount = true;
  }
  Amountdis()
  {
    this.amount = false;
    this.message = "";
  }

}


