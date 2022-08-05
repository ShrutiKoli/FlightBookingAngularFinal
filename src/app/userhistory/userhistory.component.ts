import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import jsPDF from 'jspdf';
import { ToastrService } from 'ngx-toastr';
import { BookingData } from '../Models/BookingData';
import { AirlineManagementService } from '../Services/airline-management.service';
import { BookingManagementService } from '../Services/booking-management.service';

@Component({
  selector: 'app-userhistory',
  templateUrl: './userhistory.component.html',
  styleUrls: ['./userhistory.component.css']
})
export class UserhistoryComponent implements OnInit {
isSearched:boolean=false;
userData:any[]=[];
scheduledata:any[]=[];
searchdataform:any=FormGroup;
ticketData:BookingData=new BookingData();
bookdataobj:BookingData=new BookingData();
  constructor(private _toastrservice:ToastrService,private fb:FormBuilder,private _bookingService:BookingManagementService,private _airlineService:AirlineManagementService) { }
  @ViewChild('ticket',{static:false}) el!:ElementRef
  ngOnInit(): void {

  
    this.searchdataform=this.fb.group({
      searchOption:['',Validators.required],
      searchValue:['',Validators.required],
      
      });
  }

bindTicketData(data:any){
this.ticketData=data
this.ticketData.cost=Number(data.airlinePrice);
this.ticketData.toDate=new Date(data.to);
this.ticketData.fromDate=new Date(data.from);
this.ticketData.userBookingDetails=data.passengers;

console.log(this.ticketData);
}

  searchHistory(data:any){
    if(data.searchOption!=null){
    if(data.searchOption==='Email'){
    
      this._bookingService.getDataByEmail(data.searchValue)
      .subscribe(
        (data)=>{
          if(data.length!=0){
          this.userData=data;
          //this.userData=this.userData.filter((v,i,a)=>a.findIndex(t=>t.pnr===v.pnr)===i);
          this.isSearched=true;
          }
          else
          this._toastrservice.info("No Data found");

        this.searchdataform.reset();
          console.log(data);
        },
        (err)=>{
          console.log(err);
        }
      );
    }
    
    
    else if(data.searchOption==='PNR'){
      this._bookingService.getDataByPnr(data.searchValue)
      .subscribe(
        (data)=>{
          if(data.length!=0){
            this.userData=data;
            //this.userData=this.userData.filter((v,i,a)=>a.findIndex(t=>t.pnr===v.pnr)===i);
            this.isSearched=true;
            }
            else
            this._toastrservice.info("No Data found");

          this.searchdataform.reset();
          console.log(data);
        },
        (err)=>{
          console.log(err);
        }
      );
    }
   
  }
  else
    {
      this._toastrservice.warning("Please select option");
    }
    console.log(data)
  }
  downloadTicket(){
   let pdf=new jsPDF('p','px',[842,1191])
   pdf.html(this.el.nativeElement,{
     callback :(pdf)=>{
       for(let i=pdf.getNumberOfPages();i>1;i--){
        pdf.deletePage(i);
       }
     
       pdf.save(this.ticketData.pnr+".pdf");
     }
   })
  }
cancekBooking(data:any){
  this._bookingService.cancelBooking(data.id)
  .subscribe(
    (data:any)=>{
      console.log(data)
      this._toastrservice.success("Cancellation status : "+data.value);
      this.isSearched=false;
     
      },
      err =>{
      console.log(err);
       this._toastrservice.error("Cancel Failed");
      
      }
    );

}
  
}
