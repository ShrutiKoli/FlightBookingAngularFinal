import { Component, OnInit } from '@angular/core';
import { AirlineManagementService } from '../Services/airline-management.service';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { FlightData } from '../Models/FlightData';

@Component({
  selector: 'app-add-flight',
  templateUrl: './add-flight.component.html',
  styleUrls: ['./add-flight.component.css']
})
export class AddFlightComponent implements OnInit {
  flightdata:any[]=[];
  Airlinedata:any[]=[];
  addflightform:any=FormGroup
  addflightobj:FlightData= new FlightData();
 
  constructor(private _airlineService :AirlineManagementService,private fb:FormBuilder,private _toastrservice:ToastrService) {}


  ngOnInit(): void {
 
    this.getflight();
   this.getAirline();

    this.addflightform=this.fb.group({
      airlineName:['',Validators.required],
     
      flightCode:['',Validators.required],
      
      });
  }
 
  

  addFlight(){
   
    this.addflightobj.AirlineId=Number(this.addflightform.value.airlineName);
  
    this.addflightobj.FlightCode=this.addflightform.value.flightCode;
    //alert(this.addflightobj.AirlineId)
    this._airlineService.addFlight(this.addflightobj)
    .subscribe(
      (data)=>{
        console.log(data)
        this._toastrservice.success("Flight Added");
        this.addflightform.reset();
        this.getflight();
        },
        err =>{
        console.log(err);
         this._toastrservice.error("Falied to add");
         this.addflightform.reset();
        }
      );
    
  }

  getflight()
  {
      this._airlineService.getFlights()
    .subscribe(
      (data)=>{
        this.flightdata=data,
      
        console.log(data);
      },
      (err)=>{
        console.log(err);
      }
    );
  }
  getAirline()
  {
      this._airlineService.getAirline()
    .subscribe(
      (data)=>{
        this.Airlinedata=data,
        this.Airlinedata=this.Airlinedata.filter(a=>a['isActive']===true)
        console.log(data);
      },
      (err)=>{
        console.log(err);
      }
    );
  }

  blockflight(code:string,status:boolean){
    this._airlineService.blockflight(code,status)
    .subscribe(
      (data)=>{
        console.log(data)
        this._toastrservice.success("Flight blocked");
     
        this.getflight();
        },
        err =>{
        console.log(err);
         this._toastrservice.error("Failed");
        
        }
      );
  }
 
}
