import { Component, OnInit } from '@angular/core';
import { AirlineManagementService } from '../Services/airline-management.service';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { FlightScheduleData } from '../Models/FlightScheduleData';
@Component({
  selector: 'app-add-schedule',
  templateUrl: './add-schedule.component.html',
  styleUrls: ['./add-schedule.component.css']
})
export class AddScheduleComponent implements OnInit {
  FlightSchdata:any[]=[];
  Flightdata:any[]=[];
  Flightdatanew:any[]=[];
  Flightairdata:any[]=[];
  addscheduleform:any=FormGroup;
  flightScheduleobj: FlightScheduleData=new FlightScheduleData();

 
  constructor(private _airlineService :AirlineManagementService,private fb:FormBuilder,private _toastrservice:ToastrService) {}


  ngOnInit(): void {
    this.getScheduledflights();
    this.getflight();


    this.addscheduleform=this.fb.group({
      airlineName:['',Validators.required],
      flightCode:['',Validators.required],
      source:['',Validators.required],
       destination:['',Validators.required],
      fromDate:['',Validators.required],
      toDate:['',Validators.required],
      scheduledDays:['',Validators.required],
      noOfBuSeats:['',Validators.required],
      noOfNonBuSeats:['',Validators.required],
      price:['',Validators.required]
      });

this.handlevalueChange();
  }

handlevalueChange(){
this.addscheduleform.get('airlineName').valueChanges.subscribe((res:any)=>{

  this.Flightdatanew=this.Flightdata.filter(f=>f['airlineId']===Number(res));
 
})
}

call(){
  alert("hiiii")
}
  getScheduledflights()
  {
      this._airlineService.getScheduledFlighs()
    .subscribe(
      (data)=>{
        this.FlightSchdata=data;
           console.log(data);
      },
      (err)=>{
        console.log(err);
      }
    );
  }

  addSchedule(data:any){
    this.flightScheduleobj.airlineId=Number(this.addscheduleform.value.airlineName);
    this.flightScheduleobj.flightId=Number(this.addscheduleform.value.flightCode);
    alert(this.flightScheduleobj.flightId)
    this.flightScheduleobj.source=this.addscheduleform.value.source;
    this.flightScheduleobj.destination=this.addscheduleform.value.source;
    this.flightScheduleobj.source=this.addscheduleform.value.destination;
    this.flightScheduleobj.fromDate=this.addscheduleform.value.fromDate;
    this.flightScheduleobj.toDate=this.addscheduleform.value.toDate;
    this.flightScheduleobj.scheduledDays=this.addscheduleform.value.scheduledDays;
    this.flightScheduleobj.NoOfBussinessSeats=Number(this.addscheduleform.value.noOfBuSeats);
    this.flightScheduleobj.NoOfNonBussinessSeats=Number(this.addscheduleform.value.noOfNonBuSeats);
    this.flightScheduleobj.price=Number(this.addscheduleform.value.price);
    this._airlineService.addSchedule(this.flightScheduleobj)
    .subscribe(
      (data)=>{
        console.log(data)
        this._toastrservice.success("Schedule Added");
        this.addscheduleform.reset();
        this.getScheduledflights();
        },
        err =>{
        console.log(err);
         this._toastrservice.error("Falied to add");
         this.addscheduleform.reset();
         this.getScheduledflights();
        }
      );
    
  }

  getflight()
  {
      this._airlineService.getFlights()
    .subscribe(
      (data)=>{
        this.Flightdata=data;
        this.Flightdata=this.Flightdata.filter(a=>a['status']===true);
        this.Flightairdata=this.Flightdata.filter((v,i,a)=>a.findIndex(t=>t.airlineName===v.airlineName)===i);
     
        console.log(this.Flightdata +"fldata");
        console.log(data);
      },
      (err)=>{
        console.log(err);
      }
    );
  }

}
