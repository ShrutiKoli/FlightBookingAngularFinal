import { Component, OnInit } from '@angular/core';
import { FilghtSearch } from '../Models/FlightSearch';
import { AirlineManagementService } from '../Services/airline-management.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
Searchdata:any[]=[];
search:boolean=false;


  
  constructor(private _airlineService :AirlineManagementService,private router:Router) {
}

book(data:any){
  //alert(data.airlineName);
  this.router.navigate(['/user-booking']);
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
  ngOnInit(): void {
  
  }

}
