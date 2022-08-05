import { Component, OnInit } from '@angular/core';
import { AirlineManagementService } from '../Services/airline-management.service';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { BookingData } from '../Models/BookingData';
import { BookingManagementService } from '../Services/booking-management.service';
@Component({
  selector: 'app-user-booking',
  templateUrl: './user-booking.component.html',
  styleUrls: ['./user-booking.component.css']
})
export class UserBookingComponent implements OnInit {
  Searchdata:any[]=[];
  search:boolean=false;
  passengerdata:any[]=[];
  bookingdataobj:BookingData=new BookingData();
 bookform:any=FormGroup;
 passengerform:any=FormGroup;
 seats:number=0;
 cost:number=0;
 currentflightdata:any
 discountper:number=0;
 isDiscountapplied:boolean=false;
  
    
    constructor(private _airlineService :AirlineManagementService,private fb:FormBuilder,private _bookingService:BookingManagementService,private _toastrservice:ToastrService) {

  }

  bookFlight(data:any){
  console.log(data);
  this.bookingdataobj.nameOfUser=data.userName;
  this.bookingdataobj.emailId=data.email;
  this.bookingdataobj.cost=this.cost;
  this.bookingdataobj.mealOption=data.mealOption;
  this.bookingdataobj.noOfSeats=this.seats;
  this.bookingdataobj.airlineName=this.currentflightdata.airlineName;
  this.bookingdataobj.flightCode=this.currentflightdata.flightCode;
  this.bookingdataobj.source=this.currentflightdata.source;
  this.bookingdataobj.destination=this.currentflightdata.destination;
  this.bookingdataobj.fromDate= new Date(this.currentflightdata.from);
  this.bookingdataobj.toDate= new Date(this.currentflightdata.to);
  this.bookingdataobj.userBookingDetails=this.passengerdata;
  this.bookingdataobj.userBookingDetails.forEach(u=>u.booking={});
  console.log( this.bookingdataobj);
  this._bookingService.bookFlight(this.bookingdataobj)
    .subscribe(
      (data)=>{
        console.log(data)
        this._toastrservice.success("Booked!!!");
     
          this.bookform.reset();
       
        },
        err =>{
        console.log(err);
         this._toastrservice.error("Falied to book");
       
        this.bookform.reset();
        }
      );
    


  }


  binddata(data:any){
    this.currentflightdata=data;
  }
  addpsg(data:any){
    this.passengerdata.push(data);
    this.passengerform.reset();
    this.seats=this.seats+1;
    this.cost=this.cost+Number(this.currentflightdata.price);
    console.log(this.passengerdata)
  }

  ngOnInit(): void {

    this.passengerform=this.fb.group({
      name:['',Validators.required],
     age:['',Validators.required],
      gender:['',Validators.required],
      seatNumber:['',Validators.required]
    
      });

      this.bookform=this.fb.group({
        userName:['',Validators.required],
       email:['',Validators.required],
        mealOption:['',Validators.required],
        noOfSeats:['',Validators.required],
        cost:['',Validators.required],
        discount:['',Validators.required]
      });
  }
  SearchFlight(source:string,destination:string,Deptdate:string){
    this.search=true;
      this._airlineService.SearchFlight(source,destination,Deptdate)
   .subscribe(
     (data)=>{
       this.Searchdata=data;
       console.log(this.Searchdata)
      },
      err =>{
        console.log(err);
      });
    console.log(this.Searchdata,"data")
   
   }

   applyDiscount(code:any){
    this._bookingService.appyDiscount(code)
    .subscribe(
      (data)=>{
        console.log(data)
       },
       err =>{
         console.log(err);
       });
      
       /////
       this._airlineService.provideDiscount()
       .subscribe(
         (data)=>{
          console.log(data)
          },
          err =>{
            console.log(err);
          });
          /////
          this._bookingService.getDiscount()
          .subscribe(
            (data)=>{
              this.discountper=Number(data);
              this.cost=this.discountper===0?this.cost:this.cost-(this.cost*(this.discountper/100));
              console.log(data)
              this._toastrservice.success("Discount applied!!");
               this.bookform.controls['discount'].disable();
                this.isDiscountapplied=true;
             },
             err =>{
               console.log(err);
             });

   }
}
