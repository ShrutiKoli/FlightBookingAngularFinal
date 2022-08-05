import { Component, OnInit } from '@angular/core';
import { AirlineManagementService } from '../Services/airline-management.service';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-add-airline',
  templateUrl: './add-airline.component.html',
  styleUrls: ['./add-airline.component.css']
})
export class AddAirlineComponent implements OnInit {
  Airlinedata:any[]=[];
  addairlineform:any=FormGroup
  constructor(private _airlineService :AirlineManagementService,private fb:FormBuilder,private _toastrservice:ToastrService) {}

  addAirline(data:any){
   
    this._airlineService.addAirline(data)
    .subscribe(
      (data)=>{
        console.log(data)
        this._toastrservice.success("Airline Added");
        this.addairlineform.reset();
        this.getAirline();
        },
        err =>{
        console.log(err);
         this._toastrservice.error("Falied to add");
         this.addairlineform.reset();
        }
      );
  }
  getAirline()
  {
      this._airlineService.getAirline()
    .subscribe(
      (data)=>{
        this.Airlinedata=data,
        console.log(data);
      },
      (err)=>{
        console.log(err);
      }
    );
  }

  blockAirline(name:string,code:string,status:boolean){
    this._airlineService.blockAirline(name,code,status)
    .subscribe(
      (data)=>{
        console.log(data)
        this._toastrservice.success("Airline blocked");
     
        this.getAirline();
        },
        err =>{
        console.log(err);
         this._toastrservice.error("Falied ");
        
        }
      );
  }
  ngOnInit(): void {
    this.getAirline();

    this.addairlineform=this.fb.group({
      airlineName:['',Validators.required],
      airlineLogo:['',Validators.required],
      airlineCode:['',Validators.required],
      about:['',Validators.required],
      address:['',Validators.required]
      });
  }

}
